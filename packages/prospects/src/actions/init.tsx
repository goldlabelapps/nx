import { createFingerprintRecord } from "../fingerprint";
import { PROSPECTS_CARTRIDGE_KEY } from "../constants";
import { setProspectFingerprint } from "./setProspectFingerprint";
import { setProspectsStatus } from "./setProspectsStatus";
import { setProspects } from "./setProspects";

/**
 * Thunk action to initialize the Prospects device fingerprint and status in Redux.
 * Accepts optional extra initial data to store under state.redux.prospects.
 */
export const initProspects = (extraData?: Record<string, unknown>) => async (dispatch: (action: unknown) => unknown, getState: () => Record<string, unknown>) => {
  const state = getState() as { redux?: Record<string, Record<string, unknown>> } | undefined;
  const prospects = state?.redux?.[PROSPECTS_CARTRIDGE_KEY] || {};
  const fingerprint = prospects.fingerprint;
  const status = (prospects.status as { state?: string; error?: string | null }) || { state: "idle", error: null };

  if (fingerprint || status.state === "loading" || status.state === "ready") {
    return;
  }

  try {
    dispatch(setProspectsStatus("loading"));
    const record = await createFingerprintRecord();
    dispatch(setProspectFingerprint(record));

    if (extraData && typeof extraData === "object") {
      Object.entries(extraData).forEach(([key, val]) => {
        dispatch(setProspects(key, val));
      });
    }

    dispatch(setProspectsStatus("ready"));
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("[Prospects] Failed to initialize fingerprint:", err);
    dispatch(setProspectsStatus("error", errorMsg || "Fingerprint failed"));
  }
};
