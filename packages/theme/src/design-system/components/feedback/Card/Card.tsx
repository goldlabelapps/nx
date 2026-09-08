'use client';

import { Box } from '@mui/material';
import { useState } from 'react';
import type { CardProps } from './types';

export default function Card({ children, padding = 'md', variant = 'paper', hoverLift = false, mode }: CardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const pad = { sm: 2, md: 3, lg: 4 }[padding] ?? 3;

  const styling = {
    paper: {
      bgcolor: mode === 'light' ? '#FFFFFF' : mode === 'dark' ? '#1C1C1C' : 'background.paper',
      color: mode === 'light' ? '#1E1E1E' : mode === 'dark' ? '#FFFFFF' : 'text.primary',
      border: mode === 'light' ? '1px solid rgba(31, 31, 31, 0.14)' : mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.16)' : '1px solid rgba(40, 34, 28, 0.12)',
      boxShadow: mode === 'light' ? '0 12px 40px rgba(31, 31, 31, 0.12)' : mode === 'dark' ? '0 12px 40px rgba(0, 0, 0, 0.35)' : '0 12px 40px rgba(40, 34, 28, 0.12)',
    },
    glass: {
      bgcolor: mode === 'light' ? 'rgba(255, 255, 255, 0.85)' : mode === 'dark' ? 'rgba(28, 28, 28, 0.85)' : 'rgba(255, 255, 255, 0.44)',
      color: mode === 'light' ? '#1E1E1E' : mode === 'dark' ? '#FFFFFF' : 'text.primary',
      border: '1px solid rgba(255, 255, 255, 0.72)',
      boxShadow: '0 26px 60px -12px rgba(40, 34, 28, 0.2)',
      backdropFilter: 'blur(18px)',
      WebkitBackdropFilter: 'blur(18px)',
    },
    tile: {
      bgcolor: mode === 'light' ? 'rgba(255, 255, 255, 0.9)' : mode === 'dark' ? 'rgba(28, 28, 28, 0.9)' : 'rgba(255, 255, 255, 0.7)',
      color: mode === 'light' ? '#1E1E1E' : mode === 'dark' ? '#FFFFFF' : 'text.primary',
      border: '1px solid rgba(255, 255, 255, 0.6)',
      boxShadow: '0 12px 24px rgba(40, 34, 28, 0.08)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
    },
    ink: {
      bgcolor: '#1F1F1F',
      color: '#FFFFFF',
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
