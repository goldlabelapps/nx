'use client';

import { useMemo } from 'react';
import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';
import { createAppTheme } from '../styles/theme';
import type { DesignSystemProviderProps } from '../types';
import { getNxStyle } from './nxStyle';

function resolveInitialMode(mode?: 'light' | 'dark') {
  if (mode) {
    return mode;
  }

  if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  return 'light';
}

export default function DesignSystemProvider({ children, mode, themeConfig }: DesignSystemProviderProps) {
  const resolvedMode = useMemo(() => resolveInitialMode(mode), [mode]);
  const theme = createAppTheme(resolvedMode, themeConfig);
  const style = getNxStyle(resolvedMode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ...style,
          body: {
            ...style.body,
            backgroundColor: 'transparent',
            color: theme.palette.text.primary,
            transition: 'background-color 0.2s ease',
          },
        }}
      />
      {children}
    </ThemeProvider>
  );
}
