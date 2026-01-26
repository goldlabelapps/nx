import type { Dispatch } from 'redux';
import { setUbereduxKey } from '../../Uberedux';
import { setEchoPay } from '../../EchoPay';

export const init = (): any =>
    async (dispatch: Dispatch, getState: () => any) => {
        try {
            dispatch(setEchoPay('message', ['Hello from init!']));
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
        }
    };
