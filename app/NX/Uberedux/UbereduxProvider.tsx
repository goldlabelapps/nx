'use client';
import * as React from 'react';
import type { ReactNode } from 'react';
import type { T_Config } from '../types';
import { Provider } from 'react-redux';
import { store } from './store';

export default function UbereduxProvider({
  // config,
  children,
}: {
  config?: T_Config;
  children: ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
