export interface I_NX {
    children: React.ReactNode;
    config: TNXConfig;
}

export type T_Config = {
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
                    mode: 'light' | 'dark';
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
        imageSlug?: string;
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

export interface I_Header {
    title: string;
    description?: string;
    icon?: string;
}

export interface I_NavNode {
    title?: string;
    slug?: string;
    children?: INavNode[];
}

export interface I_NestedNav {
    navItems: T_NavItem[];
}


export interface I_DesignSystem {
    theme?: TTheme;
    children: React.ReactNode;
}

export type T_Feedback = {
    severity?: TSeverity;
    title?: string;
    description?: string;
} | null;

export type T_Severity = 'success' | 'info' | 'warning' | 'error';

export type T_NavItem = {
    title: string;
    path: string;
    order?: number;
    children?: T_NavItem[];
};

export type T_Theme = {
    mode: 'light' | 'dark';
    primary: string;
    secondary: string;
    background: string;
    paper: string;
    text: string;
    border: string;
};
