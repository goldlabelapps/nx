import type { T_RootState } from '../../Uberedux/store';
import { useSelector } from 'react-redux';

export function useSoho() {
    return useSelector((state: T_RootState) => state.redux.soho);
}
