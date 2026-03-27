import type { T_UbereduxDispatch, T_RootState } from '../../types';
import { setUbereduxKey } from '../../Uberedux';
import { setProspects, fetchProspects } from '../../Prospects';
import {setFeedback} from '../../DesignSystem';

export const initProspects = (): any =>
        async (dispatch: T_UbereduxDispatch, getState: () => T_RootState) => {
            try {

                const baseURL = process.env.NEXT_PUBLIC_NX_AI;
                dispatch(setProspects('baseURL', baseURL));
                dispatch(setProspects('message', `Checking ${baseURL}health`));

                const res = await fetch(`${baseURL}health`);
                let data;
                try {
                    data = await res.json();
                } catch (err) {
                    data = null;
                }

                const description = `Expected { status: 'ok' }, got: ${JSON.stringify(data)}`;
                if (!data || data.status !== 'ok') {
                    dispatch(setFeedback({
                        severity: 'error',
                        title: 'API Health Check Failed',
                        description,
                    }));
                    dispatch(setProspects('error', description));
                } else {
                    // dispatch(setFeedback({
                    //     severity: 'success',
                    //     title: `${baseURL}`,
                    //     description: 'API Healthy.',
                    // }));
                    // Healthcheck successful, now fetch prospects
                    dispatch(fetchProspects());
                }
                
                return;
            } catch (e: unknown) {
                let msg = e instanceof Error ? e.message : String(e);
                const baseURL = process.env.NEXT_PUBLIC_NX_AI;
                if (msg === 'Failed to fetch') {
                    msg = `Can't reach ${baseURL}. Check network & ensure the API server is running`;
                }
                dispatch(setProspects('error', `${msg}`));
                dispatch(setUbereduxKey({ key: 'error', value: `${msg}` }));
            }
        };
