import type { T_RootState } from '../../Uberedux/store';
import { useSelector } from 'react-redux';

export function useDesignSystem() {
    return useSelector((state: T_RootState) => state.redux.designSystem);
}
