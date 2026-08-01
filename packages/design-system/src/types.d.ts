import type { SxProps, Theme } from '@mui/material/styles';
import type { CSSProperties, ReactNode } from 'react';

export type DesignSystemMode = 'light' | 'dark';

export type LogoProps = {
	name?: string;
	children?: ReactNode;
	subtitle?: string;
};

export type DesignSystemProviderProps = {
	children: ReactNode;
	mode?: DesignSystemMode;
};

export type HeadingTone = 'primary' | 'secondary' | 'ink' | 'clay';

export type HeadingProps = {
	children: ReactNode;
	tone?: HeadingTone;
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
	hoverLift?: boolean;
};

export type FieldProps = {
	label?: string;
	hint?: string;
	error?: string;
};

export type ButtonTone = 'primary' | 'neutral' | 'danger';

export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'text';

export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonProps = {
	children: ReactNode;
	variant?: ButtonVariant;
	tone?: ButtonTone;
	size?: ButtonSize;
	fullWidth?: boolean;
	disabled?: boolean;
	href?: string;
	onClick?: () => void;
	startIcon?: ReactNode;
	endIcon?: ReactNode;
	type?: 'button' | 'submit' | 'reset';
	ariaLabel?: string;
	className?: string;
	sx?: SxProps<Theme>;
};

export type IconButtonProps = {
	icon: ReactNode;
	variant?: ButtonVariant;
	tone?: ButtonTone;
	size?: ButtonSize;
	disabled?: boolean;
	href?: string;
	onClick?: () => void;
	type?: 'button' | 'submit' | 'reset';
	ariaLabel: string;
	className?: string;
	sx?: SxProps<Theme>;
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

export type FeaturedImageData = {
	src: string;
	alt?: string;
	width?: number | string;
	height?: number | string;
	objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
};

export type FeaturedImageProps = {
	image: FeaturedImageData;
	width?: number | string;
	height?: number | string;
};

export type SiteMainProps = {
	children: ReactNode;
	featuredImage?: string | null;
};

export type SiteSidebarProps = {
	title?: string;
	text?: string;
};
