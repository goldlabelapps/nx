"use client";

import React from "react";
import type { Firestore } from "firebase/firestore";
import { Alert, Card, Heading, List, ListItem, ListItemText } from "@nx/design-system";
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
    <Card padding="md" variant="paper">
      <section aria-label="Virus fingerprint card">
        <Heading as="h3" variant="h4">
          {title}
        </Heading>

        {!isReady ? (
          <List disablePadding dense>
            <ListItem disablePadding>
              <ListItemText primary="Connecting..." />
            </ListItem>
          </List>
        ) : null}

        {error ? (
          <Alert severity="error" title="Fingerprint sync failed">
            {error}
          </Alert>
        ) : null}

        <List disablePadding>
          <ListItem disablePadding>
            <ListItemText primary="Fingerprint" secondary={shortId(fingerprintId) || "-"} />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary="Collection" secondary={collectionName} />
          </ListItem>
        </List>

        <Heading as="h6" variant="h6" sx={{ mt: 1.5 }}>
          Founder data
        </Heading>
        <List disablePadding dense>
          <ListItem disablePadding>
            <ListItemText
              secondary={humanize(record?.founder ?? {})}
              secondaryTypographyProps={{
                sx: {
                  m: 0,
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                  whiteSpace: "pre-wrap",
                  overflowWrap: "anywhere",
                },
              }}
            />
          </ListItem>
        </List>

        <Heading as="h6" variant="h6" sx={{ mt: 1.5 }}>
          Traits
        </Heading>
        <List disablePadding dense>
          <ListItem disablePadding>
            <ListItemText
              secondary={humanize(record?.traits ?? {})}
              secondaryTypographyProps={{
                sx: {
                  m: 0,
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                  whiteSpace: "pre-wrap",
                  overflowWrap: "anywhere",
                },
              }}
            />
          </ListItem>
        </List>

        <Heading as="h6" variant="h6" sx={{ mt: 1.5 }}>
          Signals
        </Heading>
        <List disablePadding dense>
          {signalPairs.length ? (
            signalPairs.map(([key, value]) => (
              <ListItem key={key} disablePadding>
                <ListItemText primary={key} secondary={humanize(value)} />
              </ListItem>
            ))
          ) : (
            <ListItem disablePadding>
              <ListItemText primary="No signal data yet." />
            </ListItem>
          )}
        </List>
      </section>
    </Card>
  );
}
