'use client';

import { Box } from '@mui/material';
import type { SwatchGroupProps } from './types';
import Swatch from '../Swatch/Swatch';

export default function SwatchGroup({ items }: SwatchGroupProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 1.5,
        alignItems: 'flex-start',
      }}
    >
      {items.map((item) => (
        <Swatch key={item.label} label={item.label} value={item.value} />
      ))}
    </Box>
  );
}