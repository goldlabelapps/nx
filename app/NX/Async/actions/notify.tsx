import type { T_UbereduxDispatch } from '../../types';
import { setUbereduxKey } from '../../Uberedux';
import { setTing, setAsync } from '../../Async';

export type T_NotifyEmail = {
    to: {
        name: string;
        email: string;
    };
    from: {
        name: string;
    };
    subject: string;
    body: string;
    data?: any;
};

export const notify = (
    notifyEmail: T_NotifyEmail,
): any =>
    async (dispatch: T_UbereduxDispatch, getState: () => any) => {
        try {
            console.log('notifyEmail', notifyEmail);
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
        }
    };