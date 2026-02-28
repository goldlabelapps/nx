import { NextResponse } from 'next/server';
import { makeRes, getEndpoints } from '../../';

export type T_Email = {

    from: {
        label: string;
        email: string;
    },
    to: {
        label: string;
        email: string;
    }
    subject: string;
    body: string; // Markdown or HTML content?  
    template?: string;

};

export async function GET() {
    const res = makeRes({
        severity: 'warning',
        message: 'You need to POST a valid T_Email object to this endpoint to send an email.',
    });
    return NextResponse.json(res);
}
