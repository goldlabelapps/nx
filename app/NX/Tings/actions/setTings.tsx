import type { T_UbereduxDispatch, T_RootState } from '../../types';
import { setUbereduxKey } from '../../Uberedux';

export const setTings =
  (key: string, value: any): any =>
    async (dispatch: T_UbereduxDispatch, getState: () => T_RootState) => {
      try {
        const current = getState().redux.tings;
        const updated = {
          ...current,
          [key]: value,
        };
        dispatch(setUbereduxKey({ key: 'tings', value: updated }));
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        dispatch(setUbereduxKey({ key: 'error', value: msg }));
      }
    };
