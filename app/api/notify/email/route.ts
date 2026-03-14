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
        // Convert Markdown to HTML
        const htmlBody = (await remark().use(html).process(emailBody)).toString();

        
        

        return NextResponse.json(makeRes({
            severity: 'success',
            message: 'notification saved successfully.',
            data: {}
        }));



    } catch (error: any) {
        return NextResponse.json(makeRes({
            severity: 'error',
            message: error?.message || 'Failed to process request.',
        }), { status: 500 });
    }
}
