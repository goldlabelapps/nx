'use client';
import type { T_Config } from '../types'
import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  useTheme,
  AppBar,
  Toolbar,
  Container,
  CardHeader,
  Avatar,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import { NXAdminMenu } from '../NXAdmin'
import { useSlice } from '../Uberedux';
import { CRUD } from '../NXAdmin'

export interface I_NXAdmin {
  children?: React.ReactNode;
  config: T_Config;
};

export default function NXAdmin({
  // children,
  config,
}: I_NXAdmin) {

  const router = useRouter();
  const t = useTheme();

  const handleAvatarClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    router.push('/');
  }

  const { icons, cartridges } = config;
  const theme = cartridges?.designSystem?.defaultTheme === 'dark' ? 'dark' : 'light';
  const avatarSrc = icons && (icons as Record<'light' | 'dark', { icon: string; favicon: string }>)[theme]?.icon || '/nx/svg/favicon.svg';

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          top: 0,
          boxShadow: 0,
          background: t.palette.background.default,
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
        {/* slice: <pre>{JSON.stringify(slice, null, 2)}</pre> */}
        {/* {children && children} */}
        <CRUD />
      </Container>

      <AppBar
        position="fixed"
        sx={{
          background: t.palette.background.default,
          boxShadow: 0, top: 'auto', bottom: 0
        }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
          <NXAdminMenu />
        </Toolbar>
      </AppBar>
    </>
  );
}
