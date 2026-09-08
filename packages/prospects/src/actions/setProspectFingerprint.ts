import type { VirusFingerprintRecord } from "../types";
import { setProspects } from "./setProspects";

/** Thunk action to save the initialized fingerprint record into state.redux.prospects.fingerprint */
export const setProspectFingerprint = (record: VirusFingerprintRecord) =>
  setProspects("fingerprint", record);
