import type { T_UbereduxDispatch, T_RootState } from '../../types';
import { setUbereduxKey } from '../../Uberedux';
import { setOrders, fetchProducts } from '../../Orders';
import {setFeedback} from '../../DesignSystem';

export const initOrders = (): any =>
        async (dispatch: T_UbereduxDispatch, getState: () => T_RootState) => {
            try {

                const baseURL = process.env.NEXT_PUBLIC_NX_AI;
                dispatch(setOrders('baseURL', baseURL));
                dispatch(setOrders('message', `Checking ${baseURL}health`));

                // Fetch the health endpoint
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
                    dispatch(setOrders('error', description));
                } else {
                    dispatch(setFeedback({
                        severity: 'success',
                        title: `${baseURL}`,
                        description: 'API Healthy.',
                    }));
                    // Healthcheck successful, now fetch products
                    dispatch(fetchProducts());
                }

                return;
            } catch (e: unknown) {
                let msg = e instanceof Error ? e.message : String(e);
                const baseURL = process.env.NEXT_PUBLIC_NX_AI;
                if (msg === 'Failed to fetch') {
                    msg = `Unable to reach the API at ${baseURL}. Please check your network connection and ensure the API server is running.`;
                }
                dispatch(setOrders('error', `${msg}`));
                dispatch(setUbereduxKey({ key: 'error', value: `${msg}` }));
            }
        };
