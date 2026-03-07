'use client';
import type { T_Config } from '../types'
import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  AppBar,
  Container,
  CardHeader,
  Avatar,
  IconButton,
  Typography,
} from '@mui/material';
// import { CloseAdmin } from '../NXAdmin';
import { useSlice } from '../Uberedux';

export interface I_NXAdmin {
  children?: React.ReactNode;
  config: T_Config;
};

export default function NXAdmin({
  children,
  config,
}: I_NXAdmin) {

  const router = useRouter();
  const slice = useSlice();

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
          backgroundColor: 'transparent',
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
              variant="h4"
              component="h1"
            >
              NXAdmin - {config.siteName}
            </Typography>}
          />
        </Container>
      </AppBar>
      <Container maxWidth="xl" sx={{ mt: '100px' }}>
        slice: <pre>{JSON.stringify(slice, null, 2)}</pre>
        {/* {children && children} */}
      </Container>
    </>
  );
}
