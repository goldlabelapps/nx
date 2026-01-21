'use client';
import * as React from 'react';
import { I_Terminal } from '../types';
import {
  Box,
} from '@mui/material';

export default function Terminal({
  children = null,
}: I_Terminal) {

  return (
    <Box sx={{ border: '1px solid pink' }}>
      I_Terminal
      {children}
    </Box>
  );
}
