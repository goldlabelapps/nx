import type { Dispatch } from 'redux';
import { setUbereduxKey } from '../../Uberedux';

export const clearTerminal = (): any =>
    async (dispatch: Dispatch, getState: () => any) => {
        try {
            // Get current echopay value from state
            const state = getState();
            const currentEchoPay = (state?.redux?.echopay) || {};
            // Clear all messages
            const updatedEchoPay = { ...currentEchoPay, message: [] };
            // Set the updated echopay object in Uberedux
            dispatch(setUbereduxKey({ key: 'echopay', value: updatedEchoPay }));
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
        }
    };
