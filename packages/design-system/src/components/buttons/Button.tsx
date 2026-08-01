'use client';

import { Button as MuiButton } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import type { ButtonProps as NxButtonProps, ButtonSize, ButtonTone, ButtonVariant } from '../../types';

const SIZE_STYLES = {
  sm: {
    minHeight: 36,
    px: 1.5,
    py: 0.75,
    fontSize: '0.9rem',
  },
  md: {
    minHeight: 42,
    px: 2,
    py: 0.9,
    fontSize: '0.96rem',
  },
  lg: {
    minHeight: 48,
    px: 2.5,
    py: 1,
    fontSize: '1rem',
  },
} satisfies Record<ButtonSize, Record<string, string | number>>;

const VARIANT_MAP: Record<ButtonVariant, 'contained' | 'outlined' | 'text'> = {
  solid: 'contained',
  outline: 'outlined',
  ghost: 'text',
};

function getToneStyles(tone: ButtonTone, variant: ButtonVariant) {
  const tones = {
    primary: {
      solid: {
        bgcolor: '#4a46b8',
        color: '#f6f5ff',
        '&:hover': {
          bgcolor: '#3d3998',
        },
      },
      outline: {
        color: '#4a46b8',
        borderColor: 'rgba(74, 70, 184, 0.38)',
        backgroundColor: 'rgba(74, 70, 184, 0.04)',
        '&:hover': {
          borderColor: '#4a46b8',
          backgroundColor: 'rgba(74, 70, 184, 0.08)',
        },
      },
      ghost: {
        color: '#4a46b8',
        boxShadow: 'none',
        '&:hover': {
          backgroundColor: 'rgba(74, 70, 184, 0.08)',
          boxShadow: 'none',
        },
      },
    },
    neutral: {
      solid: {
        bgcolor: '#1e1c34',
        color: '#f6f5ff',
        '&:hover': {
          bgcolor: '#171623',
        },
      },
      outline: {
        color: '#1e1c34',
        borderColor: 'rgba(30, 28, 52, 0.22)',
        backgroundColor: 'rgba(30, 28, 52, 0.03)',
        '&:hover': {
          borderColor: 'rgba(30, 28, 52, 0.38)',
          backgroundColor: 'rgba(30, 28, 52, 0.08)',
        },
      },
      ghost: {
        color: '#1e1c34',
        boxShadow: 'none',
        '&:hover': {
          backgroundColor: 'rgba(30, 28, 52, 0.08)',
          boxShadow: 'none',
        },
      },
    },
    danger: {
      solid: {
        bgcolor: '#b53a2d',
        color: '#fff7f5',
        '&:hover': {
          bgcolor: '#982d22',
        },
      },
      outline: {
        color: '#b53a2d',
        borderColor: 'rgba(181, 58, 45, 0.32)',
        backgroundColor: 'rgba(181, 58, 45, 0.04)',
        '&:hover': {
          borderColor: '#b53a2d',
          backgroundColor: 'rgba(181, 58, 45, 0.08)',
        },
      },
      ghost: {
        color: '#b53a2d',
        boxShadow: 'none',
        '&:hover': {
          backgroundColor: 'rgba(181, 58, 45, 0.08)',
          boxShadow: 'none',
        },
      },
    },
  };

  return tones[tone][variant];
}

export default function Button({
  children,
  variant = 'solid',
  tone = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  href,
  onClick,
  startIcon,
  endIcon,
  type = 'button',
  ariaLabel,
  className,
  sx,
}: NxButtonProps) {
  const mergedSx = {
    borderRadius: '3px',
    fontWeight: 700,
    lineHeight: 1,
    letterSpacing: '0.02em',
    textTransform: 'none',
    alignSelf: 'flex-start',
    width: fullWidth ? '100%' : 'auto',
    boxShadow: variant === 'ghost' ? 'none' : undefined,
    '&.Mui-disabled': {
      opacity: 0.55,
    },
    ...SIZE_STYLES[size],
    ...getToneStyles(tone, variant),
  };

  const composedSx: SxProps<Theme> = Array.isArray(sx) ? [mergedSx, ...sx] : sx ? [mergedSx, sx] : mergedSx;

  return (
    <MuiButton
      variant={VARIANT_MAP[variant]}
      disableElevation
      fullWidth={fullWidth}
      disabled={disabled}
      href={href}
      onClick={onClick}
      startIcon={startIcon}
      endIcon={endIcon}
      type={type}
      aria-label={ariaLabel}
      className={className}
      sx={composedSx}
    >
      {children}
    </MuiButton>
  );
}