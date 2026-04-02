import type { T_UbereduxDispatch } from '../../types';
import { setUbereduxKey } from '../../Uberedux';
import { setProspects } from '../../Prospects';

export const sendPrompt = (prompt: string) =>
    async (dispatch: T_UbereduxDispatch) => {
        try {
            const endpoint = `${process.env.NEXT_PUBLIC_NX_AI}prompts`;
            console.log('Sending prompt to:', endpoint);
        } catch (e) {
            let msg = e instanceof Error ? e.message : String(e);
            if (msg === 'Failed to fetch') {
                const base = process.env.NEXT_PUBLIC_NX_AI;
                msg = `Can't reach NX-AI at ${base}`;
            }
            dispatch(setProspects('error', msg));
            dispatch(setProspects('completion', false));
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
        }
    };
