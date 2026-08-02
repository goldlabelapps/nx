'use client';

import { Box, Button as MuiButton, Stack, TextField, Typography } from '@mui/material';
import type { AlertProps, CardProps, FieldProps } from '../../types';

export function Alert({ children, title, severity = 'info', dismissible = false }: AlertProps) {
  const tone = {
    info: { border: 'rgba(168, 146, 122, 0.3)', bg: 'rgba(168, 146, 122, 0.14)' },
    success: { border: 'rgba(47, 143, 70, 0.32)', bg: 'rgba(47, 143, 70, 0.12)' },
    warning: { border: 'rgba(160, 98, 17, 0.28)', bg: 'rgba(160, 98, 17, 0.1)' },
    error: { border: 'rgba(192, 59, 43, 0.32)', bg: 'rgba(192, 59, 43, 0.1)' }
  }[severity];

  return (
    <Box
      sx={{
        border: `1px solid ${tone.border}`,
        borderLeft: '4px solid',
        borderColor: 'primary.main',
        borderRadius: '3px',
        bgcolor: tone.bg,
        p: 2.25,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 2
      }}
    >
      <Box>
        {title && (
          <Typography variant="subtitle2" sx={{ mb: 0.5, fontWeight: 400 }}>
            {title}
          </Typography>
        )}
        <Typography variant="body2" color="text.secondary">
          {children}
        </Typography>
      </Box>
      {dismissible && <MuiButton size="small" variant="text">Dismiss</MuiButton>}
    </Box>
  );
}

export function Card({ children, padding = 'md', variant = 'paper' }: CardProps) {
  const pad = { sm: 2, md: 3, lg: 4 }[padding] ?? 3;
  const styling = {
    paper: { bgcolor: 'background.paper', border: '1px solid rgba(40, 34, 28, 0.12)', boxShadow: '0 12px 40px rgba(40, 34, 28, 0.12)' },
    glass: { bgcolor: 'rgba(255, 255, 255, 0.56)', border: '1px solid rgba(255,255,255,0.7)', boxShadow: '0 26px 60px -12px rgba(40, 34, 28, 0.2)', backdropFilter: 'blur(18px)' },
    tile: { bgcolor: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.6)', boxShadow: '0 12px 24px rgba(40, 34, 28, 0.08)' },
    ink: { bgcolor: 'secondary.main', color: 'common.white', border: '1px solid transparent', boxShadow: '0 12px 40px rgba(40, 34, 28, 0.12)' }
  }[variant];

  return (
    <Box sx={{ borderRadius: '3px', p: pad, ...styling }}>
      {children}
    </Box>
  );
}

export function Field({ label, hint, error }: FieldProps) {
  return (
    <Stack spacing={0.75}>
      {label && (
        <Typography variant="overline" sx={{ color: 'text.secondary', letterSpacing: '0.14em' }}>
          {label}
        </Typography>
      )}
      <TextField size="small" error={Boolean(error)} helperText={error || hint} />
    </Stack>
  );
}
