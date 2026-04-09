import type { T_UbereduxDispatch } from '../../types';
import type { I_Prospect } from '../types'
import { setUbereduxKey } from '../../Uberedux';
import { setProspects, bus } from '../../Prospects';
import { setFeedback } from '../../DesignSystem';
import { stalkPrompt } from '../lib/prompts';

export const analyse = (prospect: I_Prospect) =>
    async (dispatch: T_UbereduxDispatch) => {
        try {
            const endpoint = `${process.env.NEXT_PUBLIC_PYTHON_URL}llm`;
            dispatch((dispatch, getState) => {
                const current = getState().redux.prospects?.isRating || {};
                dispatch(setProspects('isRating', { ...current, [prospect.id]: true }));
            });
            const prompt = stalkPrompt({
                first_name: prospect.first_name || '',
                last_name: prospect.last_name || '',
                person_linkedin_url: prospect.linkedin || '',
                title: prospect.title || '',
                company_name: prospect.company || '',
                seniority: prospect.seniority || '',
                sub_departments: prospect.department || '',
                country: prospect.country || '',
                primary_intent_topic: (prospect as any).primary_intent_topic || '',
                primary_intent_score: (prospect as any).primary_intent_score || '',
                secondary_intent_topic: (prospect as any).secondary_intent_topic || '',
                secondary_intent_score: (prospect as any).secondary_intent_score || '',
            });
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
            dispatch(setFeedback({
                severity: 'success',
                title: `Analysed ${prospect.first_name} ${prospect.last_name}`,
            }));
            dispatch((dispatch, getState) => {
                const current = getState().redux.prospects?.isRating || {};
                const updated = { ...current };
                delete updated[prospect.id];
                dispatch(setProspects('isRating', updated));
            });
            dispatch(bus(prospect.id, true)); // Force reload of bus data to get latest analysis
        } catch (e) {
            let msg = e instanceof Error ? e.message : String(e);
            if (msg === 'Failed to fetch') {
                const endpoint = `${process.env.NEXT_PUBLIC_PYTHON_URL}prompts`;
                msg = `Can't fetch endpoint ${endpoint}`;
            }
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
