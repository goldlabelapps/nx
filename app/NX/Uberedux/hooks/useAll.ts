import type { T_RootState } from '../../Uberedux';
import { useSelector } from 'react-redux';

export function useAll() {
  const slice = useSelector((state: T_RootState) => state.redux);
  return {
    ...slice,
  };
}
