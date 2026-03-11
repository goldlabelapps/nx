import type { T_UbereduxDispatch, T_RootState } from '../../types';
import { setUbereduxKey } from '../../Uberedux';
import { setAsync } from '../../Async';

export const timeHook = (
    onTickNum: number
): any =>
    async (
        dispatch: T_UbereduxDispatch, 
        getState: () => T_RootState,
    ) => {
        try {
            // const { sessionTime } = getState().redux.async;
            // if (onTickNum && sessionTime >= onTickNum) {
            //     dispatch(setAsync('message', `${sessionTime}ms`));
            //     dispatch(setAsync('ticks', 0));
            // }
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
        }
    };
