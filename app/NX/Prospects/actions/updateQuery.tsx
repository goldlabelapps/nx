import type { T_UbereduxDispatch, T_RootState } from '../../types';
import { setUbereduxKey } from '../../Uberedux';

export const updateQuery =
    (queryPart: Partial<Record<string, any>>): any =>
        async (dispatch: T_UbereduxDispatch, getState: () => T_RootState) => {
            try {
                const current = getState().redux.prospects;
                const prevQuery = current?.query || {};
                const updatedQuery = {
                    ...prevQuery,
                    ...queryPart,
                };
                const updated = {
                    ...current,
                    query: updatedQuery,
                };
                dispatch(setUbereduxKey({ key: 'prospects', value: updated }));
            } catch (e: unknown) {
                const msg = e instanceof Error ? e.message : String(e);
                dispatch(setUbereduxKey({ key: 'error', value: msg }));
            }
        };