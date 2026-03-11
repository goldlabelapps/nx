import type { T_UbereduxDispatch } from '../../types';
import { setUbereduxKey } from '../../Uberedux';

export const setAsync =
  (key: string, value: any): any =>
    async (dispatch: T_UbereduxDispatch, getState: () => any) => {
      try {
        const current = getState().redux.async;
        const updated = {
          ...current,
          [key]: value,
        };
        dispatch(setUbereduxKey({ key: 'async', value: updated }));
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        dispatch(setUbereduxKey({ key: 'error', value: msg }));
      }
    };
