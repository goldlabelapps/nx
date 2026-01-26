import type { Dispatch } from 'redux';
import { setUbereduxKey } from '../../Uberedux';
import { addTerminalMessage } from '../../EchoPay';

export const initPayment = (): any =>
    async (dispatch: Dispatch, getState: () => any) => {
        try {
            dispatch(addTerminalMessage('Initialising payment...'));
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
        }
    };
