import type { T_UbereduxDispatch } from '../../types';
import type {T_NotifyEmail} from './notify';
import { setUbereduxKey } from '../../Uberedux';
import { 
    setTing, 
    setAsync,
    notify,
} from '../../Async';

export type T_Message = {
    to: string;
    message: string;
    avatar: string;
    align: 'left' | 'right';
};

export const sendMessage = (
    message: T_Message,
): any =>
    async (dispatch: T_UbereduxDispatch, getState: () => any) => {
        try {
            const {ting} = getState().redux.async || [];
            const current = ting || [];
            const updatedMessages = [...current, message];
            const {name} = ting;
            //console.log('updatedMessages', updatedMessages);
            dispatch(setTing('messages', updatedMessages));
            dispatch(setAsync('dialogOpen', true));
            const notifyEmail: T_NotifyEmail = {
                from: {
                    name,
                },
                to: {
                    name: 'Tenant owner',
                    email: 'listingslab@gmail.com',
                },
                subject: 'New Message',
                body: message.message,
            };
            // console.log('notifyEmail', notifyEmail);
            dispatch(notify(notifyEmail));
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
        }
    };