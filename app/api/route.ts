import { NextResponse } from 'next/server';
import type { TApiResponse } from '@/goldlabel/types';
import packageJson from '@/package.json';

export async function GET() {
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
            version: packageJson.version
        }
    };

    return NextResponse.json(response);
}
