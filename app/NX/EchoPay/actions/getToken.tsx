import type { Dispatch } from 'redux';
import { setUbereduxKey } from '../../Uberedux';
import { setEchoPay, addTerminalMessage } from '../../EchoPay'
import { getPaymentLink } from './getPaymentLink';

export const getToken = async (dispatch: Dispatch): Promise<string | null> => {
    try {
        // dispatch(addTerminalMessage('Fetching EchoPay API key...'));
        const apiKey = process.env.NEXT_PUBLIC_ECHOPAY_APIKEY;
        if (!apiKey) {
            dispatch(addTerminalMessage('EchoPay API key not found in config'));
            throw new Error('EchoPay API key not found in config');
        }
        // dispatch(addTerminalMessage('API key found. Fetching token...'));
        const baseUrl = process.env.NEXT_PUBLIC_ECHOPAY_BASEURL;
        const res = await fetch(`${baseUrl}/token`, {
            method: 'POST',
            headers: {
                'ep-api-key': apiKey,
                'Content-Type': 'application/json',
            },
        });
        dispatch(addTerminalMessage('Response received. Parsing & saving to Redux...'));
        const response = await res.json();
        const status = response?.status;
        const statusCode = response?.statusCode;
        const idToken = response?.data?.idToken || null;
        if (status === 'success' && statusCode === 201 && idToken) {
            // Save token to Redux and wait for completion
            await dispatch(setEchoPay('token', idToken));
            // Now call getPaymentLink, which will read token from Redux
            await getPaymentLink(dispatch);
        } else {
            dispatch(addTerminalMessage('idToken not found or response status not success.'));
        }
        return idToken;
    } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        dispatch(setUbereduxKey({ key: 'error', value: msg }));
        dispatch(addTerminalMessage(`Error fetching token: ${msg}`));
        return null;
    }
};
