"use client";

import FingerprintJS from "@fingerprintjs/fingerprintjs";
import type {
  VirusFingerprintRecord,
  VirusFingerprintSignals,
  VirusDeviceInfo,
  VirusGeoRecord,
} from "./types";

/** Helper to extract basic browser and screen signals */
export function getFingerprintSignals(): VirusFingerprintSignals {
  if (typeof window === "undefined") {
    return {
      userAgent: "",
      language: "",
      languages: [],
      platform: "",
      timezone: "",
      colorDepth: 0,
      pixelRatio: 1,
      screen: "",
      hardwareConcurrency: 0,
      maxTouchPoints: 0,
      doNotTrack: "",
    };
  }

  return {
    userAgent: navigator.userAgent || "",
    language: navigator.language || "",
    languages: Array.from(navigator.languages || []),
    platform: navigator.platform || "",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "",
    colorDepth: window.screen?.colorDepth || 0,
    pixelRatio: window.devicePixelRatio || 1,
    screen: `${window.screen?.width || 0}x${window.screen?.height || 0}`,
    hardwareConcurrency: navigator.hardwareConcurrency || 0,
    maxTouchPoints: navigator.maxTouchPoints || 0,
    doNotTrack: navigator.doNotTrack || "",
  };
}

/** Basic device info builder from user agent */
export function getDeviceInfo(ua: string): VirusDeviceInfo {
  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(ua);
  let browser = "Unknown";
  if (/chrome|crios|crmo/i.test(ua) && !/edg/i.test(ua)) browser = "Chrome";
  else if (/safari/i.test(ua) && !/chrome|crios|crmo/i.test(ua)) browser = "Safari";
  else if (/firefox|fxios/i.test(ua)) browser = "Firefox";
  else if (/edg/i.test(ua)) browser = "Edge";

  let os = "Unknown";
  if (/mac/i.test(ua)) os = "macOS";
  else if (/win/i.test(ua)) os = "Windows";
  else if (/linux/i.test(ua)) os = "Linux";
  else if (/iphone|ipad|ipod/i.test(ua)) os = "iOS";
  else if (/android/i.test(ua)) os = "Android";

  return {
    ua,
    browser,
    os,
    platform: typeof navigator !== "undefined" ? navigator.platform || "" : "",
    vendor: typeof navigator !== "undefined" ? navigator.vendor || "" : "",
    isMobile,
    languages: typeof navigator !== "undefined" ? Array.from(navigator.languages || []) : [],
    device: {},
    cpu: "",
    engine: {},
  };
}

/** Fetch IP & Geo location data (e.g. from ipgeo / ipapi / freegeoip endpoint) */
export async function fetchGeoData(): Promise<VirusGeoRecord | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const res = await fetch("https://api.ipify.org?format=json", { signal: controller.signal });
    if (!res.ok) {
      clearTimeout(timeoutId);
      return null;
    }
    const { ip } = await res.json();

    const geoRes = await fetch(`https://ipapi.co/${ip}/json/`, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (!geoRes.ok) return { ip };
    const geoData = await geoRes.json();

    return {
      ip,
      city: geoData.city,
      region: geoData.region,
      country_name: geoData.country_name,
      country_code2: geoData.country_code,
      latitude: geoData.latitude,
      longitude: geoData.longitude,
      lat: geoData.latitude,
      lon: geoData.longitude,
      isp: geoData.org || geoData.asn,
      organization: geoData.org,
      time_zone: { name: geoData.timezone },
    };
  } catch (error) {
    console.warn("[Prospects] Failed to fetch geo metadata:", error);
    return null;
  }
}

/** Generate full Fingerprint Record using FingerprintJS */
export async function createFingerprintRecord(): Promise<VirusFingerprintRecord> {
  const fp = await FingerprintJS.load();
  const result = await fp.get();
  const visitorId = result.visitorId;

  const signals = getFingerprintSignals();
  const device = getDeviceInfo(signals.userAgent);
  const geo = await fetchGeoData();

  const now = Date.now();

  return {
    id: visitorId,
    fingerprintId: visitorId,
    name: `Prospect ${visitorId.slice(0, 6)}`,
    avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${visitorId}`,
    created: now,
    updated: now,
    createdAt: now,
    updatedAt: now,
    device,
    geo: geo || undefined,
    signals,
    traits: {},
    founder: {},
    meta: {},
  };
}
