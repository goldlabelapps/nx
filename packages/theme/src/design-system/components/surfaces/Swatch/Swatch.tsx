'use client';

import { Box, Typography } from '@mui/material';
import type { SwatchProps } from './types';

export default function Swatch({ label, value }: SwatchProps) {
  const resolvedValue = typeof value === 'string' && value.trim() ? value.trim() : 'transparent';

  return (
    <Box
      sx={{
        borderRadius: '3px',
        border: '1px solid rgba(40, 34, 28, 0.12)',
        backgroundColor: 'background.paper',
        p: 1.5,
      }}
    >
      <Box
        aria-hidden="true"
        sx={{
          width: 48,
          aspectRatio: '1 / 1',
          borderRadius: '3px',
          border: '1px solid rgba(40, 34, 28, 0.12)',
          backgroundColor: resolvedValue,
          mb: 1,
        }}
      />
      <Typography variant="body2" sx={{ fontWeight: 600, textTransform: 'capitalize' }}>
        {label}
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
        {value || 'not set'}
      </Typography>
    </Box>
  );
}