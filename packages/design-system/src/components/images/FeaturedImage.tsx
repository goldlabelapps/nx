'use client';

import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import { Box } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useState } from 'react';
import type { FeaturedImageProps } from '../../types';

export default function FeaturedImage({
  image,
  width = '100%',
  height,
}: FeaturedImageProps) {
  const { src, alt, objectFit = 'cover', width: imageWidth, height: imageHeight } = image;
  const altText = typeof alt === 'string' ? alt : '';
  const caption = altText.trim();
  const [status, setStatus] = useState<'loaded' | 'error'>('loaded');
  const hasIntrinsicRatio = typeof imageWidth === 'number' && typeof imageHeight === 'number' && imageWidth > 0 && imageHeight > 0;
  const resolvedPaddingTop = hasIntrinsicRatio && height == null ? `${(imageHeight / imageWidth) * 100}%` : undefined;
  const resolvedHeight = height ?? (hasIntrinsicRatio ? 0 : 220);

  return (
    <Box
      sx={{
        width: width ?? '100%',
        height: resolvedHeight,
        ...(resolvedPaddingTop ? { paddingTop: resolvedPaddingTop } : {}),
        overflow: 'hidden',
        borderRadius: '3px',
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
            {src}
          </Box>
        </Box>
      ) : null}
      <Box
        component="img"
        src={src}
        alt={altText}
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block',
          objectFit,
          opacity: 1,
          zIndex: 0,
        }}
      />
      {caption ? (
        <Box
          sx={{
            position: 'absolute',
            left: 8,
            bottom: 8,
            px: 1,
            py: 0.5,
            borderRadius: '3px',
            backgroundColor: (theme) => alpha(theme.palette.background.default, 0.82),
            color: 'text.primary',
            fontSize: '0.78rem',
            lineHeight: 1.2,
          }}
        >
          <Box component="span" sx={{ display: 'block', fontWeight: 400 }}>
            {caption}
          </Box>
        </Box>
      ) : null}
    </Box>
  );
}

