'use client';
import * as React from 'react';
import { T_Config, T_Frontmatter } from '../types.d';
import { Box } from '@mui/material';

export interface I_EchoPay {
  config: T_Config;
  frontmatter?: T_Frontmatter;
}

export default function EchoPay({ config }: I_EchoPay) {
  const echopay = config.cartridges?.echopay;
  if (!echopay || !echopay.enabled) return null;

  return (
    <Box
      id="echopay"
      sx={{
        border: '1px solid black',
      }}>
      EchoPay
      hello world
    </Box>
  );
}
