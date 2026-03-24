import type { T_RootState } from '../../Uberedux/store';
import { useSelector } from 'react-redux';

export function useTings() {
    return useSelector((state: T_RootState) => state.redux.tings);
}
