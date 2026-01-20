export interface I_NX {
    children: React.ReactNode;
    config: T_Config;
}

export type T_Config = {
    project: string;
    title: string;
    description: string;
    url: string;
    favicon: string;
    image: string;
    icon: string;
    cartridges: {
        uberedux?: T_UbereduxCartridge;
        designSystem?: T_DesignSystemCartridge;
        images?: T_ImagesCartridge;
    };
};

// Uberedux cartridge type
export type T_UbereduxCartridge = Record<string, unknown>;

// DesignSystem cartridge type
export type T_DesignSystemCartridge = {
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

// Images cartridge types
export type T_ImagesCartridge = {
    enabled: boolean;
    description?: string;
    mode?: string;
    flickr: T_FlickrImage[];
};

export type T_FlickrImage = {
    title: string;
    slug: string;
    flickrId: string;
    src: string;
};

export type T_Feedback = {
    severity?: T_Severity;
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


export type T_Frontmatter = {
    title?: string;
    description?: string;
    slug?: string;
    tags?: string;
    icon?: string;
    order?: number;
    image?: string;
    flickr?: string;
    author?: string;
    price?: number;
    clickThru?: string;
    flickrSlug?: string;
};

export type T_Markdown = {
    id: string;
    published: boolean;
    createdAt: string;
    updatedAt: string;
    frontmatter?: T_Frontmatter;
};

export interface I_Header {
    title: string;
    description?: string;
    icon?: string;
}

export interface I_NavNode {
    title?: string;
    slug?: string;
    children?: I_NavNode[];
}

export interface I_NestedNav {
    navItems: T_NavItem[];
}


export interface I_DesignSystem {
    theme?: T_Theme;
    children: React.ReactNode;
}


export interface I_FeaturedImage {
    frontmatter?: T_Frontmatter;
    config?: T_Config;
}

export interface I_Ad {
    frontmatter?: T_Frontmatter;
    config?: T_Config;
}