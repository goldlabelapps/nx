import type { Dispatch } from 'redux';
import { setUbereduxKey } from '../../../../Uberedux';
import { setFeedback } from '../../../../DesignSystem';
import { setQueue } from '../';

export const fetchQueue = (): any =>
    async (dispatch: Dispatch, getState: () => any) => {
        try {
            await dispatch(setQueue('error', null));
            await dispatch(setQueue('queueFetchedOnce', false));
            await dispatch(setQueue('queueFetchSucceeded', false));
            const baseUrl = process.env.NEXT_PUBLIC_PYTHON_URL || 'http://localhost:8000';
            const endpoint = `${baseUrl.replace(/\/$/, '')}/queue`;
            console.log(`Fetching queue from ${endpoint}`);
            await dispatch(setQueue('fetching', true));
            const response = await fetch(endpoint);
            if (!response.ok) {
                throw new Error(`Python° dependency error ${response.statusText}`);
            }
            const data = await response.json();
            await dispatch(setQueue('table', data.data));
            await dispatch(setQueue('queueFetchedOnce', true));
            await dispatch(setQueue('queueFetchSucceeded', true));
            await dispatch(setQueue('fetching', false));
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            const baseUrl = process.env.NEXT_PUBLIC_PYTHON_URL || 'unknown';
            await dispatch(setQueue('error', `${baseUrl}`));
            await dispatch(setQueue('queueFetchedOnce', true));
            await dispatch(setQueue('queueFetchSucceeded', false));
            await dispatch(setQueue('fetching', false));
        }
    };