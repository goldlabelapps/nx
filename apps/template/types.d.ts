import type { DesignSystemThemeConfig } from '@nx/design-system';
import type { ReactNode } from 'react';

export type ThemeMode = 'light' | 'dark';

export type TemplateThemeConfig = {
	mode?: ThemeMode;
	primary?: string;
	secondary?: string;
	background?: string;
	paper?: string;
	text?: string;
	textSecondary?: string;
};

export type TemplateThemeMap = Record<string, TemplateThemeConfig>;

export type ThemeModeProviderProps = {
	children: ReactNode;
	initialMode: ThemeMode;
	themeConfigs?: Partial<Record<ThemeMode, DesignSystemThemeConfig>>;
};

export type ThemeModeContextValue = {
	mode: ThemeMode;
	setMode: (mode: ThemeMode) => void;
	toggleMode: () => void;
};
