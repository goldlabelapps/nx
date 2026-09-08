import { setProspects } from "./setProspects";

/** Thunk action to set tracker status into state.redux.prospects.status */
export const setProspectsStatus = (
  status: "idle" | "loading" | "ready" | "error",
  error?: string
) => setProspects("status", { state: status, error: error || null });
