import { Typography } from '@mui/material';
import type { ReactNode } from 'react';

type EyebrowProps = {
  children: ReactNode;
  tone?: 'ink' | 'clay';
  as?: 'span' | 'div';
  style?: React.CSSProperties;
};

export function Eyebrow({ children, tone = 'clay', as = 'span', style, ...rest }: EyebrowProps) {
  return (
    <Typography
      component={as}
      sx={{
        display: as === 'span' ? 'inline-flex' : 'block',
        alignItems: 'center',
        gap: 1,
        fontFamily: 'var(--font-mono)',
        fontSize: '0.875rem',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: tone === 'clay' ? 'var(--nx-clay)' : 'text.primary',
        fontWeight: 600
      }}
      style={style}
      {...rest}
    >
      {children}
    </Typography>
  );
}
