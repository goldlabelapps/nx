import { NextResponse } from 'next/server';
import { makeRes, getEndpoints } from '../';

export async function GET() {
    const res = makeRes({
        severity: 'success',
        message: 'Avatars endpoint says hello',
        data: getEndpoints('Avatars'),
    });
    return NextResponse.json(res);
}
