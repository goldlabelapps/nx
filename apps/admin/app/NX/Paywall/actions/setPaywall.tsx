import type { Dispatch } from 'redux';
import { setUbereduxKey } from '../../Uberedux';

export const setPaywall =
    (key: string, value: any): any =>
        async (dispatch: Dispatch, getState: () => any) => {
            try {
                const state = getState();
                const current = (state?.redux?.paywall) || {};
                const updated = { ...current, [key]: value };
                dispatch(setUbereduxKey({ key: 'paywall', value: updated }));
            } catch (e: unknown) {
                const msg = e instanceof Error ? e.message : String(e);
                dispatch(setUbereduxKey({ key: 'error', value: msg }));
            }
        };
