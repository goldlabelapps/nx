'use client';

import { Provider } from 'react-redux';
import { store } from './store';
import type { T_UbereduxProviderProps } from '../types';

export default function UbereduxProvider({
  children,
}: T_UbereduxProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
