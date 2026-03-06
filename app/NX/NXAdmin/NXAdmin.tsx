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

  const { icons } = config;

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          top: 0,
          boxShadow: 0,
        }}>
        <Container maxWidth="xl">

          <CardHeader
            avatar={<a href='/'>
              <IconButton
                edge="start"
                color="inherit"
                aria-label={config.siteName}
                sx={{}}>
                <Avatar
                  alt={`${config.siteName}. ${config.description}`}
                // src={themedIcon?.icon || ''}
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
        {children && children}
      </Container>
    </>
  );
}
