'use client';
import * as React from 'react';
import { T_Theme, I_DesignSystem } from '../types';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useDispatch } from '../Uberedux';
import { setDesignSystem, useMUITheme, Loader } from '../DesignSystem';

export default function DesignSystem({
  theme,
  children,
  // config,
}: I_DesignSystem) {
  const newtheme = useMUITheme(theme as T_Theme);
  const pathname = usePathname();
  const dispatch = useDispatch();

  React.useEffect(() => {
    // Turn off loader after route change
    dispatch(setDesignSystem('loading', false));
  }, [pathname, dispatch]);

  if (!newtheme) {
    // Provide a minimal fallback theme if theme is undefined
    return <>{children}</>;
  }

  return (
    <ThemeProvider theme={newtheme}>
      <CssBaseline />
      <Loader />
      {children}
    </ThemeProvider>
  );
}
