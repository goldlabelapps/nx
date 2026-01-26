import type { Dispatch } from 'redux';
import { setUbereduxKey } from '../../Uberedux';



export const addTerminalMessage = (message: string): any =>
    async (dispatch: Dispatch, getState: () => any) => {
        try {
            // Get current echopay value from state
            const state = getState();
            const currentEchoPay = (state?.redux?.echopay) || {};
            // Ensure messages is an array
            const prevMessages = Array.isArray(currentEchoPay.message)
                ? currentEchoPay.message
                : currentEchoPay.message
                    ? [String(currentEchoPay.message)]
                    : [];


            // Remove the word 'button' from the message
            const cleanedMessage = message.replace(/button/gi, '').replace(/\s+/g, ' ').trim();
            // Just add the cleaned message (no time)
            const updatedMessages = [...prevMessages, cleanedMessage];
            const updatedEchoPay = { ...currentEchoPay, message: updatedMessages };
            // Set the updated echopay object in Uberedux
            dispatch(setUbereduxKey({ key: 'echopay', value: updatedEchoPay }));
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
        }
    };
