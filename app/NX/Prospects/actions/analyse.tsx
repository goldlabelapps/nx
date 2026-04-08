import type { T_UbereduxDispatch } from '../../types';
import type { T_ApolloDoc } from '../types'
import { setUbereduxKey } from '../../Uberedux';
import { setProspects } from '../../Prospects';
import { stalkPrompt } from '../lib/prompts';

export const analyse = (
    prospect: T_ApolloDoc
) =>
    async (dispatch: T_UbereduxDispatch) => {
        try {
            const endpoint = `${process.env.NEXT_PUBLIC_PYTHON_URL}llm`;
            dispatch((dispatch, getState) => {
                const current = getState().redux.prospects?.isRating || {};
                dispatch(setProspects('isRating', { ...current, [prospect.id]: true }));
            });
            const prompt = stalkPrompt(prospect);
            const payload = {
                prospect_id: prospect.id,
                prompt,
            };
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            dispatch((dispatch, getState) => {
                const current = getState().redux.prospects?.ratings || {};
                dispatch(setProspects('ratings', { ...current, [prospect.id]: data }));
            });
            dispatch((dispatch, getState) => {
                const current = getState().redux.prospects?.isRating || {};
                const updated = { ...current };
                delete updated[prospect.id];
                dispatch(setProspects('isRating', updated));
            });

        } catch (e) {
            let msg = e instanceof Error ? e.message : String(e);
            if (msg === 'Failed to fetch') {
                const endpoint = `${process.env.NEXT_PUBLIC_PYTHON_URL}prompts`;
                msg = `Can't fetch endpoint ${endpoint}`;
            };
            dispatch((dispatch, getState) => {
                const current = getState().redux.prospects?.isRating || {};
                const updated = { ...current };
                delete updated[prospect.id];
                dispatch(setProspects('isRating', updated));
            });
            dispatch(setProspects('error', msg));
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
        }
    };
