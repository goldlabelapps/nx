import { NextResponse } from 'next/server';

import type { TMarkdown } from '../../goldlabel/types';

export async function GET() {
    // Firestore code removed; always return 'homepage missing' response or add a static doc if desired
    const response = {
        time: Date.now(),
        app: 'goldlabel',
        feedback: {
            status: 'warning',
            title: 'Homepage missing',
            description: 'No homepage markdown document found. Please run the createHome script.'
        },
        request: {
            method: 'GET',
            action: 'fetch-homepage',
        },
        response: {}
    };
    return NextResponse.json(response);
}
