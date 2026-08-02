import UbereduxProvider from './UbereduxProvider';
import { useSlice } from './hooks/useSlice';
import { useDispatch } from './hooks/useDispatch';
import { initialState, setUbereduxKey, resetUberedux, store } from './store';

export {
  UbereduxProvider,
  initialState,
  useSlice,
  useDispatch,
  setUbereduxKey,
  resetUberedux,
  store,
};

export type { T_RootState, T_UbereduxDispatch, AppDispatch } from './store';