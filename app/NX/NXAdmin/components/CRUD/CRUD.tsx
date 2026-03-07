'use client';
import type { T_Config } from '../../../types';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  useTheme,
  Card,
  CardHeader,
  Typography,
  Box,
} from '@mui/material';
// import { useSlice } from '../../Uberedux';

export interface I_CRUD {
  // children?: React.ReactNode;
  // config: T_Config;
};

export default function CRUD({
  // children,
  // config,
}: I_CRUD) {

  const router = useRouter();
  const t = useTheme();

  const handleAvatarClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    router.push('/');
  }

  return (
    <>
      <Card>
        <CardHeader title="CRUD Component" />
        <Box p={2}>
          <Typography variant="body1">This is a placeholder for the CRUD component.</Typography>
        </Box>
      </Card>
    </>
  );
}
