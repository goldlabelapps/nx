import type { T_RootState } from '../../Uberedux/store';
import { useSelector } from 'react-redux';

export function useBus(id: number | string) {

    // there might be a value in the bus key of prospects. 
    return useSelector((state: T_RootState) => state.redux.prospects.bus?.[id]);
}
