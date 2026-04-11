import type { T_UbereduxDispatch } from '../../types';
import { setUbereduxKey } from '../../Uberedux';
import { setKey } from '../../Orders';

async function fetchJson(endpoint: string) {
    const res = await fetch(endpoint);
    if (!res.ok) throw new Error(`Failed to fetch: ${endpoint}`);
    let data = null;
    try {
        data = await res.json();
    } catch {
        data = null;
    }
    // console.log('fetchJson data:', data);
    return data;
}

export const init = () =>
    async (dispatch: T_UbereduxDispatch) => {
        try {
            dispatch(setKey('loading', true));
            // set default search params from search.tsx
            // import { defaultOrderSearchParams } from './search';
            // (import at top required)
            const { defaultOrderSearchParams } = await import('./search');
            dispatch(setKey('searchParams', defaultOrderSearchParams));

            // check the api health
            const base = process.env.NEXT_PUBLIC_PYTHON_URL;
            const [health] = await Promise.all([
                fetchJson(`${base}health`),
            ]);
            dispatch(setKey('health', health));
            if (health && health.status === 'ok') {
                // Only dispatch search if health is ok
                const { search } = await import('./search');
                dispatch(search());
                dispatch(setKey('loading', false));
            } else {
                const msg = 'Health check failed: status not ok';
                dispatch(setKey('error', msg));
                dispatch(setUbereduxKey({ key: 'error', value: msg }));
                dispatch(setKey('loading', false));
            }
            dispatch(setKey('initted', true));
        } catch (e) {
            let msg = e instanceof Error ? e.message : String(e);
            if (msg === 'Failed to fetch') {
                const base = process.env.NEXT_PUBLIC_PYTHON_URL;
                msg = `Python endpoint unhealthy ${base}health`;
            }
            dispatch(setKey('error', msg));
            dispatch(setKey('loading', false));
            dispatch(setKey('initted', true));
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
        }
    };
