'use client';

import { DesignSystemProvider, type DesignSystemThemeConfig } from '@nx/design-system';
import {
  readPersistedThemeModeFromStorage,
  selectPersistedThemeMode,
  setPersistedThemeMode,
  themePreferencePersistor,
  themePreferenceStore,
} from '@nx/uberedux';
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type ThemeMode = 'light' | 'dark';
export type ThemeModePreference = ThemeMode | 'system';

export type ThemeModeContextValue = {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
};

type ThemeModeProviderProps = {
  children: ReactNode;
  initialMode: ThemeModePreference;
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

export function resolveThemeMode(initialMode: ThemeModePreference | undefined): ThemeMode {
  if (initialMode === 'dark' || initialMode === 'light') {
    return initialMode;
  }

  return 'light';
}

export function ThemeModeProvider({ children, initialMode, themeConfigs }: ThemeModeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>(() => resolveThemeMode(initialMode));
  const [themeResolved, setThemeResolved] = useState(false);

  useEffect(() => {
    const persistedMode = readPersistedThemeModeFromStorage();

    if (persistedMode) {
      setMode(persistedMode);
    } else if (initialMode === 'system' && typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
      setMode(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }

    setThemeResolved(true);
  }, [initialMode]);

  useEffect(() => {
    const unsubscribe = themePreferencePersistor.subscribe(() => {
      const persistorState = themePreferencePersistor.getState();

      if (!persistorState.bootstrapped) {
        return;
      }

      const persistedMode = selectPersistedThemeMode(themePreferenceStore.getState());

      if (persistedMode) {
        setMode(persistedMode);
      }

      unsubscribe();
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!themeResolved) {
      return;
    }

    themePreferenceStore.dispatch(setPersistedThemeMode(mode));
  }, [mode, themeResolved]);

  const value = useMemo(() => ({ mode, setMode }), [mode]);
  const activeThemeConfig = themeConfigs?.[mode];

  if (!themeResolved) {
    return null;
  }

  return (
    <ThemeModeContext.Provider value={value}>
      <DesignSystemProvider mode={mode} themeConfig={activeThemeConfig}>
        {children}
      </DesignSystemProvider>
    </ThemeModeContext.Provider>
  );
}
