import {
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  type DocumentData,
  type DocumentReference,
  type Firestore,
  type Unsubscribe,
} from "firebase/firestore";

export const DEFAULT_VIRUS_COLLECTION = "fingerprints";
export const DEFAULT_FINGERPRINT_STORAGE_KEY = "nx.virus.fingerprint";

export type JsonLike =
  | string
  | number
  | boolean
  | null
  | JsonLike[]
  | { [key: string]: JsonLike };

export type VirusProfileObject = Record<string, JsonLike | unknown>;

export interface VirusFingerprintSignals {
  userAgent: string;
  language: string;
  languages: string[];
  platform: string;
  timezone: string;
  colorDepth: number;
  pixelRatio: number;
  screen: string;
  hardwareConcurrency: number;
  maxTouchPoints: number;
  doNotTrack: string;
}

export interface VirusFingerprintRecord {
  id: string;
  fingerprintId: string;
  createdAt?: unknown;
  updatedAt?: unknown;
  signals: VirusFingerprintSignals;
  traits: VirusProfileObject;
  founder: VirusProfileObject;
  meta: VirusProfileObject;
}

export interface CreateFingerprintIdOptions {
  visitorId?: string;
  forceRefresh?: boolean;
  storageKey?: string;
}

export interface RegisterFingerprintOptions {
  collectionName?: string;
  fingerprintId?: string;
  visitorId?: string;
  storageKey?: string;
  traits?: VirusProfileObject;
  founder?: VirusProfileObject;
  meta?: VirusProfileObject;
}

export interface SubscribeToFingerprintOptions {
  collectionName?: string;
}

export interface UpdateFingerprintOptions {
  collectionName?: string;
}

function inBrowser(): boolean {
  return typeof window !== "undefined";
}

function getSafeNavigator(): Navigator | undefined {
  if (!inBrowser()) return undefined;
  return window.navigator;
}

function getSafeScreen(): Screen | undefined {
  if (!inBrowser()) return undefined;
  return window.screen;
}

function getTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "unknown";
  } catch {
    return "unknown";
  }
}

export function collectFingerprintSignals(): VirusFingerprintSignals {
  const nav = getSafeNavigator();
  const scr = getSafeScreen();

  return {
    userAgent: nav?.userAgent ?? "unknown",
    language: nav?.language ?? "unknown",
    languages: nav?.languages ? [...nav.languages] : [],
    platform: nav?.platform ?? "unknown",
    timezone: getTimezone(),
    colorDepth: scr?.colorDepth ?? 0,
    pixelRatio: inBrowser() ? window.devicePixelRatio || 1 : 1,
    screen: scr ? `${scr.width}x${scr.height}` : "0x0",
    hardwareConcurrency: nav?.hardwareConcurrency ?? 0,
    maxTouchPoints: nav?.maxTouchPoints ?? 0,
    doNotTrack: nav?.doNotTrack ?? "unknown",
  };
}

function stableSerialize(value: unknown): string {
  if (value === null || typeof value !== "object") {
    return JSON.stringify(value);
  }

  if (Array.isArray(value)) {
    return `[${value.map((item) => stableSerialize(item)).join(",")}]`;
  }

  const entries = Object.entries(value as Record<string, unknown>).sort(([a], [b]) =>
    a.localeCompare(b),
  );
  const serialized = entries.map(([key, val]) => `${JSON.stringify(key)}:${stableSerialize(val)}`);
  return `{${serialized.join(",")}}`;
}

function fallbackHash(input: string): string {
  let hash = 2166136261;

  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash +=
      (hash << 1) +
      (hash << 4) +
      (hash << 7) +
      (hash << 8) +
      (hash << 24);
  }

  return Math.abs(hash >>> 0).toString(16).padStart(8, "0");
}

async function hashFingerprintInput(input: string): Promise<string> {
  if (typeof globalThis.crypto?.subtle !== "undefined") {
    const bytes = new TextEncoder().encode(input);
    const digest = await globalThis.crypto.subtle.digest("SHA-256", bytes);
    const hex = Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
    return hex;
  }

  return fallbackHash(input);
}

export async function createFingerprintId(options: CreateFingerprintIdOptions = {}): Promise<string> {
  const signals = collectFingerprintSignals();

  const payload = {
    visitorId: options.visitorId ?? "",
    signals,
  };

  const input = stableSerialize(payload);
  const digest = await hashFingerprintInput(input);
  return `vx_${digest.slice(0, 24)}`;
}

function readStoredFingerprint(storageKey: string): string {
  if (!inBrowser()) return "";

  try {
    return window.localStorage.getItem(storageKey) ?? "";
  } catch {
    return "";
  }
}

function writeStoredFingerprint(storageKey: string, fingerprintId: string): void {
  if (!inBrowser()) return;

  try {
    window.localStorage.setItem(storageKey, fingerprintId);
  } catch {
    // Ignore storage errors (private mode/quota); caller still receives generated ID.
  }
}

export async function getOrCreateFingerprintId(options: CreateFingerprintIdOptions = {}): Promise<string> {
  const storageKey = options.storageKey ?? DEFAULT_FINGERPRINT_STORAGE_KEY;

  if (!options.forceRefresh) {
    const existing = readStoredFingerprint(storageKey);
    if (existing) return existing;
  }

  const fingerprintId = await createFingerprintId(options);
  writeStoredFingerprint(storageKey, fingerprintId);
  return fingerprintId;
}

function getFingerprintRef(
  db: Firestore,
  fingerprintId: string,
  collectionName = DEFAULT_VIRUS_COLLECTION,
): DocumentReference<DocumentData> {
  return doc(db, collectionName, fingerprintId);
}

function normalizeRecord(
  fingerprintId: string,
  data?: DocumentData,
): VirusFingerprintRecord {
  return {
    id: fingerprintId,
    fingerprintId,
    createdAt: data?.createdAt,
    updatedAt: data?.updatedAt,
    signals: (data?.signals ?? collectFingerprintSignals()) as VirusFingerprintSignals,
    traits: (data?.traits ?? {}) as VirusProfileObject,
    founder: (data?.founder ?? {}) as VirusProfileObject,
    meta: (data?.meta ?? {}) as VirusProfileObject,
  };
}

export async function registerFingerprint(
  db: Firestore,
  options: RegisterFingerprintOptions = {},
): Promise<VirusFingerprintRecord> {
  const collectionName = options.collectionName ?? DEFAULT_VIRUS_COLLECTION;
  const fingerprintId =
    options.fingerprintId ??
    (await getOrCreateFingerprintId({
      visitorId: options.visitorId,
      storageKey: options.storageKey,
    }));

  const ref = getFingerprintRef(db, fingerprintId, collectionName);
  const signals = collectFingerprintSignals();

  await setDoc(
    ref,
    {
      fingerprintId,
      signals,
      traits: options.traits ?? {},
      founder: options.founder ?? {},
      meta: options.meta ?? {},
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );

  const snapshot = await getDoc(ref);
  return normalizeRecord(fingerprintId, snapshot.data());
}

export async function updateFingerprintTraits(
  db: Firestore,
  fingerprintId: string,
  traitsPatch: VirusProfileObject,
  options: UpdateFingerprintOptions = {},
): Promise<void> {
  const ref = getFingerprintRef(db, fingerprintId, options.collectionName);

  await setDoc(
    ref,
    {
      traits: traitsPatch,
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
}

export async function updateFingerprintFounderData(
  db: Firestore,
  fingerprintId: string,
  founderPatch: VirusProfileObject,
  options: UpdateFingerprintOptions = {},
): Promise<void> {
  const ref = getFingerprintRef(db, fingerprintId, options.collectionName);

  await setDoc(
    ref,
    {
      founder: founderPatch,
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
}

export function subscribeToFingerprint(
  db: Firestore,
  fingerprintId: string,
  onChange: (record: VirusFingerprintRecord | null) => void,
  options: SubscribeToFingerprintOptions = {},
): Unsubscribe {
  const ref = getFingerprintRef(db, fingerprintId, options.collectionName);

  return onSnapshot(ref, (snapshot) => {
    if (!snapshot.exists()) {
      onChange(null);
      return;
    }

    onChange(normalizeRecord(fingerprintId, snapshot.data()));
  });
}
