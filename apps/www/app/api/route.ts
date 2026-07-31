import { NextResponse } from 'next/server';
import { makeRes } from './lib/makeRes';
import { getEndpoints } from './';


export async function GET() {
    const res = makeRes({
        severity: 'success',
        message: 'Welcome to NXAPI',
        data: getEndpoints()
    });
    return NextResponse.json(res);
}
