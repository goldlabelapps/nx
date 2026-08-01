'use client';

import { IconButton as MuiIconButton } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import type { ButtonSize, ButtonTone, ButtonVariant, IconButtonProps as NxIconButtonProps } from '../../types';

const SIZE_STYLES = {
  sm: {
    width: 36,
    height: 36,
  },
  md: {
    width: 42,
    height: 42,
  },
  lg: {
    width: 48,
    height: 48,
  },
} satisfies Record<ButtonSize, Record<string, string | number>>;

const VARIANT_MAP: Record<ButtonVariant, 'contained' | 'outlined' | 'text'> = {
  solid: 'contained',
  outline: 'outlined',
  ghost: 'text',
  text: 'text',
};

function getToneStyles(tone: ButtonTone, variant: ButtonVariant) {
  const styleVariant = variant === 'text' ? 'ghost' : variant;

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

  return tones[tone][styleVariant];
}

export default function IconButton({
  icon,
  variant = 'ghost',
  tone = 'primary',
  size = 'md',
  disabled = false,
  href,
  onClick,
  type = 'button',
  ariaLabel,
  className,
  sx,
}: NxIconButtonProps) {
  const mergedSx = {
    borderRadius: '3px',
    alignSelf: 'flex-start',
    border: VARIANT_MAP[variant] === 'outlined' ? '1px solid' : undefined,
    boxShadow: variant === 'ghost' || variant === 'text' ? 'none' : undefined,
    '&.Mui-disabled': {
      opacity: 0.55,
    },
    ...SIZE_STYLES[size],
    ...getToneStyles(tone, variant),
  };

  const composedSx: SxProps<Theme> = Array.isArray(sx) ? [mergedSx, ...sx] : sx ? [mergedSx, sx] : mergedSx;

  if (href) {
    return (
      <MuiIconButton
        component='a'
        href={href}
        disabled={disabled}
        onClick={onClick}
        aria-label={ariaLabel}
        className={className}
        sx={composedSx}
      >
        {icon}
      </MuiIconButton>
    );
  }

  return (
    <MuiIconButton
      disabled={disabled}
      onClick={onClick}
      type={type}
      aria-label={ariaLabel}
      className={className}
      sx={composedSx}
    >
      {icon}
    </MuiIconButton>
  );
}
