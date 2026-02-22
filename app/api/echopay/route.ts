import { NextResponse } from 'next/server';
import { makeRes } from '../lib/makeRes';

export async function GET() {
    const res = makeRes({
        severity: 'success',
        message: 'EchoPay endpoint',
    });
    return NextResponse.json(res);
}
