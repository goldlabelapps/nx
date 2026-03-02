import { NextResponse } from 'next/server';
import { makeRes, getEndpoints } from '../../';

export async function GET() {
    const res = makeRes({
        severity: 'success',
        message: 'List Shares',
        data: ['list of share collection docs'],
    });
    return NextResponse.json(res);
}
