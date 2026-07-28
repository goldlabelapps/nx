import { createTheme } from '@mui/material/styles';

export type DesignSystemMode = 'light' | 'dark';

export function createAppTheme(mode: DesignSystemMode = 'light') {
  const isDark = mode === 'dark';

  return createTheme({
    palette: {
      mode,
      primary: {
        main: '#2563eb'
      },
      secondary: {
        main: '#7c3aed'
      },
      background: {
        default: isDark ? '#030712' : '#f8fbff',
        paper: isDark ? '#111827' : '#ffffff'
      },
      text: {
        primary: isDark ? '#f8fafc' : '#0f172a',
        secondary: isDark ? '#94a3b8' : '#475569'
      }
    },
    shape: {
      borderRadius: 16
    },
    typography: {
      fontFamily: 'Inter, "Segoe UI", Roboto, sans-serif',
      h1: {
        fontWeight: 700,
        fontSize: '2.5rem'
      },
      h2: {
        fontWeight: 700,
        fontSize: '2rem'
      },
      h3: {
        fontWeight: 600,
        fontSize: '1.5rem'
      },
      button: {
        textTransform: 'none',
        fontWeight: 600
      }
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '999px',
            padding: '0.7rem 1.2rem'
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            border: '1px solid rgba(148, 163, 184, 0.2)',
            boxShadow: '0 12px 30px rgba(15, 23, 42, 0.08)'
          }
        }
      }
    }
  });
}

export default createAppTheme;
