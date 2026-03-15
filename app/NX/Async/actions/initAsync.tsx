import type { T_UbereduxDispatch } from '../../types';
import { setUbereduxKey } from '../../Uberedux';
import { setAsync, createTing } from '../../Async';

export const initAsync = (): any =>
        async (dispatch: T_UbereduxDispatch, getState: () => any) => {
            try {
                const { sessionStart } = getState().redux.async || {};
                if (!sessionStart) {
                    dispatch(setAsync('sessionStart', Date.now()));
                    dispatch(setAsync('subscription', null));
                    dispatch(createTing());
                    dispatch(setAsync('ticks', 1));
                }
                return;
            } catch (e: unknown) {
                const msg = e instanceof Error ? e.message : String(e);
                dispatch(setUbereduxKey({ key: 'error', value: msg }));
            }
        };
