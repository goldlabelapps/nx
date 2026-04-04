
import type { T_UbereduxDispatch } from '../../types';
import type { T_ApolloDoc } from '../types'
import { setUbereduxKey } from '../../Uberedux';
import { setProspects } from '../../Prospects';
import { stalkPrompt } from '../lib/prompts';

export const rateProspect = (
    prospect: T_ApolloDoc
) =>
    async (dispatch: T_UbereduxDispatch) => {
        try {
            const endpoint = `${process.env.NEXT_PUBLIC_NX_AI}llm`;

            dispatch(setProspects('ratingProspect', true));
            const prompt = stalkPrompt(prospect);
            const payload = {
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
            dispatch(setProspects('rating', data));
            dispatch(setProspects('ratingProspect', false));

        } catch (e) {
            let msg = e instanceof Error ? e.message : String(e);
            if (msg === 'Failed to fetch') {
                const endpoint = `${process.env.NEXT_PUBLIC_NX_AI}prompts`;
                msg = `Can't fetch endpoint ${endpoint}`;
            }
            dispatch(setProspects('error', msg));
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
        }
    };
