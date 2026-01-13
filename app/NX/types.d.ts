// Naming conventions 
// Types start with T_ and interfaces with I_
import { TTheme } from './types';

export interface I_NX {
    children: React.ReactNode;
    config: TNXConfig;
}

export interface TNXConfig {
    project: string;
    url: string;
    title?: string;
    description?: string;
    icon?: string;
    image?: string;
    favicon?: string;
    cartridges: {
        designSystem: {
            allowTheme?: boolean;
            defaultTheme: string;
            themes: {
                [key: string]: TTheme;
            };
        };
        [key: string]: any;
    };
}

export interface I_NestedNav {
    navItems: T_NavItem[];
}


export interface IDesignSystem {
    theme?: TTheme;
    children: React.ReactNode;
}

export type TFeedback = {
    severity?: TSeverity;
    title?: string;
    description?: string;
} | null;

export type TSeverity = 'success' | 'info' | 'warning' | 'error';

export type T_NavItem = {
    title: string;
    path: string;
    order?: number;
    children?: T_NavItem[];
};

export type TTheme = {
    mode: 'light' | 'dark';
    primary: string;
    secondary: string;
    background: string;
    paper: string;
    text: string;
    border: string;
};

