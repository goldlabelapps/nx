import type { CSSProperties, ReactNode } from 'react';

export type DesignSystemMode = 'light' | 'dark';

export type LogoProps = {
	name?: string;
	children?: ReactNode;
};

export type ColorToken = {
	label: string;
	cssVar: string;
	note: string;
};

export type ColorGroup = {
	title: string;
	tokens: readonly ColorToken[];
};

export type ColorPaletteProps = {
	title?: string;
	subtitle?: string;
};

export type DesignSystemProviderProps = {
	children: ReactNode;
	mode?: DesignSystemMode;
};

export type EyebrowTone = 'primary' | 'secondary' | 'ink' | 'clay';

export type EyebrowProps = {
	children: ReactNode;
	tone?: EyebrowTone;
	as?: 'span' | 'div';
	style?: CSSProperties;
};

export type AlertSeverity = 'info' | 'success' | 'warning' | 'error';

export type AlertProps = {
	children: ReactNode;
	title?: string;
	severity?: AlertSeverity;
	dismissible?: boolean;
};

export type CardPadding = 'sm' | 'md' | 'lg';

export type CardVariant = 'paper' | 'glass' | 'tile' | 'ink';

export type CardProps = {
	children: ReactNode;
	padding?: CardPadding;
	variant?: CardVariant;
};

export type FieldProps = {
	label?: string;
	hint?: string;
	error?: string;
};

export type AppShellProps = {
	children: ReactNode;
};

export type PageSectionProps = {
	children: ReactNode;
	title?: string;
	subtitle?: string;
};

export type SectionTitleProps = {
	title: string;
	subtitle?: string;
};

export type T_NavNode = {
	title?: string;
	slug?: string;
	path?: string;
	children?: T_NavNode[];
};

export type SiteNavProps = {
	items: T_NavNode[];
};

export type UseIsMobileOptions = {
	maxWidth?: number;
};

export type VisibilityProps = {
	children: ReactNode;
	maxWidth?: number;
	fallback?: ReactNode;
};

export type BreadcrumbItem = {
	label: string;
	href?: string;
};

export type SiteHeaderProps = {
	title: string;
	description?: string;
	breadcrumbItems: BreadcrumbItem[];
	homeHref: string;
	logoSrc: string;
	logoAlt?: string;
	navItems: ReactNode;
};

export type SiteMainProps = {
	children: ReactNode;
	featuredImage?: string | null;
};

export type SiteSidebarProps = {
	title?: string;
	text?: string;
};
