export interface IHeader {
    title: string;
    description: string;
    icon?: string;
}
// GoldLabel Config Type Definition
export type TNXConfig = {
    project: string;
    url: string;
    favicon: string;
    image: string;
    cartridges: {
        uberedux?: Record<string, unknown>;
        designSystem: {
            allowTheme: boolean;
            defaultTheme: string;
            themes: {
                [key: string]: {
                    mode: string;
                    primary: string;
                    secondary: string;
                    background: string;
                    paper: string;
                    border: string;
                    text: string;
                };
            };
        };
    };
};


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
    /**
     * The featured image for the markdown, or the fallback from config if not present
     */
    image?: string;
    content?: string;
};

export interface INavNode {
    title?: string;
    slug?: string;
    children?: INavNode[];
}

export interface IContextualNavigationProps {
    rootNode: INavNode;
    currentSlug: string;
}

