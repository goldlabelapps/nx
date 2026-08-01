'use client';

import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';
import { createAppTheme } from '../theme';
import type { DesignSystemProviderProps } from '../types';

export default function DesignSystemProvider({ children, mode = 'light' }: DesignSystemProviderProps) {
  const theme = createAppTheme(mode);
  const isDark = mode === 'dark';

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ':root': {
            '--nx-ink': isDark ? '#ECEBFF' : '#1E1C34',
            '--nx-ink-logo': isDark ? '#ECEBFF' : '#201E39',
            '--nx-dusty': isDark ? '#C7C4F1' : '#2F2A56',
            '--nx-body': isDark ? '#D8D6F6' : '#2A2748',
            '--nx-sign': isDark ? '#BAB6EA' : '#47436D',
            '--nx-ash': isDark ? '#A9A4DE' : '#5F5A86',
            '--nx-muted': isDark ? '#9792CC' : '#7672A0',
            '--nx-fog': isDark ? '#8A84BF' : '#8C88B6',
            '--nx-parchment': isDark ? '#171622' : '#F6F5FF',
            '--nx-paper': isDark ? '#222132' : '#FFFFFF',
            '--nx-oat': isDark ? '#4A466E' : '#D9D6F2',
            '--nx-clay': isDark ? '#E6E4FF' : '#4A46B8',
            '--nx-line': isDark ? 'rgba(230, 228, 255, 0.22)' : 'rgba(30, 28, 52, 0.14)',
            '--nx-line-soft': isDark ? 'rgba(230, 228, 255, 0.12)' : 'rgba(30, 28, 52, 0.08)',
            '--nx-glass': isDark ? 'rgba(34, 33, 50, 0.65)' : 'rgba(255, 255, 255, 0.42)',
            '--nx-glass-hi': isDark ? 'rgba(40, 39, 58, 0.74)' : 'rgba(255, 255, 255, 0.5)',
            '--nx-tile': isDark ? 'rgba(34, 33, 50, 0.86)' : 'rgba(255, 255, 255, 0.72)',
            '--nx-scrim': 'rgba(23, 22, 34, 0.93)',
            '--nx-shadow-card': isDark ? '0 12px 40px rgba(7, 7, 16, 0.45)' : '0 12px 40px rgba(30, 28, 52, 0.14)',
            '--nx-shadow-card-hover': isDark ? '0 28px 66px rgba(7, 7, 16, 0.58)' : '0 28px 66px rgba(30, 28, 52, 0.22)',
            '--nx-shadow-glass': isDark
              ? '0 26px 60px -12px rgba(7, 7, 16, 0.58), 0 2px 6px rgba(7, 7, 16, 0.22)'
              : '0 26px 60px -12px rgba(30, 28, 52, 0.22), 0 2px 6px rgba(30, 28, 52, 0.08)',
            '--nx-shadow-button': isDark ? '0 12px 30px rgba(6, 6, 14, 0.5)' : '0 12px 30px rgba(30, 28, 52, 0.24)',
            '--nx-shadow-button-hi': isDark ? '0 18px 40px rgba(6, 6, 14, 0.62)' : '0 18px 40px rgba(30, 28, 52, 0.32)',
            '--nx-shadow-float': isDark ? '0 40px 80px rgba(7, 7, 16, 0.62)' : '0 40px 80px rgba(30, 28, 52, 0.32)',
            '--nx-shadow-pop': isDark ? '0 16px 48px rgba(7, 7, 16, 0.58)' : '0 16px 48px rgba(30, 28, 52, 0.24)',
            '--surface-input': isDark ? 'rgba(34, 33, 50, 0.92)' : 'rgba(255, 255, 255, 0.92)',
            '--surface-input-hover': isDark ? '#2A2940' : '#F0EEFF',
            '--surface-input-focus': isDark ? '#2F2E48' : '#FFFFFF',
            '--surface-input-disabled': isDark ? '#2F2D44' : '#DDDaf4',
            '--border-input': isDark ? 'rgba(230, 228, 255, 0.28)' : 'rgba(30, 28, 52, 0.28)',
            '--border-input-hover': isDark ? 'rgba(230, 228, 255, 0.42)' : 'rgba(30, 28, 52, 0.42)',
            '--border-input-focus': isDark ? '#E6E4FF' : '#4A46B8',
            '--focus-ring': isDark ? '#E6E4FF' : '#4A46B8',
          },
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
