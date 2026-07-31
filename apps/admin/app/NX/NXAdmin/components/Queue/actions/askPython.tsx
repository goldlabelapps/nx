import type { Dispatch } from 'redux';
import { setUbereduxKey } from '../../../../Uberedux';
import { setFeedback } from '../../../../DesignSystem';
import { setQueue } from '../';

export const toSafePromptString = (prompt: string) =>
    prompt.replace(/\r\n/g, '\n').trim();

export const askPython = (prompt: string): any =>
    async (dispatch: Dispatch, getState: () => any) => {
        try {
            await dispatch(setQueue('error', null));
            await dispatch(setQueue('pythonResponse', null));
            const baseUrl = process.env.NEXT_PUBLIC_PYTHON_URL || 'http://localhost:8000';
            const endpoint = `${baseUrl.replace(/\/$/, '')}/prompt`;
            const safePrompt = toSafePromptString(prompt);
            await dispatch(setQueue('fetching', true));
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: safePrompt }),
            });
            if (!response.ok) {
                throw new Error(`Python° error ${response.statusText}`);
            }
            const data = await response.json();
            await dispatch(setQueue('pythonResponse', data));
            // Keep queue.table intact; /prompt responses are not queue records.
            await dispatch(setQueue('fetching', false));
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            dispatch(setFeedback({
                title: `Python° error`,
                description: msg,
                severity: 'error',
            }));
            await dispatch(setQueue('error', msg));
            await dispatch(setQueue('fetching', false));
        }
    };