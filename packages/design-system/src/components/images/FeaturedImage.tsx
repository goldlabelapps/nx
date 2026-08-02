'use client';

import { Box } from '@mui/material';
import { alpha } from '@mui/material/styles';
import type { FeaturedImageProps } from '../../types';

export default function FeaturedImage({
  image,
  width = '100%',
  height = 320,
}: FeaturedImageProps) {
  const { src, alt, objectFit = 'cover' } = image;
  const altText = typeof alt === 'string' ? alt : '';
  const caption = altText.trim();

  return (
    <Box
      sx={{
        width: '100%',
        height,
        overflow: 'hidden',
        borderRadius: '3px',
        bgcolor: 'grey.100',
        position: 'relative',
      }}
    >
      <Box
        component="img"
        src={src}
        alt={altText}
        sx={{
          display: 'block',
          width: width ?? '100%',
          height: '100%',
          objectFit,
        }}
      />
      {caption ? (
        <Box
          sx={{
            position: 'absolute',
            right: 8,
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
          {caption}
        </Box>
      ) : null}
    </Box>
  );
}

