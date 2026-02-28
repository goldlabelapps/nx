import { NextResponse } from 'next/server';
import { makeRes } from '../../';

const githubURL = 'https://github.com/goldlabelapps/nx/blob/master/app/api/types.d.ts';
export async function GET() {
    const res = makeRes({
        severity: 'warning',
        message: 'You need to POST a valid [T_Email](/typescript) object to this endpoint to send an email.',
        data: { githubURL }
    });
    return NextResponse.json(res);
}
