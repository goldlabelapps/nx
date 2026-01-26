import type { Dispatch } from 'redux';
import { setUbereduxKey } from '../../Uberedux';
import { addTerminalMessage } from '../../EchoPay';
import { clearTerminal } from './clearTerminal';
import { getToken } from './getToken';

export const initPayment = (): any =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(clearTerminal());
            // dispatch(addTerminalMessage('Initialising payment...'));
            dispatch(addTerminalMessage('Getting token...'));
            const token = await getToken(dispatch);
            if (token) {
                const shortToken = token.slice(0, 50) + '...';
                dispatch(addTerminalMessage(`Token: ${shortToken}`));
                // Next payment step can go here
            } else {
                dispatch(addTerminalMessage('Failed to retrieve token. Payment cannot proceed.'));
            }
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
            dispatch(addTerminalMessage(`Error during payment init: ${msg}`));
        }
    };
