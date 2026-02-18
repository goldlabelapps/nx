import { NextResponse } from 'next/server';
import { makeRes } from './lib/makeRes';

export async function GET() {
    const res = makeRes({
        severity: 'success',
        message: 'Hello from the API!'
    });
    return NextResponse.json(res);
}
}
