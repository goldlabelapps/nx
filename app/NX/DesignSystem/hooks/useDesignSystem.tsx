import { useSelector } from 'react-redux';
import { T_RootState } from '../../Uberedux';

export function useDesignSystem() {
  return useSelector((state: T_RootState) => state.redux.designSystem);
}
