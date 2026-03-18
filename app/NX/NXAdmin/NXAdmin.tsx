'use client';
import type { T_Config } from '../types';
import * as React from 'react';
import {
  MiniDrawer,
  SwipeDrawer,
  MaxiDrawer,
} from '../NXAdmin';
import {
  DesignSystem,
  Feedback,
  useDesignSystem,
} from '../DesignSystem';

export interface I_NXAdmin {
  config: T_Config;
  children?: React.ReactNode;
};

export default function NXAdmin({
  config,
}: I_NXAdmin) {

  const designSystem = useDesignSystem();
  const configThemes = config?.cartridges?.designSystem?.themes || {};
  const configDefaultTheme = config?.cartridges?.designSystem?.defaultTheme || 'light';
  const themeMode = (designSystem?.themeMode !== undefined && designSystem?.themeMode !== null)
    ? designSystem.themeMode
    : configDefaultTheme;
  const themeObj = (designSystem?.themes && designSystem?.themes[themeMode])
    || configThemes[themeMode]
    || configThemes[configDefaultTheme];

  // Safely get layout value
  const layout = config?.cartridges?.nxadmin?.layout;

  return (
    <>
      <DesignSystem config={config} theme={themeObj}>
        <Feedback />
        {layout === 'swipedrawer' ? (
          <SwipeDrawer config={config} />
        ) : layout === 'maxidrawer' ? (
          <MaxiDrawer config={config} />
        ) : (
          <MiniDrawer config={config} />
        )}
      </DesignSystem>
    </>
  );
}
