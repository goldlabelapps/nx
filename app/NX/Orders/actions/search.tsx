import type { T_UbereduxDispatch, T_RootState } from '../../types';
import { setUbereduxKey } from '../../Uberedux';
import { setFeedback } from '../../DesignSystem';
import { setKey } from '../../Orders';

export const search = () => async (
    dispatch: T_UbereduxDispatch, 
    getState: () => T_RootState,
) => {
    try {
        dispatch(setKey('loading', true));
        const state = getState().redux.prospects;
        const page = state?.query?.page || 1;
        const limit = state?.query?.limit || 100;
        // const searchStr = state?.searchStr || '';
        const searchStr = 'Rival Field';
        const endpoint = `${process.env.NEXT_PUBLIC_PYTHON_URL}orders?s=${encodeURIComponent(searchStr)}&page=${page}&limit=${limit}`;
        const res = await fetch(endpoint);
        if (!res.ok) throw new Error(`Failed to fetch: ${endpoint}`);
        const data = await res.json();
        if (data?.data) {
            dispatch(setKey('results', data.data));
            dispatch(setKey('pagination', data.pagination));
        } else {
            dispatch(setKey('results', []));
            dispatch(setKey('pagination', null));
        }
        dispatch(setKey('loading', false));
    } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        dispatch(setUbereduxKey({ key: 'error', value: msg }));
        dispatch(setKey('loading', false));
    }
};
