'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  IconButton,
} from '@mui/material';
import { Icon } from '../../NX/DesignSystem';

type I_NXAdmin = {
  children?: React.ReactNode;
};

export default function NXAdmin({ children }: I_NXAdmin) {
  const router = useRouter();

  // React.useEffect(() => {
  // }, []);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    router.push('/');
  }

  return (
    <>
      <IconButton onClick={handleClick}>
        <Icon icon="home" />
      </IconButton>
      {children && children}
    </>
  );
}
