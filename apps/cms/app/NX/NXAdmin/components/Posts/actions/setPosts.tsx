import type { Dispatch } from 'redux';
import { setUbereduxKey } from '@nx/uberedux';

export const setPosts =
    (key: string, value: any): any =>
        async (dispatch: Dispatch, getState: () => any) => {
            try {
                const state = getState();
                const current = (state?.redux?.nxAdmin?.posts) || {};
                const updated = { ...current, [key]: value };
                dispatch(setUbereduxKey({ key: 'nxAdmin.posts', value: updated }));
            } catch (e: unknown) {
                const msg = e instanceof Error ? e.message : String(e);
                dispatch(setUbereduxKey({ key: 'error', value: msg }));
            }
        };
