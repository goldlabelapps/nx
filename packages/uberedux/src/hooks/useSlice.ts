import { useSelector } from 'react-redux';
import type { T_RootState } from '../../types';

export function useSlice() {
  const slice = useSelector((state: T_RootState) => state.redux);

  return {
    ...slice,
  };
}