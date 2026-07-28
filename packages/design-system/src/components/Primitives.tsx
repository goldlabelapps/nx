import { Box, Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary' }}>
      {children}
    </Box>
  );
}

type PageSectionProps = {
  children: ReactNode;
  title?: string;
  subtitle?: string;
};

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

type SectionTitleProps = {
  title: string;
  subtitle?: string;
};

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

type EyebrowProps = {
  children: ReactNode;
  tone?: 'ink' | 'clay';
};

export function Eyebrow({ children, tone = 'clay' }: EyebrowProps) {
  return (
    <Typography
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1,
        fontFamily: 'var(--font-mono)',
        fontSize: '0.875rem',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: tone === 'clay' ? 'var(--nx-clay)' : 'text.primary',
        fontWeight: 600
      }}
    >
      {children}
    </Typography>
  );
}

type BrandMarkProps = {
  name?: string;
};

export function BrandMark({ name = 'NX°' }: BrandMarkProps) {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1.25,
        px: 1.25,
        py: 0.75,
        borderRadius: '999px',
        border: '1px solid rgba(40, 34, 28, 0.12)',
        bgcolor: 'background.paper',
        color: 'text.primary',
        boxShadow: '0 8px 24px rgba(40, 34, 28, 0.08)'
      }}
    >
      <Box
        sx={{
          width: 12,
          height: 12,
          borderRadius: '50%',
          bgcolor: 'primary.main',
          boxShadow: '0 0 0 4px rgba(168, 146, 122, 0.2)'
        }}
      />
      <Typography component="span" sx={{ fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
        {name}
      </Typography>
    </Box>
  );
}
