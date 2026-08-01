'use client';

import type { ReactNode } from 'react';
import { useMediaQuery } from '@mui/material';

type UseIsMobileOptions = {
  maxWidth?: number;
};

type VisibilityProps = {
  children: ReactNode;
  maxWidth?: number;
  fallback?: ReactNode;
};

export function useIsMobile({ maxWidth = 999 }: UseIsMobileOptions = {}) {
  return useMediaQuery(`(max-width:${maxWidth}px)`, {
    noSsr: true,
    defaultMatches: false,
  });
}

export function DesktopOnly({ children, maxWidth = 999, fallback = null }: VisibilityProps) {
  const isMobile = useIsMobile({ maxWidth });
  return isMobile ? <>{fallback}</> : <>{children}</>;
}

export function MobileOnly({ children, maxWidth = 999, fallback = null }: VisibilityProps) {
  const isMobile = useIsMobile({ maxWidth });
  return isMobile ? <>{children}</> : <>{fallback}</>;
}
