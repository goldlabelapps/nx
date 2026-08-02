import type { Dispatch } from 'redux';
import { setUbereduxKey } from '@nx/uberedux';
import { setNXAdmin } from '../../../../NXAdmin';

export const initDash = (): any =>
    async (dispatch: Dispatch, getState: () => any) => {
        try {
            const nxAdmin = getState()?.redux?.nxAdmin || {};
            if (!nxAdmin.dash) await dispatch(setNXAdmin('dash', {
                title: 'Dashboard',
                hero: 'accounts',
                panels: [
                    'account',
                    'accounts',
                    'queue',
                ],
            }));
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
        }
    };