'use client';

import { Stack, Typography } from '@mui/material';
import type { AppShellProps, PageSectionProps, SectionTitleProps } from '../../types';

export function AppShell({ children }: AppShellProps) {
  return <div>{children}</div>;
}

export function PageSection({ children, title, subtitle }: PageSectionProps) {
  return (
    <section>
      {(title || subtitle) && (
        <Stack spacing={0.5}>
          {title && <Typography variant="h2">{title}</Typography>}
          {subtitle && (
            <Typography variant="body1" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Stack>
      )}
      {children}
    </section>
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