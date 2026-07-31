import type { T_RootState, T_UbereduxDispatch } from '../NX/Uberedux/store';

export type { T_RootState, T_UbereduxDispatch };

// Core primitives
export type T_Severity = 'success' | 'error' | 'warning' | 'info';

export interface I_MakeRes {
    severity: T_Severity;
    message: string;
    data?: any;
}

export type T_Tenant = 'my-tenant' | 'new-tenant';

// Messaging
export type T_EmailContact = {
    label: string;
    email: string;
};

export type T_Email = {
    from: T_EmailContact;
    to: T_EmailContact;
    subject: string;
    body: string;
    template?: string;
};

// Theming and config
export type T_Theme = {
    mode: 'light' | 'dark';
    primary: string;
    secondary: string;
    background: string;
    paper: string;
    text: string;
    border: string;
};

export type T_ConfigTheme = {
    mode: string;
    primary: string;
    secondary: string;
    background: string;
    paper: string;
    text: string;
};

export type T_Config = {
    siteName: string;
    tenant: string;
    description: string;
    url: string;
    owner: {
        name: string;
        email: string;
    };
    images: {
        light: string;
        dark: string;
    };
    favicon: string;
    avatars: {
        light: string;
        dark: string;
    };
    cartridges: {
        designSystem?: {
            themeSwitching: boolean;
            defaultTheme: string;
            themes: Record<string, T_ConfigTheme>;
        };
    };
};

export type T_Meta = {
    siteName?: string;
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    openGraphImages?: { url: string; width?: number; height?: number; alt?: string }[];
    openGraph?: {
        title?: string;
        description?: string;
        url?: string;
        siteName?: string;
        images?: string[];
        type?: string;
    };
};

// Content
export type T_Frontmatter = {
    title?: string;
    description?: string;
    slug?: string;
    tags?: string;
    icon?: string;
    order?: number;
    image?: string;
    layout?: string;
    hideInNav?: boolean | string;
};

export type T_Markdown = {
    id: string;
    published: boolean;
    createdAt: string;
    updatedAt: string;
    frontmatter?: T_Frontmatter;
};

// Navigation
export type T_NavItem = {
    title: string;
    path: string;
    order?: number;
    children?: T_NavItem[];
};

export interface I_NavNode {
    title?: string;
    slug?: string;
    path?: string;
    children?: I_NavNode[];
    icon?: string;
}

export interface I_NestedNav {
    navItems: T_NavItem[];
}

export interface I_Nav {
    navItems: I_NavNode[];
    mode?: 'mobile' | 'desktop';
    frontmatter?: T_Frontmatter;
}

// Cartridges
export type T_Ad = {
    type: string;
    title: string;
    url?: string;
    path?: string;
    price?: string;
    description?: string;
    icon?: string;
    image?: string;
    affiliate?: string;
    target?: string;
};

export type T_CommerceCartridge = {
    enabled: boolean;
    ads: boolean | T_Ad[];
};

export type T_CommerceShortcode = {
    [key: string]: any;
};

export type T_LinguaCartridge = {
    enabled: boolean;
    defaultLanguage: string;
    languages: Record<string, { name: string; flag: string }>;
};

export type T_EchoPayCartridge = Record<string, unknown>;

export type T_UbereduxCartridge = Record<string, unknown>;

export type T_DesignSystemCartridge = {
    allowTheme: boolean;
    defaultTheme: string;
    themes: Record<string, T_Theme>;
};

export type T_FlickrImage = {
    title: string;
    slug: string;
    flickrId: string;
    src: string;
};

export type T_ImagesCartridge = {
    enabled: boolean;
    description?: string;
    mode?: string;
    flickr: T_FlickrImage[];
};

// UI and component contracts
export type T_Feedback =
    | {
          severity?: T_Severity;
          title?: string;
          description?: string;
      }
    | null;

export interface I_Header {
    title: string;
    description?: string;
    icon?: string;
}

export interface I_NX {
    children: React.ReactNode;
    config: T_Config;
    frontmatter?: T_Frontmatter;
    flash?: string;
}

export interface I_DesignSystem {
    theme?: T_Theme;
    config?: T_Config;
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
        | 'heart'
        | 'hammer'
        | 'archive'
        | 'maths'
        | 'free'
        | 'seniority'
        | 'writing'
        | 'books'
        | 'ski'
        | 'skiing'
        | 'typescript'
        | 'van'
        | 'stop'
        | 'fullstack'
        | 'web3d'
        | 'rocket'
        | 'required'
        | 'logs'
        | 'dashboard'
        | 'bike'
        | 'png'
        | 'user'
        | 'visitors'
        | 'visitor'
        | 'ki'
        | 'users'
        | 'cake'
        | 'dessert'
        | 'asian'
        | 'pdf'
        | 'tick'
        | 'case'
        | 'forward'
        | 'caseclosed'
        | 'cases'
        | 'caseclock'
        | 'upload'
        | 'plus'
        | 'dog'
        | 'about'
        | 'tenant'
        | 'public'
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
        | 'async'
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
        | 'send'
        | 'prospects'
        | 'forget'
        | 'book'
        | 'folder'
        | 'fingerprint'
        | 'fallmanager'
        | 'youtube'
        | 'boot'
        | 'virus'
        | 'hide'
        | 'show'
        | 'notify'
        | 'media'
        | 'save'
        | 'cash'
        | 'filters'
        | 'new'
        | 'create'
        | 'firebase'
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
        | 'random'
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
        | 'python'
        | 'flag'
        | 'techstack'
        | 'backoffice'
        | 'queue'
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
        | 'flagoff'
        | 'stalk'
        | 'flagon'
        | 'categories'
        | 'category'
        | 'tings'
        | 'info'
        | 'warning'
        | 'opensource'
        | 'features'
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
        | 'tag'
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
        | 'orders'
        | 'staroff'
        | 'staron'
        | 'bouncer';
    color?: any;
};