'use client';

import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';
import { createAppTheme } from '../styles/theme';
import type { DesignSystemProviderProps } from '../types';
import { getNxStyle } from './nxStyle';

export default function DesignSystemProvider({ children, mode = 'light' }: DesignSystemProviderProps) {
  const theme = createAppTheme(mode);
  const style = getNxStyle(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ...style,
          body: {
            ...style.body,
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
            transition: 'background-color 0.2s ease',
          },
        }}
      />
      {children}
    </ThemeProvider>
  );
}
