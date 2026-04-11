// Default search params for orders
export const defaultOrderSearchParams = {
    s: '', // search string
    page: 1,
    limit: 25,
    // hideflagged: false, // add if needed
};
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
        const state = getState().redux.orders;
        const params = state?.searchParams || defaultOrderSearchParams;
        const query = new URLSearchParams({
            s: params.s || '',
            page: String(params.page || 1),
            limit: String(params.limit || 10),
            // ...(params.hideflagged !== undefined ? { hideflagged: String(params.hideflagged) } : {})
        }).toString();
        const endpoint = `${process.env.NEXT_PUBLIC_PYTHON_URL}orders?${query}`;
        const res = await fetch(endpoint);
        if (!res.ok) throw new Error(`Failed to fetch: ${endpoint}`);
        const data = await res.json();
        if (data?.data) {
            dispatch(setKey('results', data.data));
            dispatch(setKey('pagination', data.pagination));
            dispatch(setKey('search', data.search));
        } else {
            dispatch(setKey('results', []));
            dispatch(setKey('pagination', null));
            dispatch(setKey('search', null));
            
        }
        dispatch(setKey('loading', false));
    } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        dispatch(setUbereduxKey({ key: 'error', value: msg }));
        dispatch(setKey('loading', false));
    }
};
