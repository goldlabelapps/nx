import { createTheme } from '@mui/material/styles';

export type DesignSystemMode = 'light' | 'dark';

export function createAppTheme(mode: DesignSystemMode = 'light') {
  const isDark = mode === 'dark';

  const palette = {
    dark: {
      primary: '#E6E4FF',
      secondary: '#E0DEFF',
      background: '#171622',
      paper: '#222132',
      text: '#ECEBFF',
      textSecondary: '#BAB6EA',
      border: 'rgba(230, 228, 255, 0.22)',
      borderSoft: 'rgba(230, 228, 255, 0.12)',
      shadow: '0 12px 40px rgba(7, 7, 16, 0.45)',
      buttonShadow: '0 12px 30px rgba(6, 6, 14, 0.5)',
    },
    light: {
      primary: '#4A46B8',
      secondary: '#6C68D6',
      background: '#F6F5FF',
      paper: '#FFFFFF',
      text: '#1E1C34',
      textSecondary: '#565279',
      border: 'rgba(30, 28, 52, 0.14)',
      borderSoft: 'rgba(30, 28, 52, 0.08)',
      shadow: '0 12px 40px rgba(30, 28, 52, 0.14)',
      buttonShadow: '0 12px 30px rgba(30, 28, 52, 0.24)',
    },
  }[mode];

  return createTheme({
    palette: {
      mode,
      primary: {
        main: palette.primary,
      },
      secondary: {
        main: palette.secondary,
      },
      background: {
        default: palette.background,
        paper: palette.paper,
      },
      text: {
        primary: palette.text,
        secondary: palette.textSecondary,
      },
    },
    shape: {
      borderRadius: 20
    },
    typography: {
      fontFamily: '"DM Sans", "Segoe UI", Roboto, sans-serif',
      h1: {
        fontWeight: 700,
        fontSize: '2.5rem',
        lineHeight: 1.05,
        letterSpacing: '-0.02em'
      },
      h2: {
        fontWeight: 700,
        fontSize: '2rem',
        lineHeight: 1.1
      },
      h3: {
        fontWeight: 600,
        fontSize: '1.5rem'
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
            borderRadius: '999px',
            padding: '0.7rem 1.2rem',
            boxShadow: palette.buttonShadow,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            border: `1px solid ${palette.border}`,
            boxShadow: palette.shadow,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: '26px',
            border: `1px solid ${palette.borderSoft}`,
          },
        },
      },
    },
  });
}

export default createAppTheme;
