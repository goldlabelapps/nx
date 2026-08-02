import type { SxProps, Theme } from '@mui/material/styles';
import type { ListItemButtonProps as MuiListItemButtonProps } from '@mui/material/ListItemButton';
import type { ListItemProps as MuiListItemProps } from '@mui/material/ListItem';
import type { ListItemTextProps as MuiListItemTextProps } from '@mui/material/ListItemText';
import type { ListProps as MuiListProps } from '@mui/material/List';
import type { ListSubheaderProps as MuiListSubheaderProps } from '@mui/material/ListSubheader';
import type { CSSProperties, MouseEvent, ReactNode } from 'react';

export type DesignSystemMode = 'light' | 'dark';

export type DesignSystemThemeConfig = {
	primary?: string;
	secondary?: string;
	background?: string;
	paper?: string;
	text?: string;
	textSecondary?: string;
};

export type LogoProps = {
	name?: string;
	children?: ReactNode;
	subtitle?: string;
	favicon?: boolean;
	faceColor?: string;
	smileColor?: string;
};

export type DesignSystemProviderProps = {
	children: ReactNode;
	mode?: DesignSystemMode;
	themeConfig?: DesignSystemThemeConfig;
};

export type HeadingTone = 'primary' | 'secondary' | 'ink' | 'clay';
export type HeadingVariant = 'label' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type HeadingProps = {
	children: ReactNode;
	tone?: HeadingTone;
	as?: 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
	variant?: HeadingVariant;
	style?: CSSProperties;
	sx?: SxProps<Theme>;
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

export type ListProps = MuiListProps;
export type ListItemProps = MuiListItemProps;
export type ListItemButtonProps = MuiListItemButtonProps;
export type ListItemTextProps = MuiListItemTextProps;
export type ListSubheaderProps = MuiListSubheaderProps;

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
	onClick?: (event: MouseEvent<HTMLElement>) => void;
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
	onClick?: (event: MouseEvent<HTMLElement>) => void;
	type?: 'button' | 'submit' | 'reset';
	ariaLabel: string;
	className?: string;
	color?: 'inherit' | 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
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

export type BreadcrumbProps = {
	items: BreadcrumbItem[];
};

export type SiteHeaderProps = {
	title: string;
	description?: string;
	homeHref: string;
	logoSrc: string;
	logoAlt?: string;
	navItems: ReactNode;
	actions?: ReactNode;
};

export type MenuDrawerProps = {
	navItems: ReactNode;
	toggleAriaLabel?: string;
};

export type FeaturedImageData = {
	src: string;
	alt?: string | null;
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
