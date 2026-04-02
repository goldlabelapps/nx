
import { NextResponse } from 'next/server';
import { makeRes } from '../';
import { serverUseMDBySlug } from '../../NX/lib/serverHooks/serverUseMDBySlug';
import path from 'path';
import matter from 'gray-matter';
import fs from 'fs';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');
    const slugArr = slug ? decodeURIComponent(slug).split('/').filter(Boolean) : [];
    const tenant = process.env.NEXT_PUBLIC_TENANT || 'free';
    const filePath = serverUseMDBySlug(slugArr, tenant);
    console.log('[API/markdown] slug:', slug);

    if (!filePath || !fs.existsSync(filePath)) {
        return NextResponse.json(makeRes({
            severity: 'warning',
            message: `404 on slug: ${slug} `,
        }), { status: 404 });
    }

    const md = fs.readFileSync(filePath, 'utf-8');
    const { content, data } = matter(md);
    const contentObj = {
        frontmatter: data,
        content,
    };

    return NextResponse.json(makeRes({
        severity: 'success',
        message: `Markdown for ${contentObj?.frontmatter?.title || slug}`,
        data: contentObj,
    }));
}
