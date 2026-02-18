import { NextResponse } from 'next/server';
import { makeRes } from './lib/makeRes';

export async function GET() {
    const res = makeRes({
        severity: 'success',
        message: 'Base API GET endpoint',
        data: { info: 'This is a sample response from the GET endpoint.' }
    });
    return NextResponse.json(res);
}
