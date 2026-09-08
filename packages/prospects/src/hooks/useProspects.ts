"use client";

import { useSlice } from "@goldlabelapps/uberedux";
import type { VirusFingerprintRecord } from "../types";
import { PROSPECTS_CARTRIDGE_KEY } from "../constants";

/** Custom hook following Uberedux pattern to select state.redux.prospects */
export function useProspects() {
  const reduxState = useSlice();
  const prospects = reduxState?.[PROSPECTS_CARTRIDGE_KEY] || {};

  return {
    fingerprint: (prospects.fingerprint as VirusFingerprintRecord | undefined) || null,
    status: prospects.status || { state: "idle", error: null },
    raw: prospects,
  };
}
