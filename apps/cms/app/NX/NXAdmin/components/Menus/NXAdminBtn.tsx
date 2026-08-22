'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  IconButton,
} from '@mui/material';
import { Icon } from '../../../../NX/DesignSystem';

export default function NXAdminBtn() {
  const router = useRouter();

  // React.useEffect(() => {
  // }, []);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    router.push('/nx-admin');
  }

  return (
    <IconButton color="primary" onClick={handleClick}>
      <Icon icon="admin" />
    </IconButton>
  );
}
