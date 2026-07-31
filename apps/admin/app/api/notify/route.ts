import { NextRequest, NextResponse } from 'next/server';
import { makeRes } from '../lib/makeRes';
import { getAdminApp, getAdminMessaging } from './firebaseAdmin';

export interface I_NotifyBody {
    tokens: string[];
    title: string;
    body?: string;
    icon?: string;
    url?: string;
    data?: Record<string, string>;
}

/**
 * POST /api/notify
 *
 * Sends a multicast FCM push notification to one or more device tokens.
 *
 * Request headers:
 *   Authorization: Bearer <NOTIFY_SECRET>
 *
 * Request body (JSON):
 *   tokens  – array of FCM registration tokens
 *   title   – notification title
 *   body    – notification body (optional)
 *   icon    – notification icon URL (optional)
 *   url     – click-through URL stored in data.url (optional)
 *   data    – extra key/value pairs forwarded as FCM data (optional)
 */
export async function POST(req: NextRequest) {
    // ── Auth ──────────────────────────────────────────────────────────────────
    const secret = process.env.NOTIFY_SECRET;
    const authHeader = req.headers.get('authorization') || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';

    if (!secret || token !== secret) {
        return NextResponse.json(
            makeRes({ severity: 'error', message: 'Unauthorized' }),
            { status: 401 },
        );
    }

    // ── Parse body ────────────────────────────────────────────────────────────
    let body: I_NotifyBody;
    try {
        body = await req.json();
    } catch {
        return NextResponse.json(
            makeRes({ severity: 'error', message: 'Invalid JSON body' }),
            { status: 400 },
        );
    }

    const { tokens, title, body: notifBody = '', icon, url, data } = body;

    if (!Array.isArray(tokens) || tokens.length === 0) {
        return NextResponse.json(
            makeRes({ severity: 'error', message: '`tokens` must be a non-empty array' }),
            { status: 400 },
        );
    }

    if (!title) {
        return NextResponse.json(
            makeRes({ severity: 'error', message: '`title` is required' }),
            { status: 400 },
        );
    }

    // ── Send via FCM ──────────────────────────────────────────────────────────
    try {
        const app = getAdminApp();
        const messaging = getAdminMessaging(app);

        const extraData: Record<string, string> = { ...(data || {}) };
        if (url) extraData.url = url;

        const result = await messaging.sendEachForMulticast({
            tokens,
            notification: {
                title,
                body: notifBody,
                imageUrl: icon,
            },
            data: extraData,
            webpush: {
                notification: {
                    icon: icon || '/nxadmin/png/favicon.png',
                    badge: '/nxadmin/png/favicon.png',
                },
                fcmOptions: url ? { link: url } : undefined,
            },
        });

        const successCount = result.responses.filter((r) => r.success).length;
        const failureCount = result.responses.length - successCount;

        return NextResponse.json(
            makeRes({
                severity: failureCount === 0 ? 'success' : 'warning',
                message: `Sent ${successCount}/${tokens.length} notifications`,
                data: { successCount, failureCount },
            }),
        );
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : String(e);
        return NextResponse.json(
            makeRes({ severity: 'error', message }),
            { status: 500 },
        );
    }
}
