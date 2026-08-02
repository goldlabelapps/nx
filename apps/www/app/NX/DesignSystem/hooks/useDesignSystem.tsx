import type { T_RootState } from '@nx/uberedux';
import { useSelector } from 'react-redux';

export function useDesignSystem() {
    return useSelector((state: T_RootState) => state.redux.designSystem);
}
