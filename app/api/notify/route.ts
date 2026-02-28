import { NextResponse } from 'next/server';
import { makeRes, getBaseurl, getEndpoints } from '../';

export async function GET() {
    const res = makeRes({
        severity: 'success',
        message: 'Notify endpoint says hello',
        data: getEndpoints('Notify'),
    });
    return NextResponse.json(res);
}
