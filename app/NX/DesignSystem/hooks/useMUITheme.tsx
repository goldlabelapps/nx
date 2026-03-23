import { createTheme } from '@mui/material';
import { T_Theme } from '../../types';

export function useMUITheme(t: T_Theme) {
  if (!t) return;
  return createTheme({
    palette: {
      mode: t.mode ?? 'light',
      primary: { main: t.primary },
      secondary: { main: t.secondary },

      // success: { main: t.background },
      // info: { main: t.background },
      // warning: { main: t.background },
      // error: { main: t.background },

      divider: t.border,
      background: {
        default: t.background,
        paper: t.paper,
      },
      text: {
        primary: t.text,
        secondary: t.primary,
      },
    },
    typography: {
      fontSize: 18, // base font size (default is 14)
      h1: { fontSize: '3rem', fontWeight: 'normal' },
      h2: { fontSize: '2.5rem', fontWeight: 'normal' },
      h3: { fontSize: '2rem', fontWeight: 'normal' },
      h4: { fontSize: '1.75rem', fontWeight: 'normal' },
      h5: { fontSize: '1.5rem', fontWeight: 'normal' },
      h6: { fontSize: '1.25rem', fontWeight: 'normal' },
      body1: { fontSize: '1.15rem' },
      body2: { fontSize: '1rem' },
      subtitle1: { fontSize: '1.1rem', color: t.primary },
      subtitle2: { fontSize: '1rem', color: t.primary },
      button: { fontSize: '1rem' },
      caption: { fontSize: '0.95rem' },
      overline: { fontSize: '0.95rem' },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
          },
          containedPrimary: {
            fontWeight: 'bold',
            boxShadow: 'none',
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          h1: { fontWeight: "normal" },
          h2: { fontWeight: "normal" },
          h3: { fontWeight: "normal" },
          h4: { fontWeight: "normal" },
          h5: { fontWeight: "normal" },
          h6: { fontWeight: "normal" },
          subtitle1: { color: t.primary },
          subtitle2: { color: t.primary },
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: { color: t.primary },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: { color: t.primary },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: { borderColor: t.primary },
        },
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: { color: t.primary },
        },
      },
    },
  });
}
