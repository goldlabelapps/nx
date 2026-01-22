'use client';
import * as React from 'react';
import { T_Config, T_Frontmatter } from '../types.d';
import { Box } from '@mui/material';

export interface I_Shortcodes {
  config: T_Config;
  frontmatter?: T_Frontmatter;
}

export default function Shortcodes({ config }: I_Shortcodes) {
  const commerce = config.cartridges?.commerce;
  if (!commerce || !commerce.enabled) return null;

  return (
    <Box id="shortcodes" sx={{}}>
      Shortcodes
    </Box>
  );
}
