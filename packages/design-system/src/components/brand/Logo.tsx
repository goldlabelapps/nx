'use client';

import { Box, Typography } from '@mui/material';
import type { LogoProps } from '../../types';

export default function Logo({ name = 'NX°', children }: LogoProps) {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1.25,
        px: 1.25,
        py: 0.75,
        borderRadius: '999px',
        border: '1px solid rgba(40, 34, 28, 0.12)',
        bgcolor: 'background.paper',
        color: 'text.primary',
        boxShadow: '0 8px 24px rgba(40, 34, 28, 0.08)'
      }}
    >
      <Box
        sx={{
          width: 12,
          height: 12,
          borderRadius: '50%',
          bgcolor: 'primary.main',
          boxShadow: '0 0 0 4px rgba(168, 146, 122, 0.2)'
        }}
      />
      <Typography component="span" sx={{ fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
        {children ?? name}
      </Typography>
    </Box>
  );
}