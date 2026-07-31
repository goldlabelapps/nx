import type { Dispatch } from 'redux';
import { setUbereduxKey } from '../../Uberedux';

export const setNXAdmin =
    (key: string, value: any): any =>
        async (dispatch: Dispatch, getState: () => any) => {
            try {
                // Get current value from state
                const state = getState();
                const current = (state?.redux?.nxAdmin) || {};
                // Add/overwrite the incoming key-value pair
                const updated = { ...current, [key]: value };
                // Set the updated object in Uberedux
                dispatch(setUbereduxKey({ key: 'nxAdmin', value: updated }));
            } catch (e: unknown) {
                const msg = e instanceof Error ? e.message : String(e);
                dispatch(setUbereduxKey({ key: 'error', value: msg }));
            }
        };
