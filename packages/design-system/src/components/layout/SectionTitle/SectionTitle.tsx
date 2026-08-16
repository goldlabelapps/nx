'use client';

import { Stack, Typography } from '@mui/material';
import type { SectionTitleProps } from './types';

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return <Stack spacing={0.5}><Typography variant="h3">{title}</Typography>{subtitle && <Typography variant="body2" color="text.secondary">{subtitle}</Typography>}</Stack>;
}