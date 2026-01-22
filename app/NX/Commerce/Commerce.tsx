'use client';
import * as React from 'react';
import { T_Ad, T_Config, T_Frontmatter } from '../types.d';
import { Box } from '@mui/material';
import { Ad } from './components/Ad';

export interface I_Commerce {
  config: T_Config;
  frontmatter?: T_Frontmatter;
}

export default function Commerce({ config }: I_Commerce) {
  const commerce = config.cartridges?.commerce;
  if (!commerce || !commerce.enabled) return null;

  return (
    <Box id="commerce" sx={{}}>
      {Array.isArray(commerce.ads) && commerce.ads.length > 0 ? (
        <>
          {commerce.ads.map((ad, idx) => (
            <Ad key={idx} ad={ad as T_Ad} />
          ))}
        </>
      ) : (
        <div>No ads</div>
      )}
    </Box>
  );
}
