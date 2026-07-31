import type { Dispatch } from 'redux';
import { setUbereduxKey } from '../../../../Uberedux';
import { setNXAdmin } from '../../../../NXAdmin';
import { fetchQueue, setQueue } from '../';

export const initQueue = (): any =>
    async (dispatch: Dispatch, getState: () => any) => {
        try {
            const nxAdmin = getState()?.redux?.nxAdmin || {};
            if (!nxAdmin.queue) {
                await dispatch(setNXAdmin('queue', { autoqueue: true }));
            } else if (
                nxAdmin.queue?.autoqueue == null
                && nxAdmin.queue?.autoQueue == null
                && nxAdmin.queue?.auto_queue == null
            ) {
                await dispatch(setQueue('autoqueue', true));
            }
            await dispatch(fetchQueue());
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
        }
    };
