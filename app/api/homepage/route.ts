import { NextResponse } from 'next/server';
import type { TMarkdown } from '../../goldlabel/types';

export async function POST(request: Request) {
    try {
        // Create a homepage doc using TMarkdown type
        const homepageDoc: TMarkdown = {
            id: "/",
            published: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            frontmatter: {
                title: "Home",
                description: "Welcome to Goldlabel!",
                slug: "/",
                tags: "home,main",
                icon: "home",
                order: 1,
                image: "/png/og.png",
                author: "Goldlabel Team"
            },
            content: "# Welcome to Goldlabel!\nThis is your homepage."
        };
        return new NextResponse(JSON.stringify(homepageDoc), { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
    }
}
