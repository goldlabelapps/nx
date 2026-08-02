import { NextRequest, NextResponse } from 'next/server';
import { makeRes } from '../../api';
import { getAdminApp, getAdminMessaging } from './firebaseAdmin';

const toTokenArray = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.filter((token): token is string => typeof token === 'string' && token.trim().length > 0);
  }
  if (typeof value === 'string' && value.trim().length > 0) {
    return [value];
  }
  return [];
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      token,
      tokens,
      title = 'NxAdmin Notification',
      body: messageBody = 'Hello from NxAdmin!',
      data,
      android,
      apns,
      webpush,
    } = body || {};

    const resolvedTokens = toTokenArray(tokens ?? token);

    if (resolvedTokens.length === 0) {
      return NextResponse.json(
        makeRes({
          severity: 'error',
          message: 'Missing device token(s). Provide "token" or "tokens".',
        }),
        { status: 400 },
      );
    }

    getAdminApp();
    const messaging = getAdminMessaging();

    const response = await messaging.sendEachForMulticast({
      tokens: resolvedTokens,
      notification: {
        title,
        body: messageBody,
      },
      data: typeof data === 'object' && data !== null ? data : undefined,
      android: typeof android === 'object' && android !== null ? android : undefined,
      apns: typeof apns === 'object' && apns !== null ? apns : undefined,
      webpush: typeof webpush === 'object' && webpush !== null ? webpush : undefined,
    });

    const failed = response.responses
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => !item.success)
      .map(({ item, index }) => ({
        token: resolvedTokens[index],
        error: item.error?.message || 'Unknown error',
      }));

    return NextResponse.json(
      makeRes({
        severity: failed.length ? 'warning' : 'success',
        message: failed.length
          ? 'Notification sent with some failures.'
          : 'Notification sent successfully.',
        data: {
          successCount: response.successCount,
          failureCount: response.failureCount,
          failures: failed,
        },
      }),
      { status: failed.length ? 207 : 200 },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error';
    return NextResponse.json(
      makeRes({
        severity: 'error',
        message: 'Failed to send notification.',
        data: { error: message },
      }),
      { status: 500 },
    );
  }
}