'use client';
import type { T_Config } from '../types';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useActive } from './hooks/useActive';
import { useScrollToRoot } from './hooks/useScrollToRoot';
import {
  Box,
} from '@mui/material';
import {
  useNXAdmin,
  Layout,
} from '../NXAdmin';
import {
  DesignSystem,
  Feedback,
  useDesignSystem,
  setDesignSystem,
} from '../DesignSystem';
import { useDispatch } from '../Uberedux';

export interface I_NXAdmin {
  config: T_Config;
  children?: React.ReactNode;
};

const collections = [
  {
    collection: 'users',
    title: 'Users',
    single: 'user',
    description: 'Manage user accounts and permissions',
    icon: 'users',
  },
];

export default function NXAdmin({
  config,
}: I_NXAdmin) {

  const dispatch = useDispatch();
  const router = useRouter();
  const designSystem = useDesignSystem();
  const configThemes = config?.cartridges?.designSystem?.themes || {};
  const configDefaultTheme = config?.cartridges?.designSystem?.defaultTheme || 'light';
  const themeMode = (designSystem?.themeMode !== undefined && designSystem?.themeMode !== null)
    ? designSystem.themeMode
    : configDefaultTheme;
  const themeObj = (designSystem?.themes && designSystem?.themes[themeMode])
    || configThemes[themeMode]
    || configThemes[configDefaultTheme];


  return (
    <>
      <DesignSystem config={config} theme={themeObj}>
        <Feedback />
        <Layout config={config} />
      </DesignSystem>
    </>
  );
}
