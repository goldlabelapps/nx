import type { T_UbereduxDispatch } from '../../types';
import { setUbereduxKey } from '../../Uberedux';

export const initSoho = (): any =>
        async (dispatch: T_UbereduxDispatch, getState: () => any) => {
            try {
                console.log('initSoho');
                // const { authChecked, user } = getState().redux.paywall || {};
                // const { sessionStart } = getState().redux.async || {};
                // if (!sessionStart && authChecked) {
                //     await dispatch(setAsync('sessionStart', Date.now()));
                //     await dispatch(createTing());
                //     await dispatch(initDoc());
                //     await dispatch(setAsync('ticks', 1));
                // }
                return;
            } catch (e: unknown) {
                const msg = e instanceof Error ? e.message : String(e);
                dispatch(setUbereduxKey({ key: 'error', value: msg }));
            }
        };
