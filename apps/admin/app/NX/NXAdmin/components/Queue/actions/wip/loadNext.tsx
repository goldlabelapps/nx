import type { Dispatch } from 'redux';
import { setUbereduxKey } from '../../../../../Uberedux';
import { setNXAdmin } from '../../../../../NXAdmin';
import { fetchPython } from './fetchPython';

export const loadNext = (): any =>
    async (dispatch: Dispatch, getState: () => any) => {
        try {
            // const { subscribedUser } = getState().redux.nxAdmin || {};
            console.log('loading Next...');
            const nxAdmin = getState()?.redux?.nxAdmin || {};
            if (!nxAdmin.queue) {
                // console.log('Initializing nxAdmin.queue as an object');
                await dispatch(setNXAdmin('queue', {}));
            }
            // Fetch health endpoint from Python API
            // await dispatch(fetchPython('/queue/next?collection=prospects&group=linkedin'));
            await dispatch(fetchPython('/queue/next'));
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
        }
    };
