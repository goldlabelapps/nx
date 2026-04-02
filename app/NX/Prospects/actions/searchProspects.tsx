import type { T_UbereduxDispatch, T_RootState } from '../../types';
import { setUbereduxKey } from '../../Uberedux';
import { setFeedback } from '../../DesignSystem';
import { setProspects } from '../../Prospects';

export const searchProspects = () => async (
    dispatch: T_UbereduxDispatch, 
    getState: () => T_RootState,
) => {
    dispatch(setProspects('searching', true));
    try {
        dispatch(setProspects('searching', true));
        const endpoint = `${process.env.NEXT_PUBLIC_NX_AI}prospects/search/?query=${encodeURIComponent(getState().redux.prospects?.query?.search)}`;
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
        dispatch(setProspects('searching', false));
    } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        dispatch(setUbereduxKey({ key: 'error', value: msg }));
        // dispatch(setFeedback({
        //     severity: 'error',
        //     title: 'searchProspects Exception',
        //     description: msg,
        // }));
        dispatch(setProspects('searching', false));
    }
};
