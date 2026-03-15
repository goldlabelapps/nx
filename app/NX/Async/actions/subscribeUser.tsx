import type { Dispatch } from 'redux';
import { setUbereduxKey } from '../../Uberedux';
import { setAsync } from '../../Async';

export const subscribeUser = (): any =>
        async (dispatch: Dispatch, getState: () => any) => {
            try {
                console.log('subscribeUser');
                
            } catch (e: unknown) {
                const msg = e instanceof Error ? e.message : String(e);
                dispatch(setUbereduxKey({ key: 'error', value: msg }));
            }
        };