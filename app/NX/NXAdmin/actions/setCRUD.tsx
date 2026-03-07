import type { Dispatch } from 'redux';
import { setUbereduxKey } from '../../Uberedux';

export const setCRUD = (
    crud: any,
): any =>
    async (dispatch: Dispatch, getState: () => any) => {
        try {
            // Get current value from state
            const state = getState();
            const current = (state?.redux?.nxAdmin) || {};
            // Set the crud key to the incoming crud value
            const updated = { ...current, crud };
            // Set the updated object in Uberedux
            dispatch(setUbereduxKey({ key: 'nxAdmin', value: updated }));
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
        }
    };
