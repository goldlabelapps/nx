import type { T_RootState } from '../../Uberedux/store';
import { useSelector } from 'react-redux';

export function useBus(id: number | string) {
    return useSelector((state: T_RootState) => state.redux.orders.bus?.[id]);
}
