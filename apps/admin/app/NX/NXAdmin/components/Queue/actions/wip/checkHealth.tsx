import type { Dispatch } from 'redux';
import { setUbereduxKey } from '../../../../../Uberedux';
import { setNXAdmin } from '../../../../../NXAdmin';
import { fetchPython } from './fetchPython';

export const checkHealth = (): any =>
    async (dispatch: Dispatch, getState: () => any) => {
        try {
            // const { subscribedUser } = getState().redux.nxAdmin || {};
            // console.log('checking Health...');
            const nxAdmin = getState()?.redux?.nxAdmin || {};
            if (!nxAdmin.queue) {
                // console.log('Initializing nxAdmin.queue as an object');
                await dispatch(setNXAdmin('checkingHealth', true));
                await dispatch(setNXAdmin('queue', {}));
            }
            // Fetch health endpoint from Python API
            await dispatch(fetchPython('/health'));
            await dispatch(setNXAdmin('checkingHealth', false));
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
        }
    };
