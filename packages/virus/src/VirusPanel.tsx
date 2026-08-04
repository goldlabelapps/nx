"use client";

import React from "react";
import type { Firestore } from "firebase/firestore";
import {
  DEFAULT_VIRUS_COLLECTION,
  getOrCreateFingerprintId,
  registerFingerprint,
  subscribeToFingerprint,
  type VirusFingerprintRecord,
  type VirusProfileObject,
} from "./index";

export interface VirusPanelProps {
  db: Firestore;
  title?: string;
  collectionName?: string;
  visitorId?: string;
  traits?: VirusProfileObject;
  meta?: VirusProfileObject;
  founderSeed?: VirusProfileObject;
  storageKey?: string;
}

function shortId(value: string): string {
  if (!value) return "";
  if (value.length <= 14) return value;
  return `${value.slice(0, 8)}...${value.slice(-6)}`;
}

function humanize(value: unknown): string {
  if (value === null || typeof value === "undefined") return "-";
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  try {
    return JSON.stringify(value);
  } catch {
    return "[unserializable]";
  }
}

export default function VirusPanel({
  db,
  title = "Virus fingerprint",
  collectionName = DEFAULT_VIRUS_COLLECTION,
  visitorId,
  traits,
  meta,
  founderSeed,
  storageKey,
}: VirusPanelProps) {
  const [fingerprintId, setFingerprintId] = React.useState("");
  const [record, setRecord] = React.useState<VirusFingerprintRecord | null>(null);
  const [isReady, setIsReady] = React.useState(false);
  const [error, setError] = React.useState<string>("");

  React.useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    let cancelled = false;

    (async () => {
      try {
        const id = await getOrCreateFingerprintId({ visitorId, storageKey });
        if (cancelled) return;

        setFingerprintId(id);

        const registered = await registerFingerprint(db, {
          collectionName,
          fingerprintId: id,
          visitorId,
          traits,
          founder: founderSeed,
          meta,
          storageKey,
        });

        if (cancelled) return;
        setRecord(registered);

        unsubscribe = subscribeToFingerprint(
          db,
          id,
          (nextRecord) => {
            if (cancelled) return;
            setRecord(nextRecord);
          },
          { collectionName },
        );
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        if (!cancelled) setIsReady(true);
      }
    })();

    return () => {
      cancelled = true;
      if (unsubscribe) unsubscribe();
    };
  }, [collectionName, db, founderSeed, meta, storageKey, traits, visitorId]);

  const signalPairs: Array<[string, unknown]> = record
    ? Object.entries(record.signals)
    : [];

  return (
    <section
      aria-label="Virus fingerprint panel"
      style={{
        border: "1px solid rgba(127,127,127,0.35)",
        borderRadius: 12,
        padding: 12,
        marginTop: 24,
        background: "rgba(255,255,255,0.7)",
        fontSize: 13,
      }}
    >
      <h3 style={{ margin: "0 0 8px", fontSize: 16 }}>{title}</h3>

      {!isReady ? <p style={{ margin: 0 }}>Connecting...</p> : null}
      {error ? <p style={{ margin: "4px 0", color: "#b00020" }}>{error}</p> : null}

      <p style={{ margin: "6px 0" }}>
        <strong>Fingerprint:</strong> {shortId(fingerprintId) || "-"}
      </p>
      <p style={{ margin: "6px 0" }}>
        <strong>Collection:</strong> {collectionName}
      </p>

      <details open>
        <summary>Founder data</summary>
        <pre style={{ margin: "8px 0 0", whiteSpace: "pre-wrap" }}>
          {humanize(record?.founder ?? {})}
        </pre>
      </details>

      <details>
        <summary>Traits</summary>
        <pre style={{ margin: "8px 0 0", whiteSpace: "pre-wrap" }}>
          {humanize(record?.traits ?? {})}
        </pre>
      </details>

      <details>
        <summary>Signals</summary>
        <div style={{ marginTop: 8 }}>
          {signalPairs.length ? (
            signalPairs.map(([key, value]) => (
              <p key={key} style={{ margin: "2px 0" }}>
                <strong>{key}:</strong> {humanize(value)}
              </p>
            ))
          ) : (
            <p style={{ margin: 0 }}>No signal data yet.</p>
          )}
        </div>
      </details>
    </section>
  );
}
