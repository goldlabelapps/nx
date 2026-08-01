import { Box, Stack, Typography } from '@mui/material';
import type { AppShellProps, PageSectionProps, SectionTitleProps } from '../../types';

export function AppShell({ children }: AppShellProps) {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary' }}>
      {children}
    </Box>
  );
}

export function PageSection({ children, title, subtitle }: PageSectionProps) {
  return (
    <Box component="section" sx={{ px: { xs: 2, md: 4 }, py: { xs: 3, md: 5 } }}>
      {(title || subtitle) && (
        <Stack spacing={0.5} sx={{ mb: 3 }}>
          {title && (
            <Typography variant="h2" sx={{ fontSize: '1.5rem' }}>
              {title}
            </Typography>
          )}
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