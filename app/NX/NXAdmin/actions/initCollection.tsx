import type { Dispatch } from 'redux';
import { setUbereduxKey } from '../../Uberedux';

export const initCollection = (
    collection: string,
): any =>
    async (dispatch: Dispatch, getState: () => any) => {
        try {
            const newCRUD = {
                initted: true,
                subscribed: false,
            };
            const state = getState();
            const currentNxAdmin = (state?.redux?.nxAdmin) || {};
            const currentCRUD = currentNxAdmin.crud || {};
            const updatedCRUD = { ...currentCRUD, [collection]: newCRUD };
            const updatedNxAdmin = { ...currentNxAdmin, crud: updatedCRUD };
            dispatch(setUbereduxKey({ key: 'nxAdmin', value: updatedNxAdmin }));
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
        }
    };
