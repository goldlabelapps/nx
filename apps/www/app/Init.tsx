'use client';

import { useEffect, useRef } from 'react';
import { setUbereduxKey, useDispatch } from '@nx/uberedux';

export default function Init() {
  const dispatch = useDispatch();
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;

    hasInitialized.current = true;

    dispatch(
      setUbereduxKey({
        key: 'init',
        value: {
          mountedAt: new Date().toISOString(),
          path: typeof window !== 'undefined' ? window.location.pathname : '/',
        },
      }),
    );
  }, [dispatch]);

  return null;
}
