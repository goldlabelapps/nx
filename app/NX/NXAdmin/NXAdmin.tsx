'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Avatar,
  Container,
  CardHeader,
  IconButton,
} from '@mui/material';
import { Icon } from '../../NX/DesignSystem';

export interface I_NXAdmin {
  children?: React.ReactNode;
};

export default function NXAdmin({
  children
}: I_NXAdmin) {

  const router = useRouter();

  // React.useEffect(() => {
  // }, []);

  const handleAvatarClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    router.push('/nx-admin');
  }

  const handleActionClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    router.push('/');
  }

  return (
    <Container>
      <CardHeader
        title="NX Admin"
        avatar={<IconButton onClick={handleAvatarClick}>
          <Icon icon="admin" />
        </IconButton>}
        action={<IconButton sx={{ m: 1 }} onClick={handleActionClick}>
          <Avatar src="/nx/svg/favicon_light.svg" />
        </IconButton>}

      />
      {children && children}
    </Container>
  );
}
