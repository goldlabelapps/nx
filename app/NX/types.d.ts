export interface I_NX {
    children: React.ReactNode;
    config: T_Config;
}
smartImage ?: T_SmartImage;
}

export type T_SmartImage = {
    src: string;
    meta: {
        title?: string;
        alt?: string;
        message?: string;
    };
};

export type T_Ad =
    | {
        type: 'link';
        title: string;
        url: string;
        description?: string;
        icon?: string;
        image?: string;
    }
    | {
        type: 'route';
        title: string;
        path: string;
        price?: string;
        description?: string;
        icon?: string;
        image?: string;
        affiliate?: string;
    };

export type T_CommerceCartridge = {
    enabled: boolean;
    ads: T_Ad[];
};

export type T_CommerceShortcode = {
    [key: string]: any;
};

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
        commerce?: T_CommerceCartridge;
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
    icon?: string;
}

export interface I_NestedNav {
    navItems: T_NavItem[];
}


export interface I_DesignSystem {
    theme?: T_Theme;
    children: React.ReactNode;
}

export interface I_Terminal {
    children: React.ReactNode;
}


export interface I_Paywall {
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

export type I_Icon = {
    icon:
    | 'more'
    | 'free'
    | 'writing'
    | 'books'
    | 'ski'
    | 'skiing'
    | 'typescript'
    | 'van'
    | 'fullstack'
    | 'web3d'
    | 'rocket'
    | 'logs'
    | 'dashboard'
    | 'bike'
    | 'user'
    | 'visitors'
    | 'visitor'
    | 'ki'
    | 'users'
    | 'pdf'
    | 'tick'
    | 'case'
    | 'caseclosed'
    | 'cases'
    | 'caseclock'
    | 'upload'
    | 'plus'
    | 'dog'
    | 'about'
    | 'experience'
    | 'clients'
    | 'link'
    | 'album'
    | 'flickr'
    | 'photo'
    | 'film'
    | 'preview'
    | 'add'
    | 'account'
    | 'download'
    | 'job'
    | 'copy'
    | 'linkedin'
    | 'core'
    | 'cartridge'
    | 'uberedux'
    | 'good-fit'
    | 'products'
    | 'flash'
    | 'speak-write'
    | 'admin'
    | 'private'
    | 'company'
    | 'feature'
    | 'auth'
    | 'design'
    | 'ai'
    | 'ask'
    | 'forget'
    | 'folder'
    | 'fingerprint'
    | 'fallmanager'
    | 'youtube'
    | 'boot'
    | 'hide'
    | 'show'
    | 'save'
    | 'filters'
    | 'filter'
    | 'fullscreen'
    | 'examples'
    | 'signup'
    | 'what'
    | 'when'
    | 'who'
    | 'how'
    | 'legal'
    | 'geo'
    | 'docker'
    | 'scuba'
    | 'js'
    | 'javascript'
    | 'oliver'
    | 'life'
    | 'balance'
    | 'bug'
    | 'geolocator'
    | 'google'
    | 'lingua'
    | 'plugin'
    | 'doc'
    | 'reset'
    | 'accommodation'
    | 'spy'
    | 'seed'
    | 'github'
    | 'members'
    | 'notifyer'
    | 'notifyr'
    | 'pingpong'
    | 'close'
    | 'bus'
    | 'darkmode'
    | 'lightmode'
    | 'pool'
    | 'boat'
    | 'car'
    | 'bar'
    | 'shop'
    | 'home'
    | 'fish'
    | 'mobile'
    | 'blog'
    | 'search'
    | 'cancel'
    | 'delete'
    | 'techstack'
    | 'backoffice'
    | 'edit'
    | 'example'
    | 'goldlabel'
    | 'wordpress'
    | 'where'
    | 'whatsapp'
    | 'expand'
    | 'web'
    | 'twitter'
    | 'facebook'
    | 'ting'
    | 'settings'
    | 'team'
    | 'email'
    | 'contact'
    | 'share'
    | 'leaf'
    | 'star'
    | 'food'
    | 'medical'
    | 'scooter'
    | 'diveshop'
    | 'diving'
    | 'news'
    | 'aicase'
    | 'activities'
    | 'left'
    | 'down'
    | 'up'
    | 'sitemap'
    | 'right'
    | 'menu'
    | 'success'
    | 'categories'
    | 'category'
    | 'tings'
    | 'info'
    | 'warning'
    | 'error'
    | 'signout'
    | 'api'
    | 'work'
    | 'macos'
    | 'signin'
    | 'blokey'
    | 'android'
    | 'openai'
    | 'chrome'
    | 'desktop'
    | 'desktopmac'
    | 'edge'
    | 'linux'
    | 'windows'
    | 'xbox'
    | 'mac'
    | 'why'
    | 'iphone'
    | 'paywall'
    | 'safari'
    | 'firefox'
    | 'plugins'
    | 'files'
    | 'expertise'
    | 'tags'
    | 'vape'
    | 'terminal'
    | 'bouncer';
    color?: any;
};
