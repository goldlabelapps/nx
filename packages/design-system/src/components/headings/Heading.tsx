'use client';

import { Typography } from '@mui/material';
import type { HeadingProps } from '../../types';

const headingVariantStyles = {
  label: {
    fontSize: '0.875rem',
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    lineHeight: 1.2,
  },
  h1: {
    fontSize: '2rem',
    letterSpacing: '-0.01em',
    textTransform: 'none',
    lineHeight: 1.15,
  },
  h2: {
    fontSize: '1.625rem',
    letterSpacing: '-0.005em',
    textTransform: 'none',
    lineHeight: 1.2,
  },
  h3: {
    fontSize: '1.35rem',
    letterSpacing: '0',
    textTransform: 'none',
    lineHeight: 1.25,
  },
  h4: {
    fontSize: '1.125rem',
    letterSpacing: '0.005em',
    textTransform: 'none',
    lineHeight: 1.3,
  },
  h5: {
    fontSize: '1rem',
    letterSpacing: '0.01em',
    textTransform: 'none',
    lineHeight: 1.35,
  },
  h6: {
    fontSize: '0.9375rem',
    letterSpacing: '0.015em',
    textTransform: 'none',
    lineHeight: 1.35,
  },
} as const;

function Heading({ children, tone = 'primary', as = 'span', variant, style, ...rest }: HeadingProps) {
  const resolvedTone = tone === 'clay' ? 'primary' : tone === 'ink' ? 'secondary' : tone;
  const { fontWeight: _fontWeight, ...safeStyle } = style ?? {};
  const inferredVariant = as === 'h1' || as === 'h2' || as === 'h3' || as === 'h4' || as === 'h5' || as === 'h6' ? as : 'label';
  const resolvedVariant = variant ?? inferredVariant;

  return (
    <Typography
      component={as}
      sx={{
        display: as === 'span' ? 'inline-flex' : 'block',
        alignItems: 'center',
        gap: 1,
        fontFamily: 'var(--font-title)',
        ...headingVariantStyles[resolvedVariant],
        color: resolvedTone === 'primary' ? 'var(--nx-clay)' : 'text.primary',
        fontWeight: 400
      }}
      style={safeStyle}
      {...rest}
    >
      {children}
    </Typography>
  );
}

export default Heading;
