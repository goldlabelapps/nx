'use client';

import { Box } from '@mui/material';
import type { FeaturedImageProps } from '../../types';

export default function FeaturedImage({
  image,
  width = '100%',
  height = 320,
}: FeaturedImageProps) {
  const { src, alt = '', objectFit = 'cover' } = image;
  return (
    <Box
      sx={{
        width: '100%',
        height,
        overflow: 'hidden',
        borderRadius: '3px',
        bgcolor: 'grey.100',
      }}
    >
      <Box
        component="img"
        src={src}
        alt={alt}
        sx={{
          display: 'block',
          width: width ?? '100%',
          height: '100%',
          objectFit,
        }}
      />
    </Box>
  );
}

