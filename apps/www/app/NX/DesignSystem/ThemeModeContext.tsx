'use client';

import { DesignSystemProvider, type DesignSystemThemeConfig } from '@nx/design-system';
import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

export type ThemeMode = 'light' | 'dark';

export type ThemeModeContextValue = {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
};

type ThemeModeProviderProps = {
  children: ReactNode;
  initialMode: ThemeMode;
  themeConfigs?: Partial<Record<ThemeMode, DesignSystemThemeConfig>>;
};

export const ThemeModeContext = createContext<ThemeModeContextValue | null>(null);

export function useThemeMode() {
  const context = useContext(ThemeModeContext);

  if (!context) {
    throw new Error('useThemeMode must be used within a ThemeModeProvider');
  }

  return context;
}

export function ThemeModeProvider({ children, initialMode, themeConfigs }: ThemeModeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>(initialMode);
  const value = useMemo(() => ({ mode, setMode }), [mode]);
  const activeThemeConfig = themeConfigs?.[mode];

  return (
    <ThemeModeContext.Provider value={value}>
      <DesignSystemProvider mode={mode} themeConfig={activeThemeConfig}>
        {children}
      </DesignSystemProvider>
    </ThemeModeContext.Provider>
  );
}
