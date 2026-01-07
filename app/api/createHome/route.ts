import { NextResponse } from 'next/server';
import { createHomeMarkdown } from '@/goldlabel/lib/createHome';

export async function POST(request: Request) {
    try {
        const { sitename, description, namespace } = await request.json();
        const doc = await createHomeMarkdown({ sitename, description, namespace });
        return NextResponse.json({ success: true, doc });
    } catch (error) {
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
    }
}
