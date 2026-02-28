import { NextResponse } from 'next/server';
import { makeRes } from './lib/makeRes';
import { getEndpoints } from './';


export async function GET() {
    const res = makeRes({
        severity: 'success',
        message: 'Base API GET endpoint',
        data: getEndpoints()
    });
    return NextResponse.json(res);
}
