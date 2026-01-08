import type { TMarkdown } from "../types";

// Mock implementation for demonstration
export async function getAllDocs(): Promise<TMarkdown[]> {
    return [
        {
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
        }
    ];
}
