import type { Dispatch } from 'redux';
import { setUbereduxKey } from '../../Uberedux';

export const setEchoPayCartridge =
    (key: string, value: any): any =>
        async (dispatch: Dispatch, getState: () => any) => {
            try {
                console.log("key:", key, "value:", value);
                // Get the current config object
                const config = getState().redux.config || {};
                // Get the current cartridges object
                const cartridges = config.cartridges || {};
                // Get the current echopay cartridge
                const echopay = cartridges.echopay || {};
                // Update the echopay cartridge
                const updatedEchopay = {
                    ...echopay,
                    [key]: value,
                };
                // Update the cartridges object
                const updatedCartridges = {
                    ...cartridges,
                    echopay: updatedEchopay,
                };
                // Update the config object
                const updatedConfig = {
                    ...config,
                    cartridges: updatedCartridges,
                };
                // Dispatch the whole updated config
                dispatch(setUbereduxKey({ key: 'config', value: updatedConfig }));
            } catch (e: unknown) {
                const msg = e instanceof Error ? e.message : String(e);
                dispatch(setUbereduxKey({ key: 'error', value: msg }));
            }
        };
