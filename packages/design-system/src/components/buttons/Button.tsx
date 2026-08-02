'use client';

import { Button as MuiButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
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
  text: 'text',
};

function getToneStyles(tone: ButtonTone, variant: ButtonVariant, theme: Theme) {
  const styleVariant = variant === 'text' ? 'ghost' : variant;
  const palette = theme.palette;

  const tones = {
    primary: {
      solid: {
        bgcolor: palette.primary.main,
        color: palette.primary.contrastText || palette.common.white,
        '&:hover': {
          bgcolor: palette.primary.dark,
        },
      },
      outline: {
        color: palette.primary.main,
        borderColor: `${palette.primary.main}38`,
        backgroundColor: `${palette.primary.main}0A`,
        '&:hover': {
          borderColor: palette.primary.main,
          backgroundColor: `${palette.primary.main}14`,
        },
      },
      ghost: {
        color: palette.primary.main,
        boxShadow: 'none',
        '&:hover': {
          backgroundColor: `${palette.primary.main}14`,
          boxShadow: 'none',
        },
      },
    },
    neutral: {
      solid: {
        bgcolor: palette.text.primary,
        color: palette.background.paper,
        '&:hover': {
          bgcolor: palette.text.secondary,
        },
      },
      outline: {
        color: palette.text.primary,
        borderColor: `${palette.text.primary}38`,
        backgroundColor: `${palette.text.primary}0A`,
        '&:hover': {
          borderColor: `${palette.text.primary}61`,
          backgroundColor: `${palette.text.primary}14`,
        },
      },
      ghost: {
        color: palette.text.primary,
        boxShadow: 'none',
        '&:hover': {
          backgroundColor: `${palette.text.primary}14`,
          boxShadow: 'none',
        },
      },
    },
    danger: {
      solid: {
        bgcolor: palette.error.main,
        color: palette.error.contrastText,
        '&:hover': {
          bgcolor: palette.error.dark,
        },
      },
      outline: {
        color: palette.error.main,
        borderColor: `${palette.error.main}38`,
        backgroundColor: `${palette.error.main}0A`,
        '&:hover': {
          borderColor: palette.error.main,
          backgroundColor: `${palette.error.main}14`,
        },
      },
      ghost: {
        color: palette.error.main,
        boxShadow: 'none',
        '&:hover': {
          backgroundColor: `${palette.error.main}14`,
          boxShadow: 'none',
        },
      },
    },
  };

  return tones[tone][styleVariant];
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
  const theme = useTheme();
  const mergedSx = {
    borderRadius: '3px',
    fontWeight: 400,
    lineHeight: 1,
    letterSpacing: '0.02em',
    textTransform: 'none',
    alignSelf: 'flex-start',
    width: fullWidth ? '100%' : 'auto',
    boxShadow: variant === 'ghost' || variant === 'text' ? 'none' : undefined,
    '&.Mui-disabled': {
      opacity: 0.55,
    },
    ...SIZE_STYLES[size],
    ...getToneStyles(tone, variant, theme),
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