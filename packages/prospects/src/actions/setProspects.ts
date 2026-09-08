import { setUbereduxKey } from "@goldlabelapps/uberedux";
import { PROSPECTS_CARTRIDGE_KEY } from "../constants";

/**
 * Uberedux Cartridge Action: setProspects(key, value)
 * Follows standard Uberedux thunk pattern to update state.redux.prospects
 */
export const setProspects = (key: string, value: unknown) =>
  async (dispatch: (action: unknown) => unknown, getState: () => Record<string, unknown>) => {
    try {
      const state = getState() as { redux?: Record<string, Record<string, unknown>> } | undefined;
      const currentCartridgeState = state?.redux?.[PROSPECTS_CARTRIDGE_KEY] || {};
      const updatedCartridgeState = {
        ...currentCartridgeState,
        [key]: value,
      };

      dispatch(
        setUbereduxKey({
          key: PROSPECTS_CARTRIDGE_KEY,
          value: updatedCartridgeState,
        })
      );
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: "error", value: msg }));
    }
  };
