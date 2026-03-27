import type { T_UbereduxDispatch, T_RootState } from '../../types';
import { setUbereduxKey } from '../../Uberedux';
import { 
    setProspects, 
    // fetchProspects,
} from '../../Prospects';
// import {setFeedback} from '../../DesignSystem';

export const initProspects = (): any =>
        async (dispatch: T_UbereduxDispatch, getState: () => T_RootState) => {
            try {

                const endpoint = `${process.env.NEXT_PUBLIC_NX_AI}prospects/init`;
                dispatch(setProspects('loading', true));
                dispatch(setProspects('endpoint', endpoint));
                
                const res = await fetch(endpoint);
                let data;
                try {
                    data = await res.json();
                } catch (err) {
                    data = null;
                }
                dispatch(setProspects('initialData', data?.data));
                dispatch(setProspects('loading', false));

                return;

            } catch (e: unknown) {
                // const endpoint = `${process.env.NEXT_PUBLIC_NX_AI}prospects/init`;
                let msg = e instanceof Error ? e.message : String(e);
                const baseURL = process.env.NEXT_PUBLIC_NX_AI;
                if (msg === 'Failed to fetch') {
                    msg = `Can't reach ${baseURL}. Check network & ensure the API server is running`;
                }
                dispatch(setProspects('error', `${msg}`));
                dispatch(setProspects('loading', false)); 
                // dispatch(setFeedback({
                //     severity: 'error',
                //     title: `${endpoint}`,
                //     description: msg,
                // }));
                dispatch(setUbereduxKey({ key: 'error', value: `${msg}` }));
            }
        };
