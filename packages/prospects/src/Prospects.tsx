"use client";

import React, { useEffect } from "react";
import { useDispatch } from "@goldlabelapps/uberedux";
import { useProspects } from "./hooks/useProspects";
import { initProspects } from "./actions/init";
import { LiveDevice } from "./LiveDevice";

export interface ProspectsProps {
  title?: string;
  description?: string;
  className?: string;
  showDevOutput?: boolean;
  initialData?: Record<string, unknown>;
  mapboxToken?: string;
  mapboxStyle?: string;
}

/** @deprecated Use ProspectsProps */
export type PublicProspectProps = ProspectsProps;

export function Prospects({
  title = "",
  description: _description = "Here is your live device fingerprint",
  className = "",
  showDevOutput = true,
  initialData,
  mapboxToken,
  mapboxStyle,
}: ProspectsProps) {
  const dispatch = useDispatch();
  const { raw } = useProspects();

  useEffect(() => {
    dispatch(initProspects(initialData || { initializedAt: new Date().toISOString() }));
  }, [dispatch, initialData]);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Live Device Component */}
      <LiveDevice title={title} mapboxToken={mapboxToken} mapboxStyle={mapboxStyle} />

      {/* Dev Pre Output */}
      {showDevOutput && (
        <div className="rounded-xl border border-slate-200 bg-white p-4 font-mono text-xs text-slate-800 shadow-md overflow-hidden dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2 mb-3">
            <span className="font-bold text-indigo-600 dark:text-indigo-400">⚡ [DEV] Uberedux prospects State</span>
            <span className="text-slate-500">@goldlabelapps/prospects</span>
          </div>
          <pre className="max-h-96 overflow-auto whitespace-pre-wrap text-emerald-700 dark:text-emerald-400 bg-slate-50 dark:bg-slate-900/60 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
            {JSON.stringify(raw, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

/** @deprecated Use Prospects */
export const PublicProspect = Prospects;

export default Prospects;
