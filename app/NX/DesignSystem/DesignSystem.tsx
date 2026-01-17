'use client';
import * as React from 'react';
import { T_Theme, I_DesignSystem } from '../types';
import { ThemeProvider, CssBaseline } from '@mui/material';
import {
  useMUITheme,
} from '../DesignSystem';

export default function DesignSystem({
  theme,
  children = null,
}: I_DesignSystem) {
  const newtheme = useMUITheme(theme as T_Theme);

  return (
    <ThemeProvider theme={newtheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
