
import type { T_UbereduxDispatch } from '../../types';
import type { T_ApolloDoc } from '../types'
import { setUbereduxKey } from '../../Uberedux';
import { setProspects } from '../../Prospects';

export const rateProspect = (
    prospect: T_ApolloDoc
) =>
    async (dispatch: T_UbereduxDispatch) => {
        try {
            const endpoint = `${process.env.NEXT_PUBLIC_NX_AI}prompts`;
            console.log('Sending prompt to:', endpoint);
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
