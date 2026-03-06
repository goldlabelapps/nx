'use client';
import type { T_Config } from '../types'
import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Avatar,
  Container,
  CardHeader,
  IconButton,
} from '@mui/material';
import { CloseAdmin } from '../NXAdmin';

export interface I_NXAdmin {
  children?: React.ReactNode;
  config: T_Config;
};

export default function NXAdmin({
  children,
  config,
}: I_NXAdmin) {

  const router = useRouter();
  const handleAvatarClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    router.push('/');
  }

  return (
    <Container>
      <CardHeader
        title="NX Admin"
        avatar={<IconButton onClick={handleAvatarClick}>
          <Avatar src="/nx/svg/favicon_light.svg" />
        </IconButton>}
        action={<Box sx={{ mt: 0.5 }}><CloseAdmin /></Box>}
      />
      {children && children}
      <pre>{JSON.stringify(config, null, 2)}</pre>
    </Container>
  );
}
