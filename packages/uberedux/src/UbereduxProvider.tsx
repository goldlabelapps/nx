'use client';

import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';

export default function UbereduxProvider({
  children,
}: {
  config?: unknown;
  children: ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
