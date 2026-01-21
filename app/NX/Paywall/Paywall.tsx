'use client';
import * as React from 'react';
import { I_Paywall } from '../types';
import {
  Box,
} from '@mui/material';

export default function Paywall({
  children = null,
}: I_Paywall) {

  return (
    <Box sx={{ border: '1px solid red' }}>
      I_Paywall
      {children}
    </Box>
  );
}
