import type { T_UbereduxDispatch } from '../../types';
import { setUbereduxKey } from '../../Uberedux';
import { setProspects } from '../../Prospects';

// Helper for fetch+json with error handling
async function fetchJson(endpoint: string) {
    const res = await fetch(endpoint);
    if (!res.ok) throw new Error(`Failed to fetch: ${endpoint}`);
    return res.json().catch(() => null);
}

export const initProspects = () =>
    async (dispatch: T_UbereduxDispatch) => {
        dispatch(setProspects('loading', true));
        try {
            const base = process.env.NEXT_PUBLIC_NX_AI;
            const [
                initial, 
                // data,
            ] = await Promise.all([
                fetchJson(`${base}prospects/init`),
                // fetchJson(`${base}prospects/read`)
            ]);
            dispatch(setProspects('initialData', initial?.data));
            // dispatch(setProspects('results', data?.data));
            dispatch(setProspects('loading', false));
        } catch (e) {
            let msg = e instanceof Error ? e.message : String(e);
            if (msg === 'Failed to fetch') {
                msg = `Can't reach NX-AI.`;
            }
            dispatch(setProspects('error', msg));
            dispatch(setProspects('loading', false));
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
        }
    };
