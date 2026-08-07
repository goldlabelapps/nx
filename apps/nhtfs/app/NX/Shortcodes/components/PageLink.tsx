'use client';
import React from 'react';
import { usePathname } from 'next/navigation';

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
  description = null
}: {
  url?: string | null;
  title?: string | null;
  description?: string | null;
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
    <a
      href={url}
      target={isExternal ? '_blank' : '_self'}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        textDecoration: 'none',
        color: 'inherit',
        padding: '12px 14px',
        border: '1px dashed rgba(0,0,0,0.25)',
        borderRadius: 8,
        background: 'rgba(255,255,255,0.46)',
        boxShadow: 'none',
      }}
    >
      {label}
    </a>
  );
}
