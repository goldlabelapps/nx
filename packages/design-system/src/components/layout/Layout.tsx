'use client';

import { Box, Stack, Typography } from '@mui/material';
import type { AppShellProps, PageSectionProps, SectionTitleProps } from '../../types';

export function AppShell({ children }: AppShellProps) {
  return (
    <Box
      component="div"
      sx={{
        width: '100%',
        minHeight: '100dvh',
        boxSizing: 'border-box',
        px: { xs: 2, sm: 3, md: 4, lg: 6 },
        py: { xs: 2, sm: 3, md: 4 },
        maxWidth: { xs: '100%', lg: '1600px' },
        mx: 'auto',
      }}
    >
      {children}
    </Box>
  );
}

export function PageSection({ children, title, subtitle }: PageSectionProps) {
  return (
    <Box component="section" sx={{ mb: 4 }}>
      {(title || subtitle) && (
        <Stack spacing={0.5} sx={{ mb: 2 }}>
          {title && <Typography variant="h2">{title}</Typography>}
          {subtitle && (
            <Typography variant="body1" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Stack>
      )}
      {children}
    </Box>
  );
}

export function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <Stack spacing={0.5}>
      <Typography variant="h3">{title}</Typography>
      {subtitle && (
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      )}
    </Stack>
  );
}