'use client';

import {
  DesignSystemProvider,
  type DesignSystemThemeConfig,
} from '@nx/design-system';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type {
  ThemeMode,
  ThemeModeContextValue,
  ThemeModeProviderProps,
} from '../types';

const STORAGE_KEY = 'template.themeMode';

const ThemeModeContext = createContext<ThemeModeContextValue | null>(null);

export function useThemeMode() {
  const context = useContext(ThemeModeContext);

  if (!context) {
    throw new Error('useThemeMode must be used within ThemeModeProvider');
  }

  return context;
}

export default function ThemeModeProvider({
  children,
  initialMode,
  themeConfigs,
}: ThemeModeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>(initialMode);

  useEffect(() => {
    const persisted = window.localStorage.getItem(STORAGE_KEY);

    if (persisted === 'light' || persisted === 'dark') {
      setMode(persisted);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  const toggleMode = useCallback(() => {
    setMode((current) => (current === 'light' ? 'dark' : 'light'));
  }, []);

  const value = useMemo(
    () => ({ mode, setMode, toggleMode }),
    [mode, toggleMode],
  );

  return (
    <ThemeModeContext.Provider value={value}>
      <DesignSystemProvider mode={mode} themeConfig={themeConfigs?.[mode]}>
        {children}
      </DesignSystemProvider>
    </ThemeModeContext.Provider>
  );
}