import type { Dispatch } from 'redux';

export const setFlash =
    (key: string, value: any): any =>
        async (dispatch: Dispatch, getState: () => any) => {
            try {
                // Get current value from state
                const state = getState();
                const current = (state?.redux?.flash) || {};
                // Add/overwrite the incoming key-value pair
                const updated = { ...current, [key]: value };
                // Set the updated object in Uberedux
                dispatch({ type: 'redux/setUbereduxKey', payload: { key: 'flash', value: updated } } as any);
            } catch (e: unknown) {
                const msg = e instanceof Error ? e.message : String(e);
                dispatch({ type: 'redux/setUbereduxKey', payload: { key: 'error', value: msg } } as any);
            }
        };
