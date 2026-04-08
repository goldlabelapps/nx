import type { T_UbereduxDispatch, T_RootState } from '../../types';
import { setUbereduxKey } from '../../Uberedux';

export const setProspects =
  (key: string, value: any): any =>
    async (dispatch: T_UbereduxDispatch, getState: () => T_RootState) => {
      try {
        const current = getState().redux.prospects;
        let updated;
        // Merge for bus, busLoading, busError
        if (["bus", "busLoading", "busError"].includes(key)) {
          updated = {
            ...current,
            [key]: { ...current?.[key], ...value },
          };
        } else {
          updated = {
            ...current,
            [key]: value,
          };
        }
        dispatch(setUbereduxKey({ key: 'prospects', value: updated }));
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        dispatch(setUbereduxKey({ key: 'error', value: msg }));
      }
    };
