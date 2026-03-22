import type { T_UbereduxDispatch, T_RootState } from '../../types';
import { setUbereduxKey } from '../../Uberedux';
import { setOrders } from '../../Orders';

export const initOrders = (): any =>
        async (dispatch: T_UbereduxDispatch, getState: () => T_RootState) => {
            try {
                const baseURL = process.env.NEXT_PUBLIC_NX_AI;
                dispatch(setOrders('baseURL', baseURL));
                dispatch(setOrders('message', `Checking ${baseURL}health`));
                return;
            } catch (e: unknown) {
                const msg = e instanceof Error ? e.message : String(e);
                dispatch(setUbereduxKey({ key: 'error', value: msg }));
            }
        };
