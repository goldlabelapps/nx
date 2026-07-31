import type { Dispatch } from 'redux';
import { setUbereduxKey } from '../../../../Uberedux';

export const setQueue =
    (key: string, value: any): any =>
        async (dispatch: Dispatch, getState: () => any) => {
            try {
                // Get current value from state
                const state = getState();
                const current = (state?.redux?.nxAdmin?.queue) || {};
                // Add/overwrite the incoming key-value pair
                const updated = { ...current, [key]: value };
                // Set the updated object in Uberedux
                dispatch(setUbereduxKey({ key: 'nxAdmin.queue', value: updated }));
            } catch (e: unknown) {
                const msg = e instanceof Error ? e.message : String(e);
                dispatch(setUbereduxKey({ key: 'error', value: msg }));
            }
        };

        