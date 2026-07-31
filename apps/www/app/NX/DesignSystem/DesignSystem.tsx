'use client';
import * as React from 'react';
import { T_Theme, I_DesignSystem } from '../types';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useDispatch } from '../Uberedux';
import { setDesignSystem, useMUITheme, Loader, useConfig } from '../DesignSystem';

export default function DesignSystem({
  theme,
  children,
  config,
}: I_DesignSystem) {

  const newtheme = useMUITheme(theme as T_Theme);
  const pathname = usePathname();
  const dispatch = useDispatch();
  const currentConfig = useConfig();

  React.useEffect(() => {
    dispatch(setDesignSystem('loading', false));
  }, [pathname, dispatch]);

  React.useEffect(() => {
    if (!currentConfig){
      dispatch(setDesignSystem('config', config));
    }
  }, [currentConfig, config, dispatch]);

  if (!newtheme) {
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
