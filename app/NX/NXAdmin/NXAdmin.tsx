'use client';
import type { T_Config } from '../types';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useActive } from './hooks/useActive';
import { useScrollToRoot } from './hooks/useScrollToRoot';
import {
  AppBar,
  Toolbar,
  Container,
  CardHeader,
  Avatar,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import {
  NXAdminMenu,
  Collection,
  setNXAdmin,
  useNXAdmin,
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

export default function NXAdmin({
  config,
  children,
}: I_NXAdmin) {

  const dispatch = useDispatch();
  const router = useRouter();
  const designSystem = useDesignSystem();
  const nxAdmin = useNXAdmin();
  const configThemes = config?.cartridges?.designSystem?.themes || {};
  const configDefaultTheme = config?.cartridges?.designSystem?.defaultTheme || 'light';
  const themeMode = (designSystem?.themeMode !== undefined && designSystem?.themeMode !== null)
    ? designSystem.themeMode
    : configDefaultTheme;
  const themeObj = (designSystem?.themes && designSystem?.themes[themeMode])
    || configThemes[themeMode]
    || configThemes[configDefaultTheme];
  const { icons } = config;
  const avatarTheme = themeMode === 'dark' ? 'dark' : 'light';
  const avatarSrc = icons && (icons as Record<'light' | 'dark', { icon: string; favicon: string }>)[avatarTheme]?.icon || '/nx/svg/favicon.svg';

  const handleAvatarClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    router.push('/');
  }

  React.useEffect(() => {
    if (!nxAdmin?.active) {
      dispatch(setNXAdmin('active', 'share'));
    }
  }, [dispatch, nxAdmin]);

  React.useEffect(() => {
    if (designSystem?.themeMode === undefined || designSystem?.themeMode === null) {
      if (configDefaultTheme) {
        dispatch(setDesignSystem("themeMode", configDefaultTheme));
      }
    }
  }, [dispatch, designSystem?.themeMode, configDefaultTheme]);

  const active = useActive();
  const collections = [
    {
      collection: 'share',
      title: 'Share',
      description: 'Viral marketing landing pages',
      icon: 'share',
    },
    {
      collection: 'users',
      title: 'Users',
      description: 'Manage user accounts and permissions',
      icon: 'users',
    },
    {
      collection: 'notify',
      title: 'Notifications',
      description: 'Notifications sent by email, SMS or push',
      icon: 'notify',
    },
    {
      collection: 'media',
      title: 'Media',
      description: 'Images, sounds, videos and PDFs etc',
      icon: 'media',
    },
    {
      collection: 'tenants',
      title: 'Tenants',
      description: 'Only level 2 users should see this',
      icon: 'admin',
    },
  ];

  // Move active collection to the front
  const orderedCollections = collections.sort((a, b) => {
    if (a.collection === active) return -1;
    if (b.collection === active) return 1;
    return 0;
  });

  const scrollRoot = React.useRef<HTMLDivElement>(null);
  useScrollToRoot(scrollRoot, [active]);

  return (
    <>
      <DesignSystem config={config} theme={themeObj}>
        <Feedback />
        {/* Reset the scroll to this point when the active collection changes */}
        <AppBar
          position="fixed"
          sx={{
            top: 0,
            boxShadow: 0,
            background: themeObj.background,
          }}
          ref={scrollRoot}
        >
          <Container maxWidth="md">
            <CardHeader
              avatar={<a href='/nx-admin'>
                <IconButton
                  onClick={handleAvatarClick}
                  edge="start"
                  color="inherit"
                  aria-label={config.siteName}>
                  <Avatar
                    alt={`${config.siteName}. ${config.description}`}
                    src={avatarSrc}
                  />
                </IconButton>
              </a>}
              action={null}
              title={<Typography
                color='secondary'
                variant="h6"
                component="h1"
              >
                {config.siteName} Admin
              </Typography>}
            />
          </Container>
        </AppBar>

        <Container id="main" maxWidth="md" sx={{ mt: '100px', pb: '90px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, width: '100%' }}>
            {/* Sidebar nav: Collection clips as icon buttons when inactive */}
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 0,
              m: 0.5,
            }}>
              {collections.filter(col => col.collection !== active).map((col) => (
                <Collection
                  key={col.collection}
                  collection={col.collection}
                  title={col.title}
                  description={col.description}
                  icon={col.icon}
                />
              ))}
            </Box>
            {/* Main content area (placeholder, can be replaced with children or active collection details) */}
            <Box sx={{ flex: 1, minHeight: 400 }}>
              {collections.filter(col => col.collection === active).map((col) => (
                <Collection
                  key={col.collection}
                  collection={col.collection}
                  title={col.title}
                  description={col.description}
                  icon={col.icon}
                />
              ))}
              {children}
            </Box>
          </Box>
        </Container>

        <AppBar
          position="fixed"
          sx={{
            background: themeObj.background,
            boxShadow: 0, top: 'auto', bottom: 0
          }}
        >
          <Toolbar>
            <Box sx={{ flexGrow: 1 }} />
            <NXAdminMenu />
          </Toolbar>
        </AppBar>
      </DesignSystem>
    </>
  );
}
