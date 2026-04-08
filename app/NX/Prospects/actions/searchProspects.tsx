import type { T_UbereduxDispatch, T_RootState } from '../../types';
import { setUbereduxKey } from '../../Uberedux';
import { setFeedback } from '../../DesignSystem';
import { setProspects } from '../../Prospects';

export const searchProspects = () => async (
    dispatch: T_UbereduxDispatch, 
    getState: () => T_RootState,
) => {
    try {
        dispatch(setProspects('loading', true));
        const hideFlagged = true; // Set to true to hide flagged prospects
        const state = getState().redux.prospects;
        const page = state?.query?.page || 1;
        const limit = state?.query?.limit || 100;
        const endpoint = `${process.env.NEXT_PUBLIC_PYTHON_URL}prospects?page=${page}&limit=${limit}&hideflagged=${hideFlagged}`;
        // console.log('Fetching prospects with endpoint:', endpoint);
        const res = await fetch(endpoint);
        if (!res.ok) throw new Error(`Failed to fetch: ${endpoint}`);
        const data = await res.json();
        if (data?.data) {
            dispatch(setProspects('results', data.data));
            dispatch(setProspects('pagination', data.pagination));
        } else {
            dispatch(setProspects('results', []));
            dispatch(setProspects('pagination', null));
        }
        dispatch(setProspects('loading', false));
    } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        dispatch(setUbereduxKey({ key: 'error', value: msg }));
        dispatch(setProspects('loading', false));
    }
};
