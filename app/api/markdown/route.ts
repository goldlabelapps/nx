
import { NextResponse } from 'next/server';
import { makeRes } from '../';
import { serverUseMDBySlug } from '../../NX/lib/serverHooks/serverUseMDBySlug';
import matter from 'gray-matter';
import fs from 'fs';


// /api/markdown?slug=foo/bar
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');
    const slugArr = slug ? slug.split('/') : [];
    const tenant = process.env.NEXT_PUBLIC_TENANT || 'nx';
    const filePath = serverUseMDBySlug(slugArr, tenant);

    if (!filePath || !fs.existsSync(filePath)) {
        return NextResponse.json(makeRes({
            severity: 'error',
            message: 'Markdown not found',
            data: null,
        }), { status: 404 });
    }

    const md = fs.readFileSync(filePath, 'utf-8');
    const { content, data } = matter(md);
    const contentObj = {
        frontmatter: data,
        content,
        slug: slugArr,
    };

    return NextResponse.json(makeRes({
        severity: 'success',
        message: 'Markdown found',
        data: contentObj,
    }));
}
