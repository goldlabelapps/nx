import type { Dispatch } from 'redux';
import { setUbereduxKey } from '../../Uberedux';

export const setCRUD = (
    collection: string,
    key: string,
    value: any,
): any =>
    async (dispatch: Dispatch, getState: () => any) => {
        try {
            const state = getState();
            const current = (state?.redux?.nxAdmin) || {};
            const crud = { ...current.crud };
            const collectionCrud = { ...(crud[collection] || {}) };
            collectionCrud[key] = value;
            crud[collection] = collectionCrud;
            const updated = { ...current, crud };
            dispatch(setUbereduxKey({ key: 'nxAdmin', value: updated }));
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
        }
    };
