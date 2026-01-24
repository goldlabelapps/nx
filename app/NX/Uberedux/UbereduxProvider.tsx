'use client';
import * as React from 'react';
import type { T_Config } from '../types'
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { reduxSlice } from './store';
import { makeInitialState } from './makeInitialState';

export default function UbereduxProvider({
  config,
  children,
}: {
  config: T_Config;
  children: ReactNode;
}) {
  const store = React.useMemo(() =>
    configureStore({
      reducer: reduxSlice.reducer,
      preloadedState: { redux: makeInitialState(config) },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
    }),
    [config]
  );
  return <Provider store={store}>{children}</Provider>;
}
