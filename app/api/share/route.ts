import { NextResponse } from 'next/server';
import { makeRes, getEndpoints } from '../';

export async function GET() {
    const res = makeRes({
        severity: 'success',
        message: 'Share endpoint says hello',
        data: getEndpoints('Share'),
    });
    return NextResponse.json(res);
}
