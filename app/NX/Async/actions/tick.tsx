import type { T_UbereduxDispatch } from '../../types';
import { setUbereduxKey } from '../../Uberedux';
import { setAsync, timeHook } from '../../Async';
// import { militaryTime } from '../../lib';

export const tick = (): any =>
    async (dispatch: T_UbereduxDispatch, getState: () => any) => {
        try {
            const { ticks } = getState().redux.async;
            // console.log('tick', ticks);
            dispatch(setAsync('ticks', ticks + 1));
            // dispatch(setAsync('militaryTime', militaryTime(Date.now())));
            // dispatch(timeHook(10));
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
        }
    };
