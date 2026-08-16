'use client';

import { Box, Button as MuiButton, Typography } from '@mui/material';
import type { AlertProps } from './types';

export default function Alert({ children, title, severity = 'info', dismissible = false }: AlertProps) {
  const tone = {
    info: { border: 'rgba(168, 146, 122, 0.3)', bg: 'rgba(168, 146, 122, 0.14)' },
    success: { border: 'rgba(47, 143, 70, 0.32)', bg: 'rgba(47, 143, 70, 0.12)' },
    warning: { border: 'rgba(160, 98, 17, 0.28)', bg: 'rgba(160, 98, 17, 0.1)' },
    error: { border: 'rgba(192, 59, 43, 0.32)', bg: 'rgba(192, 59, 43, 0.1)' }
  }[severity];

  return (
    <Box sx={{ border: `1px solid ${tone.border}`, borderLeft: '4px solid', borderColor: 'primary.main', borderRadius: '3px', bgcolor: tone.bg, p: 2.25, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2 }}>
      <Box>
        {title && <Typography variant="subtitle2" sx={{ mb: 0.5, fontWeight: 400 }}>{title}</Typography>}
        <Typography variant="body2" color="text.secondary">{children}</Typography>
      </Box>
      {dismissible && <MuiButton size="small" variant="text">Dismiss</MuiButton>}
    </Box>
  );
}