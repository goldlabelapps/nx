'use client';

import { Box } from '@mui/material';
import type { AppShellProps } from './types';

export default function AppShell({ children }: AppShellProps) {
  return <Box component="div" sx={{ width: '100%', minHeight: '100dvh', boxSizing: 'border-box', px: { xs: 2, sm: 3, md: 4, lg: 6 }, py: { xs: 2, sm: 3, md: 4 } }}>{children}</Box>;
}