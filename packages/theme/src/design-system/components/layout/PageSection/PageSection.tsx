'use client';

import { Box, Stack, Typography } from '@mui/material';
import type { PageSectionProps } from './types';

export default function PageSection({ children, title, subtitle }: PageSectionProps) {
  return <Box component="section" sx={{ mb: 4 }}>{(title || subtitle) && <Stack spacing={0.5} sx={{ mb: 2 }}>{title && <Typography variant="h2">{title}</Typography>}{subtitle && <Typography variant="body1" color="text.secondary">{subtitle}</Typography>}</Stack>}{children}</Box>;
}