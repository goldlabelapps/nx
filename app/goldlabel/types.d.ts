// GoldLabel Config Type Definition
export type TGoldlabelConfig = {
    title: string;
    description: string;
    url: string;
    cartridges: {
        designSystem: {
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

