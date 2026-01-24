import { useSelector } from 'react-redux';
import type { TRootState } from '../';

export function useAll() {
  const slice = useSelector((state: TRootState) => state.redux);

  return {
    ...slice,
  };
}
