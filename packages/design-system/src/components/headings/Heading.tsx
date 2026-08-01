'use client';

import { Typography } from '@mui/material';
import type { EyebrowProps } from '../../types';

function Heading({ children, tone = 'primary', as = 'span', style, ...rest }: EyebrowProps) {
  const resolvedTone = tone === 'clay' ? 'primary' : tone === 'ink' ? 'secondary' : tone;

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
        color: resolvedTone === 'primary' ? 'var(--nx-clay)' : 'text.primary',
        fontWeight: 600
      }}
      style={style}
      {...rest}
    >
      {children}
    </Typography>
  );
}

export { Heading as Eyebrow };
export default Heading;
