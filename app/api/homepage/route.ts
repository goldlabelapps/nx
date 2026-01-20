import { NextResponse } from 'next/server';
import type { T_Markdown } from '../../NX/types';

export async function POST(request: Request) {
    try {
        // Create a homepage doc using T_Markdown type
        const homepageDoc: T_Markdown = {
            id: "/",
            published: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            frontmatter: {
                title: "Home",
                description: "Welcome to Goldlabel!",
                slug: "/",
                flickrSlug: 'random',
                tags: "home,main",
                icon: "home",
                order: 1,
                image: "/png/og.png",
                author: "Goldlabel Team"
            }
        };
        return new NextResponse(JSON.stringify(homepageDoc), { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
    }
}
