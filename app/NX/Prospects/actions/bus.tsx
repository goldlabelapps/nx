// fetchAI
import type { T_UbereduxDispatch, T_RootState } from '../../types';
import { setUbereduxKey } from '../../Uberedux';

export const bus = (id: number | string, forceReload = false): any =>
    async (dispatch: T_UbereduxDispatch, getState: () => T_RootState) => {
        try {
            const current = getState().redux.prospects.bus?.[id];
            if (current && !forceReload) return; // Already loaded and not forcing reload

            dispatch(setUbereduxKey({ key: `prospects.bus.${id}_loading`, value: true }));
            const endpoint = `${process.env.NEXT_PUBLIC_PYTHON_URL}llm/?prospect_id=${id}`;
            // console.log('endpoint', endpoint);
            const res = await fetch(endpoint);
            if (!res.ok) throw new Error(`Failed to fetch LLM data: ${res.status}`);
            const data = await res.json();
            dispatch(setUbereduxKey({ key: `prospects.bus.${id}`, value: data.data }));
            dispatch(setUbereduxKey({ key: `prospects.bus.${id}_loading`, value: false }));
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
            dispatch(setUbereduxKey({ key: `prospects.bus.${id}_loading`, value: false }));
        }
    };