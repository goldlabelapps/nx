import UbereduxProvider from './UbereduxProvider';
import { useSlice } from './hooks/useSlice';
import { useDispatch } from './hooks/useDispatch';
import { setUbereduxKey, resetUberedux, store } from './store';
import type { T_RootState, T_UbereduxDispatch, AppDispatch } from './store';

export {
  UbereduxProvider,
  useSlice,
  useDispatch,
  setUbereduxKey,
  resetUberedux,
  store,
};

export type { T_RootState, T_UbereduxDispatch, AppDispatch };

