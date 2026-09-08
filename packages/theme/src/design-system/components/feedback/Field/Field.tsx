'use client';

import { Stack, TextField, Typography } from '@mui/material';
import type { FieldProps } from './types';

export default function Field({ label, hint, error, ...textFieldProps }: FieldProps) {
  return (
    <Stack spacing={0.75}>
      {label && <Typography variant="overline" sx={{ color: 'text.secondary', letterSpacing: '0.14em' }}>{label}</Typography>}
      <TextField size="small" {...textFieldProps} error={Boolean(error)} helperText={error || hint} />
    </Stack>
  );
}