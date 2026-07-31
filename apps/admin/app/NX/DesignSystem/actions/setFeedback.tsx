import type { T_Feedback, T_UbereduxDispatch } from '../../types';
import { setUbereduxKey } from '../../Uberedux';

export const setFeedback =
  (feedback: T_Feedback): any =>
    async (dispatch: T_UbereduxDispatch, getState: () => any) => {
      try {
        const current = getState().redux.designSystem;
        const updated = {
          ...current,
          feedback,
        };
        dispatch(setUbereduxKey({ key: 'designSystem', value: updated }));
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        dispatch(setUbereduxKey({ key: 'error', value: msg }));
      }
    };
