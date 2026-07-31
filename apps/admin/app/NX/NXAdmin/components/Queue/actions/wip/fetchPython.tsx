import type { Dispatch } from 'redux';
import { setUbereduxKey } from '../../../../../Uberedux';
import { setFeedback } from '../../../../../DesignSystem';

export const fetchPython = (endpoint: string): any =>
    async (dispatch: Dispatch, getState: () => any) => {
        const loadingKey = `nxAdmin.queue.loadingBus.${endpoint}`;
        const dataKey = `nxAdmin.queue.pythonData.${endpoint}`;
        const errorKey = `nxAdmin.queue.pythonError.${endpoint}`;
        const lastFetchedKey = `nxAdmin.queue.pythonLastFetched.${endpoint}`;
        try {
            dispatch(setUbereduxKey({ key: loadingKey, value: { loading: true, error: null } }));
            dispatch(setUbereduxKey({ key: errorKey, value: null }));
            const baseUrl = process.env.NEXT_PUBLIC_PYTHON_URL || '';
            const url = `${baseUrl.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;
            const response = await fetch(url);
            if (!response.ok) {
                const errorMsg = `Error fetching ${endpoint}: ${response.statusText}`;
                dispatch(setUbereduxKey({ key: loadingKey, value: { loading: false, error: errorMsg } }));
                dispatch(setUbereduxKey({ key: errorKey, value: errorMsg }));
                return;
            }
            const data = await response.json();
            dispatch(setUbereduxKey({ key: dataKey, value: data }));
            dispatch(setUbereduxKey({ key: loadingKey, value: { loading: false, error: null } }));
            dispatch(setUbereduxKey({ key: lastFetchedKey, value: Date.now() }));
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            // dispatch(setFeedback({
            //     title: `Python° error`,
            //     description: msg,
            //     severity: 'info',
            // }))
            dispatch(setUbereduxKey({ key: loadingKey, value: { loading: false, error: msg } }));
            dispatch(setUbereduxKey({ key: errorKey, value: msg }));
        }
    };