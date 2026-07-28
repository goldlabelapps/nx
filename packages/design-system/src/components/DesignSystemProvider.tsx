'use client';

import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';
import type { ReactNode } from 'react';
import { createAppTheme, type DesignSystemMode } from '../theme';

type DesignSystemProviderProps = {
  children: ReactNode;
  mode?: DesignSystemMode;
};

export function DesignSystemProvider({ children, mode = 'light' }: DesignSystemProviderProps) {
  const theme = createAppTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
            transition: 'background-color 0.2s ease'
          }
        }}
      />
      {children}
    </ThemeProvider>
  );
}
