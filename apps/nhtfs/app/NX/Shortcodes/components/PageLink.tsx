'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@mui/material';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

function normalizeRoutePath(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return '';
  const withoutOrigin = trimmed.replace(/^https?:\/\/[^/]+/i, '');
  const [pathOnly] = withoutOrigin.split(/[?#]/);
  const normalized = pathOnly || '/';
  if (normalized === '/') return '/';
  return normalized.replace(/\/+$/, '');
}

export default function PageLink({
  url = null,
  title = null,
  description = null,
  icon = null,
}: {
  url?: string | null;
  title?: string | null;
  description?: string | null;
  icon?: string | null;
}) {
  const pathname = usePathname();
  if (!url) return null;

  const isExternal = /^https?:\/\//i.test(url);
  const normalizedCurrentPath = normalizeRoutePath(pathname || '/');
  const normalizedTargetPath = normalizeRoutePath(url);
  if (!isExternal && normalizedTargetPath === normalizedCurrentPath) {
    return null;
  }

  const label = title || description || url;

  return (
    <Button
      component="a"
      href={url}
      target={isExternal ? '_blank' : '_self'}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      variant="outlined"
      startIcon={<ArrowForwardRoundedIcon />}
      fullWidth
      sx={{
        px: 1.75,
        py: 1.25,
      }}
    >
      {label}
    </Button>
  );
}
