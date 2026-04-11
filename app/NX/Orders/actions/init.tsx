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
            dispatch(setKey('loadingOrders', true));
            const base = process.env.NEXT_PUBLIC_PYTHON_URL;
            const [
                health,
            ] = await Promise.all([
                fetchJson(`${base}health`),
            ]);
            dispatch(setKey('health', health));
            dispatch(setKey('loadingOrders', false));
        } catch (e) {
            let msg = e instanceof Error ? e.message : String(e);
            if (msg === 'Failed to fetch') {
                const base = process.env.NEXT_PUBLIC_PYTHON_URL;
                msg = `Can't reach Python at ${base}/health`;
            }
            dispatch(setKey('error', msg));
            dispatch(setKey('loadingOrders', false));
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
        }
    };
