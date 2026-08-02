'use client';

import { IconButton as MuiIconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
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

function getToneStyles(tone: ButtonTone, variant: ButtonVariant, theme: Theme) {
  const styleVariant = variant === 'text' ? 'ghost' : variant;
  const palette = theme.palette;
  const toneColors = {
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

  return toneColors[tone][styleVariant];
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
  color,
  sx,
  ...rest
}: NxIconButtonProps) {
  const theme = useTheme();
  const muiColor = color ?? (tone === 'danger' ? 'error' : tone === 'primary' ? 'primary' : 'inherit');
  const mergedSx = {
    borderRadius: '3px',
    alignSelf: 'flex-start',
    border: VARIANT_MAP[variant] === 'outlined' ? '1px solid' : undefined,
    boxShadow: variant === 'ghost' || variant === 'text' ? 'none' : undefined,
    '&.Mui-disabled': {
      opacity: 0.55,
    },
    ...SIZE_STYLES[size],
    ...getToneStyles(tone, variant, theme),
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
        color={muiColor}
        sx={composedSx}
        {...rest}
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
      color={muiColor}
      sx={composedSx}
      {...rest}
    >
      {icon}
    </MuiIconButton>
  );
}
