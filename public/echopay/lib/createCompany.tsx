// createCompany
import { T_UbereduxDispatch, T_RootState } from '../../../app/NX/Uberedux/store';
import { setUbereduxKey } from '../../../app/NX/Uberedux';


export const createCompany =
    () => async (
        dispatch: T_UbereduxDispatch,
        getState: () => T_RootState,
    ) => {
        try {
            // const state = getState()?.redux ?? {};

            return {
                severity: 'warning',
                message: 'createCompany is not implemented yet',
            };
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
        }
    };
