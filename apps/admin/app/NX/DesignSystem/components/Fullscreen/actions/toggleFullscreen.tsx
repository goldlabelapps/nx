import type { T_Feedback, T_UbereduxDispatch } from '../../../../types';
import { setUbereduxKey } from '../../../../Uberedux';
import { setDesignSystem } from '../../../../DesignSystem';

export const toggleFullscreen =
  (fullscreen: boolean): any =>
    async (dispatch: T_UbereduxDispatch, getState: () => any) => {
      try {
        dispatch(setDesignSystem('fullscreen', fullscreen));
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        dispatch(setUbereduxKey({ key: 'error', value: msg }));
      }
    };
