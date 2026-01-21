
import type { T_Dispatch } from '../../Uberedux';

export const setSomething =
  (setUbereduxKey: any) => (lang: string): any =>
    async (dispatch: T_Dispatch, getState: () => any) => {
      try {
        const current = getState().redux.lingua;
        const updated = {
          ...current,
          lang,
        };
        dispatch(setUbereduxKey({ key: 'lingua', value: updated }));
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        dispatch(setUbereduxKey({ key: 'error', value: msg }));
      }
    };
