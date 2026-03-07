'use client';
import type { T_Config } from '../types';
import * as React from 'react';
import { useRouter } from 'next/navigation';
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
  useNXAdmin,
  useActive,
  setNXAdmin,
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
}: I_NXAdmin) {

  const tenant = process.env.NEXT_PUBLIC_TENANT || 'nx';
  const dispatch = useDispatch();
  const router = useRouter();
  const nxAdmin = useNXAdmin();
  const active = useActive();
  const designSystem = useDesignSystem();
  const configThemes = config?.cartridges?.designSystem?.themes || {};
  const configDefaultTheme = config?.cartridges?.designSystem?.defaultTheme || 'light';
  const themeMode = designSystem?.themeMode || configDefaultTheme;
  const themeObj = (designSystem?.themes && designSystem?.themes[themeMode])
    || configThemes[themeMode]
    || configThemes[configDefaultTheme];
  const { icons, cartridges } = config;
  const theme = cartridges?.designSystem?.defaultTheme === 'dark' ? 'dark' : 'light';
  const avatarSrc = icons && (icons as Record<'light' | 'dark', { icon: string; favicon: string }>)[theme]?.icon || '/nx/svg/favicon.svg';

  const handleAvatarClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    router.push('/');
  }

  React.useEffect(() => {
    if (!designSystem?.themeMode && configDefaultTheme) {
      dispatch(setDesignSystem("themeMode", configDefaultTheme));
    }
  }, [dispatch, designSystem?.themeMode, configDefaultTheme]);

  return (
    <>
      <DesignSystem config={config} theme={themeObj}>
        <Feedback />
        <AppBar
          position="fixed"
          sx={{
            top: 0,
            boxShadow: 0,
            background: themeObj.background,
          }}>
          <Container maxWidth="xl">
            <CardHeader
              avatar={<a href='/'>
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
                {config.siteName}
              </Typography>}
            />
          </Container>
        </AppBar>

        <Container id="main" maxWidth="xl" sx={{ mt: '100px', pb: '90px' }}>

          {/* <pre>active: {JSON.stringify(active, null, 2)}</pre> */}

          <Collection
            collection="share"
            title="Share"
            description='Viral marketing tool'
            icon="share"
          />

          <Collection
            collection="users"
            title="Users"
            description='Manage user accounts and permissions'
            icon="users"
          />

          <Collection
            collection="notify"
            title="Notifications"
            description='Send notifications by email, SMS and push'
            icon="notify"
          />

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
