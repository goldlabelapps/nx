import { NextResponse } from 'next/server';

import type { TMarkdown, TApiResponse } from '../../goldlabel/types';

export async function GET() {
    // Firestore code removed
    if (doc) {
        // Map Doc.content to TMarkdown.body
        const markdown: TMarkdown = {
            ...doc,
            body: doc.content,
        };
        delete (markdown as any).content;
        const response: TApiResponse<TMarkdown> = {
            time: Date.now(),
            app: 'goldlabel',
            feedback: {
                status: 'success',
                title: 'Homepage found',
                description: 'The homepage markdown document was found.'
            },
            request: {
                method: 'GET',
                action: 'fetch-homepage',
            },
            response: markdown
        };
        return NextResponse.json(response);
    } else {
        const response: TApiResponse<{}> = {
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
}
