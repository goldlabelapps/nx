'use client';
import * as React from 'react';
import { getFirebaseAuth } from '../../NX/lib/firebase';
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

  const handleSignout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const auth = getFirebaseAuth();
      const { signOut } = await import('firebase/auth');
      await signOut(auth);
      router.push('/nx-admin');
    } catch (err) {
      // Optionally handle error (e.g., show notification)
      console.error('Signout failed', err);
    }
  }

  return (
    <Container>
      <CardHeader
        title="NX Admin"
        avatar={<IconButton onClick={handleAvatarClick}>
          <Icon icon="admin" />
        </IconButton>}
        action={<>
          <IconButton onClick={handleSignout}>
            <Icon icon="signout" />
          </IconButton>
          <IconButton sx={{ mr: 1, mt: 1 }} onClick={handleActionClick}>
            <Avatar src="/nx/svg/favicon_light.svg" />
          </IconButton>
        </>}

      />
      {children && children}
    </Container>
  );
}
