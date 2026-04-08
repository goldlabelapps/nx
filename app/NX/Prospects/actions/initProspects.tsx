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
            const base = process.env.NEXT_PUBLIC_PYTHON_URL;
            const [
                health,
            ] = await Promise.all([
                fetchJson(`${base}health`),
                // fetchJson(`${base}prospects/`)
            ]);
            dispatch(setProspects('health', health?.data));
            dispatch(setProspects('loading', false));
        } catch (e) {
            let msg = e instanceof Error ? e.message : String(e);
            if (msg === 'Failed to fetch') {
                const base = process.env.NEXT_PUBLIC_PYTHON_URL;
                msg = `Can't reach Python at ${base}/health`;
            }
            dispatch(setProspects('error', msg));
            dispatch(setProspects('loading', false));
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
        }
    };
