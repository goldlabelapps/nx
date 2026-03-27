import type { T_UbereduxDispatch, T_RootState } from '../../types';
import { setUbereduxKey } from '../../Uberedux';
import { setFeedback } from '../../DesignSystem';
import { setProspects } from '../../Prospects';

export const fetchProspects = () => async (
    dispatch: T_UbereduxDispatch, 
    getState: () => T_RootState,
) => {
    try {
        const endpoint = `${process.env.NEXT_PUBLIC_NX_AI}prospects`;
        const res = await fetch(endpoint);
        const data = await res.json();
        if (data?.data){
            dispatch(setProspects('prospects', data.data));
        };
    } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        dispatch(setUbereduxKey({ key: 'error', value: msg }));
        dispatch(setFeedback({
            severity: 'error',
            title: 'Fetch Prospects Exception',
            description: msg,
        }));
    }
};
