'use client';

import { useLayoutEffect, useState } from 'react';
import { useMediaQuery } from '@mui/material';
import type { UseIsMobileOptions, VisibilityProps } from '../../types';

export function useIsMobile({ maxWidth = 999 }: UseIsMobileOptions = {}) {
  return useMediaQuery(`(max-width:${maxWidth}px)`, {
    noSsr: true,
    defaultMatches: false,
  });
}

export function DesktopOnly({ children, maxWidth = 999, fallback = null }: VisibilityProps) {
  const [hydrated, setHydrated] = useState(false);
  useLayoutEffect(() => {
    setHydrated(true);
  }, []);

  const isMobile = useIsMobile({ maxWidth });

  if (!hydrated) {
    return (
      <div style={{ opacity: 0, pointerEvents: 'none' }}>
        {children}
      </div>
    );
  }

  return isMobile ? <>{fallback}</> : <>{children}</>;
}

export function MobileOnly({ children, maxWidth = 999, fallback = null }: VisibilityProps) {
  const [hydrated, setHydrated] = useState(false);
  useLayoutEffect(() => {
    setHydrated(true);
  }, []);

  const isMobile = useIsMobile({ maxWidth });

  if (!hydrated) {
    return (
      <div style={{ opacity: 0, pointerEvents: 'none' }}>
        {children}
      </div>
    );
  }

  return isMobile ? <>{children}</> : <>{fallback}</>;
}
