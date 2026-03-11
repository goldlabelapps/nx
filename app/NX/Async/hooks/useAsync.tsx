import type { T_RootState } from '../../Uberedux/store';
import { useSelector } from 'react-redux';

export function useAsync() {
    return useSelector((state: T_RootState) => state.redux.async);
}
