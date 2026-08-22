'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  IconButton,
} from '@mui/material';
import { Icon } from '../../../../NX/DesignSystem';

export default function CloseAdmin() {
  const router = useRouter();

  // React.useEffect(() => {
  // }, []);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    router.push('/');
  }

  return (
    <IconButton color="primary" onClick={handleClick}>
      <Icon icon="close" />
    </IconButton>
  );
}
