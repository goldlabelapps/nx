import type { T_RootState } from '../../Uberedux/store';
import { useSelector } from 'react-redux';

export function useState() {
    return useSelector((state: T_RootState) => state.redux.orders);
}
