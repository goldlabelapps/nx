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
import type {
  CreateFingerprintIdOptions,
  FetchVirusGeoOptions,
  JsonLike,
  RegisterFingerprintOptions,
  SubscribeToFingerprintOptions,
  UpdateFingerprintOptions,
  VirusDeviceInfo,
  VirusFingerprintRecord,
  VirusFingerprintSignals,
  VirusGeoRecord,
  VirusProfileObject,
} from "../types";
import { randomIdentityProfile } from "./randomIdentity";

export const DEFAULT_VIRUS_COLLECTION = "fingerprints";
export const DEFAULT_FINGERPRINT_STORAGE_KEY = "nx.virus.fingerprint";
export const DEFAULT_GEO_ENDPOINT = "https://api.ipgeolocation.io/ipgeo";

type FingerprintAgent = {
  get: () => Promise<{ visitorId: string }>;
};

let fingerprintAgentPromise: Promise<FingerprintAgent> | null = null;

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

function detectBrowser(ua: string): { name: string; version?: string } {
  const checks: Array<{ pattern: RegExp; name: string }> = [
    { pattern: /Edg\/(\d+)/, name: "Edge" },
    { pattern: /Chrome\/(\d+)/, name: "Chrome" },
    { pattern: /Firefox\/(\d+)/, name: "Firefox" },
    { pattern: /Version\/(\d+).+Safari/, name: "Safari" },
  ];

  for (const check of checks) {
    const match = ua.match(check.pattern);
    if (match) {
      return { name: check.name, version: match[1] };
    }
  }

  return { name: "Unknown" };
}

function detectOS(ua: string): { name: string; version?: string } {
  if (/Windows NT/i.test(ua)) {
    const match = ua.match(/Windows NT ([\d.]+)/i);
    return { name: "Windows", version: match?.[1] };
  }

  if (/Android/i.test(ua)) {
    const match = ua.match(/Android ([\d.]+)/i);
    return { name: "Android", version: match?.[1] };
  }

  if (/iPhone|iPad|iPod/i.test(ua)) {
    const match = ua.match(/OS ([\d_]+)/i);
    return { name: "iOS", version: match?.[1]?.replace(/_/g, ".") };
  }

  if (/Mac OS X/i.test(ua)) {
    const match = ua.match(/Mac OS X ([\d_]+)/i);
    return { name: "macOS", version: match?.[1]?.replace(/_/g, ".") };
  }

  if (/Linux/i.test(ua)) {
    return { name: "Linux" };
  }

  return { name: "Unknown" };
}

async function loadFingerprintAgent(): Promise<FingerprintAgent | null> {
  if (!inBrowser()) return null;

  try {
    if (!fingerprintAgentPromise) {
      const importModule = new Function(
        "modulePath",
        "return import(modulePath)",
      ) as (modulePath: string) => Promise<{
        default: { load: () => Promise<FingerprintAgent> };
      }>;

      fingerprintAgentPromise = importModule("@fingerprintjs/fingerprintjs").then(
        ({ default: FingerprintJS }) => FingerprintJS.load(),
      );
    }

    return await fingerprintAgentPromise;
  } catch {
    return null;
  }
}

async function resolveFingerprintJsVisitorId(): Promise<string> {
  const agent = await loadFingerprintAgent();
  if (!agent) return "";

  try {
    const result = await agent.get();
    return typeof result?.visitorId === "string" ? result.visitorId : "";
  } catch {
    return "";
  }
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

function getRuntimeEnv(name: string): string {
  const env = (
    globalThis as typeof globalThis & {
      process?: { env?: Record<string, string | undefined> };
    }
  ).process?.env;

  if (env && typeof env[name] === "string") {
    return env[name] ?? "";
  }

  return "";
}

function normalizeGeoFetchOptions(input: FetchVirusGeoOptions | boolean | undefined): FetchVirusGeoOptions {
  if (typeof input === "boolean") {
    return { enabled: input };
  }

  return input ?? {};
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

export function collectDeviceInfo(): VirusDeviceInfo {
  const nav = getSafeNavigator();
  const ua = nav?.userAgent ?? "";
  const browser = detectBrowser(ua);
  const os = detectOS(ua);

  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(ua);

  return {
    ua,
    browser: browser.name,
    browserVersion: browser.version,
    os: os.name,
    osVersion: os.version,
    platform: nav?.platform ?? "",
    vendor: nav?.vendor ?? "",
    isMobile,
    languages: nav?.languages ? [...nav.languages] : [],
    device: {
      vendor: nav?.vendor ?? "",
      model: "",
      type: isMobile ? "mobile" : "desktop",
    },
    cpu: "",
    engine: {
      name: "",
      version: "",
    },
  };
}

export async function fetchGeoFromIp(
  options: FetchVirusGeoOptions = {},
): Promise<VirusGeoRecord | null> {
  if (!inBrowser()) return null;

  const enabled = options.enabled ?? true;
  if (!enabled) return null;

  const apiKey = options.apiKey ?? getRuntimeEnv("NEXT_PUBLIC_IPGEOLOCATION_API_KEY");
  if (!apiKey) return null;

  const endpoint = options.endpoint ?? DEFAULT_GEO_ENDPOINT;
  const timeoutMs = options.timeoutMs ?? 8000;

  const controller = new AbortController();
  const timeoutHandle = window.setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(
      `${endpoint}?apiKey=${encodeURIComponent(apiKey)}`,
      { signal: controller.signal },
    );

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as VirusGeoRecord;
    return payload;
  } catch {
    return null;
  } finally {
    window.clearTimeout(timeoutHandle);
  }
}

export async function createFingerprintId(options: CreateFingerprintIdOptions = {}): Promise<string> {
  if (options.visitorId && options.visitorId.trim()) {
    return options.visitorId.trim();
  }

  const visitorId = await resolveFingerprintJsVisitorId();
  if (visitorId) return visitorId;

  const signals = collectFingerprintSignals();
  const seed = `${signals.userAgent}|${signals.language}|${signals.timezone}|${signals.platform}`;
  let hash = 2166136261;

  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }

  return `vx_${Math.abs(hash >>> 0).toString(16).padStart(8, "0")}`;
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
    name: typeof data?.name === "string" ? data.name : "",
    avatar: typeof data?.avatar === "string" ? data.avatar : "",
    created: typeof data?.created === "number" ? data.created : Date.now(),
    updated: typeof data?.updated === "number" ? data.updated : Date.now(),
    createdAt: data?.createdAt,
    updatedAt: data?.updatedAt,
    device: (data?.device ?? collectDeviceInfo()) as VirusDeviceInfo,
    geo: (data?.geo ?? undefined) as VirusGeoRecord | undefined,
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
  const snapshot = await getDoc(ref);
  const existing = snapshot.data();

  const now = Date.now();
  const defaultIdentity = randomIdentityProfile();

  const fetchGeoOptions = normalizeGeoFetchOptions(options.fetchGeo);
  const shouldFetchGeo = fetchGeoOptions.enabled ?? true;

  let geo = (existing?.geo ?? undefined) as VirusGeoRecord | undefined;
  if (!geo && shouldFetchGeo) {
    const fetchedGeo = await fetchGeoFromIp(fetchGeoOptions);
    if (fetchedGeo) {
      geo = fetchedGeo;
    }
  }

  await setDoc(
    ref,
    {
      id: fingerprintId,
      fingerprintId,
      name: options.name ?? (typeof existing?.name === "string" ? existing.name : defaultIdentity.name),
      avatar: options.avatar ?? (typeof existing?.avatar === "string" ? existing.avatar : defaultIdentity.character),
      created: typeof existing?.created === "number" ? existing.created : now,
      updated: now,
      device: collectDeviceInfo(),
      signals: collectFingerprintSignals(),
      ...(geo ? { geo } : {}),
      traits: options.traits ?? existing?.traits ?? {},
      founder: options.founder ?? existing?.founder ?? {},
      meta: options.meta ?? existing?.meta ?? {},
      createdAt: existing?.createdAt ?? serverTimestamp(),
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );

  const nextSnapshot = await getDoc(ref);
  return normalizeRecord(fingerprintId, nextSnapshot.data());
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
      updated: Date.now(),
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
      updated: Date.now(),
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

export type {
  CreateFingerprintIdOptions,
  FetchVirusGeoOptions,
  JsonLike,
  RegisterFingerprintOptions,
  SubscribeToFingerprintOptions,
  UpdateFingerprintOptions,
  VirusDeviceInfo,
  VirusFingerprintRecord,
  VirusFingerprintSignals,
  VirusGeoRecord,
  VirusProfileObject,
} from "../types";
export { identityCharacters, randomIdentity, randomIdentityProfile } from "./randomIdentity";
export type { VirusIdentityCharacter, VirusRandomIdentity } from "./randomIdentity";
