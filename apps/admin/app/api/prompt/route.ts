import { NextResponse } from 'next/server';
import { makeRes } from '../lib/makeRes';
import { getEndpoints } from '../';

export async function GET() {
    const res = makeRes({
        severity: 'info',
        message: 'Prompt° endpoint',
        // data: {}
    });
    return NextResponse.json(res);
}

