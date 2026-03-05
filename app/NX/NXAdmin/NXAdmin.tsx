'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Avatar,
  Container,
  CardHeader,
  IconButton,
} from '@mui/material';
import { SignOutBtn } from '../../NX/Paywall';

export interface I_NXAdmin {
  children?: React.ReactNode;
};

export default function NXAdmin({
  children
}: I_NXAdmin) {

  const router = useRouter();

  const handleAvatarClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    router.push('/');
  }

  return (
    <Container>
      <CardHeader
        avatar={<IconButton onClick={handleAvatarClick}>
          <Avatar src="/nx/svg/favicon_light.svg" />
        </IconButton>}
        action={<Box sx={{ mt: 0.5 }}><SignOutBtn /></Box>}
      />
      {children && children}
    </Container>
  );
}
