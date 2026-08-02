'use client';
import * as React from 'react';
import { I_DesignSystem } from '../types';
import { DesignSystemProvider, type DesignSystemThemeConfig } from '@nx/design-system';
import { usePathname } from 'next/navigation';
import { useDispatch } from '../Uberedux';
import { setDesignSystem, Loader, useConfig } from '../DesignSystem';

export default function DesignSystem({
  theme,
  children,
  config,
}: I_DesignSystem) {
  const mode = theme?.mode === 'dark' ? 'dark' : 'light';
  const themeConfig: DesignSystemThemeConfig | undefined = theme
    ? {
        primary: theme.primary,
        secondary: theme.secondary,
        background: theme.background,
        paper: theme.paper,
        text: theme.text,
      }
    : undefined;
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

  return (
    <DesignSystemProvider mode={mode} themeConfig={themeConfig}>
      <Loader />
      {children}
    </DesignSystemProvider>
  );
}
