import type { Dispatch } from 'redux';
import { setUbereduxKey } from '../../Uberedux';
import { setAsync } from '../../Async';

export const subscribeFingerprint = (): any =>
        async (dispatch: Dispatch, getState: () => any) => {
            try {
                console.log('subscribeFingerprint');
                
            } catch (e: unknown) {
                const msg = e instanceof Error ? e.message : String(e);
                dispatch(setUbereduxKey({ key: 'error', value: msg }));
            }
        };