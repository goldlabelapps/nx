import { createTheme } from '@mui/material/styles';
import type { DesignSystemMode, DesignSystemThemeConfig } from '../types';

export function createAppTheme(mode: DesignSystemMode = 'light', themeConfig?: DesignSystemThemeConfig) {
  const isDark = mode === 'dark';
  const resolvedPrimary = themeConfig?.primary ?? (isDark ? '#F3F3F3' : '#5A5A5A');
  const resolvedSecondary = themeConfig?.secondary ?? (isDark ? '#E3E3E3' : '#7A7A7A');

  const palette = {
    dark: {
      primary: resolvedPrimary,
      secondary: resolvedSecondary,
      background: '#111111',
      paper: '#1C1C1C',
      text: '#F7F7F7',
      textSecondary: '#C7C7C7',
      border: 'rgba(255, 255, 255, 0.16)',
      borderSoft: 'rgba(255, 255, 255, 0.10)',
      shadow: '0 12px 40px rgba(0, 0, 0, 0.35)',
      buttonShadow: '0 12px 30px rgba(0, 0, 0, 0.4)',
    },
    light: {
      primary: resolvedPrimary,
      secondary: resolvedSecondary,
      background: '#FFFFFF',
      paper: '#FFFFFF',
      text: '#1E1E1E',
      textSecondary: '#5A5A5A',
      border: 'rgba(31, 31, 31, 0.14)',
      borderSoft: 'rgba(31, 31, 31, 0.08)',
      shadow: '0 12px 40px rgba(31, 31, 31, 0.12)',
      buttonShadow: '0 12px 30px rgba(31, 31, 31, 0.18)',
    },
  }[mode];

  const resolvedPalette = {
    ...palette,
    background: themeConfig?.background ?? palette.background,
    paper: themeConfig?.paper ?? palette.paper,
    text: themeConfig?.text ?? palette.text,
    textSecondary: themeConfig?.textSecondary ?? palette.textSecondary,
  };

  return createTheme({
    palette: {
      mode,
      primary: {
        main: resolvedPalette.primary,
        contrastText: isDark ? '#111111' : '#FFFFFF',
      },
      secondary: {
        main: resolvedPalette.secondary,
        contrastText: isDark ? '#111111' : '#FFFFFF',
      },
      background: {
        default: resolvedPalette.background,
        paper: resolvedPalette.paper,
      },
      text: {
        primary: resolvedPalette.text,
        secondary: resolvedPalette.textSecondary,
      },
    },
    shape: {
      borderRadius: 3
    },
    typography: {
      fontFamily: '"DM Sans", "Segoe UI", Roboto, sans-serif',
      h1: {
        fontFamily: 'var(--font-title)',
        fontWeight: 700,
        fontSize: '2.5rem',
        lineHeight: 1.05,
        letterSpacing: '-0.02em',
        color: resolvedPalette.secondary,
      },
      h2: {
        fontFamily: 'var(--font-title)',
        fontWeight: 700,
        fontSize: '2rem',
        lineHeight: 1.1,
        color: resolvedPalette.secondary,
      },
      h3: {
        fontFamily: 'var(--font-title)',
        fontWeight: 600,
        fontSize: '1.5rem',
        color: resolvedPalette.secondary,
      },
      button: {
        textTransform: 'none',
        fontWeight: 600,
        letterSpacing: '0.01em'
      }
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '3px',
            padding: '0.7rem 1.2rem',
            boxShadow: resolvedPalette.buttonShadow,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            border: `1px solid ${resolvedPalette.border}`,
            boxShadow: resolvedPalette.shadow,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: '3px',
            border: `1px solid ${resolvedPalette.borderSoft}`,
          },
        },
      },
    },
  });
}

export default createAppTheme;