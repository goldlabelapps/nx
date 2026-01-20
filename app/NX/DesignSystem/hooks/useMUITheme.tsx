import { createTheme } from '@mui/material';
import { T_Theme } from '../../types';

export function useMUITheme(t: T_Theme) {
  return createTheme({
    palette: {
      mode: t.mode,
      primary: { main: t.primary },
      secondary: { main: t.secondary },
      success: { main: t.primary },
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
      h1: { fontSize: '3rem', fontWeight: 400 },
      h2: { fontSize: '2.5rem', fontWeight: 400 },
      h3: { fontSize: '2rem', fontWeight: 400 },
      h4: { fontSize: '1.75rem', fontWeight: 400 },
      h5: { fontSize: '1.5rem', fontWeight: 400 },
      h6: { fontSize: '1.25rem', fontWeight: 400 },
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
          h1: { fontWeight: "lighter" },
          h2: { fontWeight: "lighter" },
          h3: { fontWeight: "lighter" },
          h4: { fontWeight: "lighter" },
          h5: { fontWeight: "lighter" },
          h6: { fontWeight: "lighter" },
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
