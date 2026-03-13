import type { T_UbereduxDispatch } from '../../types';
import { setUbereduxKey } from '../../Uberedux';

export const setTing =
  (key: string, value: any): any =>
    async (dispatch: T_UbereduxDispatch, getState: () => any) => {
      try {
        const current = getState().redux.async;
        const currentTing = current.ting || {};
        const updatedTing = {
          ...currentTing,
          [key]: value,
        };
        const updated = {
          ...current,
          ting: updatedTing,
        };
        dispatch(setUbereduxKey({ key: 'async', value: updated }));
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        dispatch(setUbereduxKey({ key: 'error', value: msg }));
      }
    };
