import { NextResponse } from 'next/server';
import type { TApiResponse } from '@/goldlabel/types';
import packageJson from '@/package.json';

export async function GET(request: Request) {
    // Get base URL from request
    const baseUrl = request.headers.get('x-forwarded-host')
        ? `${request.headers.get('x-forwarded-proto') || 'https'}://${request.headers.get('x-forwarded-host')}`
        : request.url.split('/api')[0];

    const endpoints = [
        {
            name: 'Markdown',
            url: `${baseUrl}/api/markdown`
        }
    ];

    const response: TApiResponse = {
        time: Date.now(),
        app: packageJson.name,
        feedback: {
            status: 'success',
            title: 'API Connected',
            description: 'API is working correctly'
        },
        request: {
            method: 'GET',
            action: 'health-check'
        },
        response: {
            version: packageJson.version,
            endpoints
        }
    };

    return NextResponse.json(response);
}
