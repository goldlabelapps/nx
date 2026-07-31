import type { T_RootState } from '../../Uberedux/store';
import { useSelector } from 'react-redux';

export function useFullscreen() {
    return useSelector((state: T_RootState) => state.redux.designSystem?.fullscreen);
}
