import type { T_Email } from '../../../types';
import { NextResponse } from 'next/server';
import { makeRes } from '../../../';

export async function GET() {




    const res = makeRes({
        severity: 'warning',
        message: 'Log of emails',
        data: {}
    });
    return NextResponse.json(res);
}
