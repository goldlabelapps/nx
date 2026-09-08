'use client';

import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import { Box } from '@mui/material';
import { alpha, useTheme as useMuiTheme } from '@mui/material/styles';
import { useState } from 'react';
import { useTheme as useThemeContext } from '../../../../context/ThemeContext';
import defaultOgManifest from '../../../../data/og-images.json';
import type { FeaturedImageProps, OgImageItem, OgImagesManifest } from './types';

function findOgImageItem(manifest: OgImagesManifest, slug: string): OgImageItem | undefined {
  if (!slug || !manifest?.items) return undefined;
  const lowerSlug = slug.trim().toLowerCase();
  const directMatch = manifest.items.find(
    (item) =>
      item.id?.toLowerCase() === lowerSlug ||
      item.category?.toLowerCase() === lowerSlug ||
      item.name?.toLowerCase() === lowerSlug
  );
  if (directMatch) return directMatch;

  const categorySegment = lowerSlug.split('/')[0];
  if (categorySegment && categorySegment !== lowerSlug) {
    return manifest.items.find(
      (item) =>
        item.id?.toLowerCase() === categorySegment ||
        item.category?.toLowerCase() === categorySegment ||
        item.name?.toLowerCase() === categorySegment
    );
  }
  return undefined;
}

export default function FeaturedImage({
  image,
  slug = 'nx',
  alt,
  width = '100%',
  height,
  objectFit: propObjectFit,
  manifest = defaultOgManifest as OgImagesManifest,
  borderRadius: propBorderRadius,
  flushTop = false,
}: FeaturedImageProps) {
  const contextTheme = useThemeContext()?.theme;
  const muiTheme = useMuiTheme();
  const activeTheme = contextTheme === 'dark' || muiTheme?.palette?.mode === 'dark' ? 'dark' : 'light';

  let resolvedSrc = image?.src;
  let resolvedAlt = typeof alt === 'string' ? alt : (typeof image?.alt === 'string' ? image.alt : null);
  let resolvedImageWidth = image?.width;
  let resolvedImageHeight = image?.height;
  const resolvedObjectFit = propObjectFit ?? image?.objectFit ?? 'cover';

  const isUrlPath = (src?: string) =>
    Boolean(src && (src.startsWith('/') || src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')));

  const candidateSlug = !isUrlPath(resolvedSrc) && resolvedSrc ? resolvedSrc : slug;
  if (!isUrlPath(resolvedSrc)) {
    resolvedSrc = undefined;
  }

  if (!resolvedSrc && candidateSlug) {
    const ogItem = findOgImageItem(manifest, candidateSlug);
    if (ogItem?.versions) {
      const version = ogItem.versions[activeTheme] ?? ogItem.versions.light ?? ogItem.versions.dark;
      if (version) {
        resolvedSrc = version.path;
        if (resolvedAlt == null) {
          resolvedAlt = ogItem.name;
        }
        if (resolvedImageWidth == null && version.dimensions?.width) {
          resolvedImageWidth = version.dimensions.width;
        }
        if (resolvedImageHeight == null && version.dimensions?.height) {
          resolvedImageHeight = version.dimensions.height;
        }
      }
    }
  }

  if (!resolvedSrc) {
    return null;
  }

  const altText = typeof resolvedAlt === 'string' ? resolvedAlt : '';
  const [status, setStatus] = useState<'loaded' | 'error'>('loaded');
  const isWidthNumber = typeof resolvedImageWidth === 'number';
  const isHeightNumber = typeof resolvedImageHeight === 'number';
  const hasIntrinsicRatio =
    isWidthNumber &&
    isHeightNumber &&
    (resolvedImageWidth as number) > 0 &&
    (resolvedImageHeight as number) > 0;
  const resolvedPaddingTop =
    hasIntrinsicRatio && height == null
      ? `${((resolvedImageHeight as number) / (resolvedImageWidth as number)) * 100}%`
      : undefined;
  const resolvedHeight = height ?? (hasIntrinsicRatio ? 0 : 220);

  const defaultRadius = flushTop ? '1.5rem 1.5rem 0 0' : '3px';

  return (
    <Box
      sx={{
        my: flushTop ? 0 : 2,
        width: width ?? '100%',
        height: resolvedHeight,
        ...(resolvedPaddingTop ? { paddingTop: resolvedPaddingTop } : {}),
        overflow: 'hidden',
        borderRadius: propBorderRadius ?? defaultRadius,
        bgcolor: 'grey.100',
        position: 'relative',
      }}
    >
      {status === 'error' ? (
        <Box
          data-testid="featured-image-error"
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
            alignItems: 'center',
            justifyContent: 'center',
            color: 'error.main',
            pointerEvents: 'none',
          }}
        >
          <ErrorOutlineRoundedIcon sx={{ fontSize: 56 }} />
          <Box
            sx={{
              maxWidth: '100%',
              px: 1.25,
              py: 0.75,
              borderRadius: '3px',
              backgroundColor: (theme) => alpha(theme.palette.background.default, 0.92),
              color: 'text.primary',
              fontSize: '0.8rem',
              lineHeight: 1.35,
              wordBreak: 'break-all',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
            }}
          >
            {resolvedSrc}
          </Box>
        </Box>
      ) : null}
      <Box
        component="img"
        src={resolvedSrc}
        alt={altText}
        suppressHydrationWarning
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block',
          objectFit: resolvedObjectFit,
          opacity: 1,
          zIndex: 0,
        }}
      />

    </Box>
  );
}


