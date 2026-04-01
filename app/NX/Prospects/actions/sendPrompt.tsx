import type { T_UbereduxDispatch } from '../../types';
import { setUbereduxKey } from '../../Uberedux';
import { setProspects } from '../../Prospects';

// Helper for fetch+json with error handling
async function fetchJson(endpoint: string) {
    const res = await fetch(endpoint);
    if (!res.ok) throw new Error(`Failed to fetch: ${endpoint}`);
    return res.json().catch(() => null);
}

export const sendPrompt = (prompt: string) =>
    async (dispatch: T_UbereduxDispatch) => {
        dispatch(setProspects('completion', false));
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
            dispatch(setProspects('completion', true));
        } catch (e) {
            let msg = e instanceof Error ? e.message : String(e);
            if (msg === 'Failed to fetch') {
                const base = process.env.NEXT_PUBLIC_NX_AI;
                msg = `Can't reach NX-AI at ${base}`;
            }
            dispatch(setProspects('error', msg));
            dispatch(setProspects('completion', false));
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
        }
    };
