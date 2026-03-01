import type { T_Email } from '../../types';
import { NextResponse } from 'next/server';
import { makeRes } from '../../';
import { Resend } from 'resend';
import { remark } from 'remark';
import html from 'remark-html';
// import { getFirebaseAdminApp } from '../../lib/firebase-admin';
// import { getFirestore } from 'firebase-admin/firestore';

export async function GET() {

    const res = makeRes({
        severity: 'warning',
        message: 'You need to POST a valid [T_Email](/typescript) object to this endpoint to send an email.',
    });
    return NextResponse.json(res);
}

export async function POST(req: Request) {
    try {
        const resendKey = process.env.RESEND_API_KEY;
        if (!resendKey) {
            return NextResponse.json(makeRes({
                severity: 'error',
                message: 'Missing RESEND_API_KEY in .env file.',
            }), { status: 500 });
        }
        const body = await req.json();
        // Basic validation for T_Email
        if (!body || typeof body !== 'object') {
            return NextResponse.json(makeRes({
                severity: 'error',
                message: 'Invalid request body. Must be a T_Email object.',
            }), { status: 400 });
        }
        const { from, to, subject, body: emailBody, template } = body as T_Email;
        if (!from?.email || !to?.email || !subject || !emailBody) {
            return NextResponse.json(makeRes({
                severity: 'error',
                message: 'Missing required fields in T_Email object.',
            }), { status: 400 });
        }
        const resend = new Resend(resendKey);
        // Convert Markdown to HTML
        const htmlBody = (await remark().use(html).process(emailBody)).toString();
        // Send email using Resend
        const sendResult = await resend.emails.send({
            from: `${from.label} <${from.email}>`,
            to: [`${to.label} <${to.email}>`],
            subject,
            html: htmlBody,
            text: emailBody.replace(/<[^>]+>/g, ''), // fallback plain text
        });
        if (sendResult.error) {
            return NextResponse.json(makeRes({
                severity: 'error',
                message: sendResult.error.message || 'Failed to send email.',
                data: sendResult.error
            }), { status: 500 });
        }

        /*
                const logDoc = {
                    logType: 'email',
                    timestamp: Date.now(),
                    request: body,
                    response: sendResult
                };
                try {
                    console.log('Save to Firestore logs collection');
                    const app = getFirebaseAdminApp();
                    const db = getFirestore(app);
                    await db.collection('logs').add(logDoc);
                } catch (logError) {
                    console.error('Failed to write log to Firestore:', logError);
                    if (logError instanceof Error) {
                        // Optionally, include more details for debugging
                        console.error('Error message:', logError.message);
                        if (logError.stack) console.error('Stack trace:', logError.stack);
                    }
                }
        */
        return NextResponse.json(makeRes({
            severity: 'success',
            message: 'Email sent successfully.',
            data: sendResult
        }));
    } catch (error: any) {
        return NextResponse.json(makeRes({
            severity: 'error',
            message: error?.message || 'Failed to process request.',
        }), { status: 500 });
    }
}
