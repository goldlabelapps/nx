'use client';
import * as React from 'react';
import { I_Paywall } from '../types';
import {
  Box,
} from '@mui/material';
import { usePaywall } from '../Paywall';

export default function Paywall({
  children = null,
}: I_Paywall) {

  const paywallRaw = usePaywall();
  const paywall = paywallRaw && typeof paywallRaw === 'object' ? paywallRaw : {};
  
  return (
    <Box sx={{ border: '1px solid red' }}>
      <pre style={{ padding: '1em', borderRadius: '8px' }}>
        {JSON.stringify(paywall, null, 2)}
      </pre>
      {children}
    </Box>
  );
}
