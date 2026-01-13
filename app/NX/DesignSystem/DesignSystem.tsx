'use client';
import * as React from 'react';
import { TTheme, IDesignSystem } from '../types';
import { ThemeProvider, CssBaseline } from '@mui/material';
import {
  useMUITheme,
} from '../DesignSystem';

export default function DesignSystem({
  theme,
  children = null,
}: IDesignSystem) {
  const newtheme = useMUITheme(theme as TTheme);

  return (
    <ThemeProvider theme={newtheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
