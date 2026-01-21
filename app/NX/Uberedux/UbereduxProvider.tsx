'use client';
import * as React from 'react';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from './store';

export default function UbereduxProvider({
  config,
  children,
}: {
  config?: any;
  children: ReactNode;
}) {
  const store = React.useMemo(() => makeStore(config), [config]);
  return <Provider store={store}>
    {children}
  </Provider>;
}
