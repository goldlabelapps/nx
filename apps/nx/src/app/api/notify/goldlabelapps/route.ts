import { NextResponse } from 'next/server';
import {
    EmailConfigurationError,
    EmailProviderError,
    EmailValidationError,
    sendTemplatedEmail,
    type EmailPayload,
} from '@goldlabelapps/notify';

interface MakeResOptions {
    severity: 'success' | 'error' | 'warning' | 'info';
    message: string;
    data?: unknown;
    other?: unknown;
}

function makeRes({ severity, message, data, other }: MakeResOptions) {
    return {
        severity,
        message,
        ...(data !== undefined ? { data } : {}),
        ...(other !== undefined ? { other } : {}),
    };
}

export async function POST(request: Request) {
    try {
        const payload = await request.json() as EmailPayload;

        const data = await sendTemplatedEmail({
            apiKey: process.env.RESEND_API_KEY,
            payload: {
                ...payload,
                template: payload.template ?? 'basicEmailTemplate',
            },
            defaultSenderName: 'Goldlabel',
            fromAddress: 'onboarding@goldlabel.pro',
        });

        return NextResponse.json(
            makeRes({
                severity: 'success',
                message: 'Email sent successfully.',
                data,
            })
        );
    } catch (error: unknown) {
        if (error instanceof EmailValidationError) {
            return NextResponse.json(
                makeRes({
                    severity: 'error',
                    message: error.message,
                }),
                { status: 400 }
            );
        }

        if (error instanceof EmailConfigurationError) {
            return NextResponse.json(
                makeRes({
                    severity: 'error',
                    message: error.message,
                }),
                { status: 500 }
            );
        }

        if (error instanceof EmailProviderError) {
            return NextResponse.json(
                makeRes({
                    severity: 'error',
                    message: error.message,
                    other: error.details,
                }),
                { status: 502 }
            );
        }

        const message = error instanceof Error ? error.message : 'Unable to send email.';

        return NextResponse.json(
            makeRes({
                severity: 'error',
                message,
            }),
            { status: 500 }
        );
    }
}
