import type { T_UbereduxDispatch } from '../../types';
import { setUbereduxKey } from '../../Uberedux';
import { setAsync, tick } from '../../Async';

export const initAsync = (): any =>
        async (dispatch: T_UbereduxDispatch, getState: () => any) => {
            try {
                dispatch(setAsync('sessionStart', Date.now()));
                dispatch(setAsync('ticks', 0));
                dispatch(tick());
            } catch (e: unknown) {
                const msg = e instanceof Error ? e.message : String(e);
                dispatch(setUbereduxKey({ key: 'error', value: msg }));
            }
        };
