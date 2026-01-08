// Markdown Type Definition
export type TMarkdown = {
    id: string;
    published: boolean;
    createdAt: string;
    updatedAt: string;
    frontmatter?: {
        title?: string;
        description?: string;
        slug?: string;
        tags?: string;
        icon?: string;
        order?: number;
        image?: string;
        author?: string;
        price?: {
            amount: number;
            currency: string;
        };
    };
    content?: string;
};
