import type { T_UbereduxDispatch } from '../../types';
import { setUbereduxKey } from '../../Uberedux';

export const initSoho = (): any =>
        async (dispatch: T_UbereduxDispatch, getState: () => any) => {
            try {
                console.log('initSoho');
                return;
            } catch (e: unknown) {
                const msg = e instanceof Error ? e.message : String(e);
                dispatch(setUbereduxKey({ key: 'error', value: msg }));
            }
        };
