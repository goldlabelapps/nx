'use client';

import { Box } from '@mui/material';
import { useState } from 'react';
import type { CardProps } from '../../types';

export default function Card({ children, padding = 'md', variant = 'paper', hoverLift = false }: CardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const pad = { sm: 2, md: 3, lg: 4 }[padding] ?? 3;

  const styling = {
    paper: {
      bgcolor: 'background.paper',
      border: '1px solid rgba(40, 34, 28, 0.12)',
      boxShadow: '0 12px 40px rgba(40, 34, 28, 0.12)',
    },
    glass: {
      bgcolor: 'rgba(255, 255, 255, 0.44)',
      border: '1px solid rgba(255, 255, 255, 0.72)',
      boxShadow: '0 26px 60px -12px rgba(40, 34, 28, 0.2)',
      backdropFilter: 'blur(18px)',
      WebkitBackdropFilter: 'blur(18px)',
    },
    tile: {
      bgcolor: 'rgba(255, 255, 255, 0.7)',
      border: '1px solid rgba(255, 255, 255, 0.6)',
      boxShadow: '0 12px 24px rgba(40, 34, 28, 0.08)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
    },
    ink: {
      bgcolor: '#1F1F1F',
      color: '#F5F5F5',
      border: '1px solid transparent',
      boxShadow: '0 12px 40px rgba(40, 34, 28, 0.12)',
    },
  }[variant];

  return (
    <Box
      onMouseEnter={() => hoverLift && setIsHovered(true)}
      onMouseLeave={() => hoverLift && setIsHovered(false)}
      sx={{
        borderRadius: '3px',
        p: pad,
        transition: 'transform 220ms ease, box-shadow 220ms ease, background-color 220ms ease',
        ...(isHovered && hoverLift
          ? {
              transform: 'translateY(-6px)',
              boxShadow: '0 28px 66px rgba(40, 34, 28, 0.22)',
            }
          : {}),
        ...styling,
      }}
    >
      {children}
    </Box>
  );
}
