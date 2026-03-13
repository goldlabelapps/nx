import type { T_UbereduxDispatch } from '../../types';
import { setUbereduxKey } from '../../Uberedux';
import { setTing, setAsync } from '../../Async';
// import { setFeedback, useFeedback } from '../../DesignSystem';
// import { militaryTime } from '../../lib';

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
            const current = getState().redux.async.ting.messages || [];
            const updatedMessages = [...current, message];
            console.log('updatedMessages', updatedMessages);
            dispatch(setTing('messages', updatedMessages));
            dispatch(setAsync('dialogOpen', true));

        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
        }
    };