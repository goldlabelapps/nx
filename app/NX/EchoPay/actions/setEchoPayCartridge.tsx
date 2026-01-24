import type { Dispatch } from 'redux';
import { setUbereduxKey, updateConfig } from '../../Uberedux';

export const setEchoPayCartridge =
    (key: string, value: any): any =>
        async (dispatch: Dispatch, getState: () => any) => {
            try {
                console.log("key:", key, "value:", value);
                // Replace with the correct config object
                dispatch(updateConfig({ config: { myConfigObject: 123 } }));
            } catch (e: unknown) {
                const msg = e instanceof Error ? e.message : String(e);
                dispatch(setUbereduxKey({ key: 'error', value: msg }));
            }
        };
