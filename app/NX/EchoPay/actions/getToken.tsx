import type { Dispatch } from 'redux';
import { setUbereduxKey } from '../../Uberedux';
import { setEchoPay } from '../../EchoPay'

export const getToken = (): any =>
    async (dispatch: Dispatch, getState: () => any) => {
        try {
            const apiKey = process.env.NEXT_PUBLIC_ECHOPAY_APIKEY;
            if (!apiKey) {
                throw new Error('EchoPay API key not found in config');
            }
            const baseUrl = process.env.NEXT_PUBLIC_ECHOPAY_BASEURL;
            const res = await fetch(`${baseUrl}/token`, {
                method: 'POST',
                headers: {
                    'ep-api-key': apiKey,
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            dispatch(setEchoPay('token', data));
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
        }
    };
