import type { Dispatch } from 'redux';
import { setUbereduxKey } from '../../Uberedux';

export const avatarByUID = (
    action: 'create' | 'read' | 'update' | 'delete',
) =>
    async (dispatch: Dispatch, getState: () => any) => {
        try {
            console.log("avatarCRUD", action);
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
        }
    };
