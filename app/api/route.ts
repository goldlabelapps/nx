import { NextResponse } from 'next/server';
import { makeRes } from './lib/makeRes';
import { getBaseurl } from './lib/getBaseurl';

export async function GET() {
    const res = makeRes({
        severity: 'success',
        message: 'Base API GET endpoint',
        data: {
            endpoints: [
                {
                    name: 'EchoPay',
                    method: 'GET',
                    path: `${getBaseurl()}/echopay`
                },
            ]
        }
    });
    return NextResponse.json(res);
}
