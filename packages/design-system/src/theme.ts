import { createTheme } from '@mui/material/styles';

export type DesignSystemMode = 'light' | 'dark';

export function createAppTheme(mode: DesignSystemMode = 'light') {
  const isDark = mode === 'dark';

  return createTheme({
    palette: {
      mode,
      primary: {
        main: '#a8927a'
      },
      secondary: {
        main: '#1a1814'
      },
      background: {
        default: isDark ? '#111827' : '#f7f7f4',
        paper: isDark ? '#1f2937' : '#fbfaf7'
      },
      text: {
        primary: isDark ? '#f7f7f4' : '#1a1814',
        secondary: isDark ? '#cbd5e1' : '#3a3530'
      }
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
            boxShadow: '0 12px 30px rgba(26, 24, 20, 0.22)'
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            border: '1px solid rgba(40, 34, 28, 0.12)',
            boxShadow: '0 12px 40px rgba(40, 34, 28, 0.12)'
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: '26px'
          }
        }
      }
    }
  });
}

export default createAppTheme;
