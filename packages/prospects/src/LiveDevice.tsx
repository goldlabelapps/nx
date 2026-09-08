"use client";

import React, { useEffect } from "react";
import { useDispatch, useSlice } from "@goldlabelapps/uberedux";
import { useProspects } from "./hooks/useProspects";
import { initProspects } from "./actions/init";
import { DeviceIcon, CountryFlag } from "./DeviceIcons";
import type { VirusDeviceInfo, VirusGeoRecord } from "./types";

export interface LiveDeviceProps {
  title?: string;
  className?: string;
  mapboxToken?: string;
  mapboxStyle?: string;
  zoom?: number;
  showMap?: boolean;
  showDetails?: boolean;
}

export function LiveDevice({
  title = "",
  className = "",
  mapboxToken,
  mapboxStyle = "mapbox://styles/listingslab/cmogzklar000a01s720ri58qh",
  zoom = 5,
  showMap = true,
  showDetails = true,
}: LiveDeviceProps) {
  const dispatch = useDispatch();
  const reduxState = useSlice();
  const { fingerprint, status } = useProspects();

  useEffect(() => {
    dispatch(initProspects({ initializedAt: new Date().toISOString() }));
  }, [dispatch]);

  // Extract user object or fallback to prospects cartridge state
  const rawProspects = (reduxState?.prospects || {}) as Record<string, unknown>;
  const user = (reduxState?.user || rawProspects?.user || rawProspects?.fingerprint || fingerprint) as
    | Record<string, unknown>
    | undefined;

  const device = (user?.device || fingerprint?.device || {}) as Partial<VirusDeviceInfo>;
  const geo = (user?.geo || fingerprint?.geo || {}) as Partial<VirusGeoRecord>;

  const os = (user?.os as string) || device.os || "Unknown OS";
  const browser = (user?.browser as string) || device.browser || "Unknown Browser";
  const isMobile = (user?.isMobile as boolean) ?? device.isMobile ?? false;

  const ip = (user?.ip as string) || geo.ip || "Unknown IP";
  const isp = (user?.isp as string) || geo.isp || geo.organization || "Unknown ISP";
  const city = (user?.city as string) || geo.city || "";
  const region = (user?.region as string) || geo.region || geo.state_prov || "";
  const country = (user?.country as string) || geo.country_name || "";
  const countryCode = (user?.countryCode as string) || geo.country_code2 || "";
  const locationString = [city, region, country].filter(Boolean).join(", ") || "Unknown Location";
  const mapLocationString = [city, region].filter(Boolean).join(", ") || "Unknown Location";

  const latNum = Number(user?.latitude ?? user?.lat ?? geo.latitude ?? geo.lat);
  const lngNum = Number(user?.longitude ?? user?.lng ?? geo.longitude ?? geo.lon);
  const hasCoordinates = !isNaN(latNum) && !isNaN(lngNum) && (latNum !== 0 || lngNum !== 0);

  const token =
    mapboxToken ||
    (typeof process !== "undefined"
      ? process.env?.NEXT_PUBLIC_MAPBOX_TOKEN ||
        process.env?.MAPBOX_TOKEN ||
        process.env?.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
      : undefined);

  const styleString =
    mapboxStyle ||
    (typeof process !== "undefined"
      ? process.env?.NEXT_PUBLIC_MAPBOX_STYLE || process.env?.MAPBOX_STYLE
      : undefined) ||
    "mapbox://styles/listingslab/cmogzklar000a01s720ri58qh";

  const stylePath = styleString.replace(/^mapbox:\/\/styles\//, "");

  // Sensibly zoomed out Mapbox static URL
  const mapboxStaticUrl =
    hasCoordinates && token
      ? `https://api.mapbox.com/styles/v1/${stylePath}/static/pin-s+f43f5e(${lngNum},${latNum})/${lngNum},${latNum},${zoom},0/800x900@2x?access_token=${token}`
      : null;

  // OpenStreetMap embed fallback when mapbox token isn't present
  const osmEmbedUrl = hasCoordinates
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${lngNum - 3}%2C${latNum - 2}%2C${lngNum + 3}%2C${latNum + 2}&layer=mapnik&marker=${latNum}%2C${lngNum}`
    : null;

  const isLoading = status.state === "loading" && !fingerprint;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Optional Header Title if explicitly provided */}
      {title && (
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
          {isLoading && <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">Detecting device & location...</span>}
        </div>
      )}

      {/* 1. First Section: Mapbox / Location Map View (Doubled Height) */}
      {showMap && (
        <div className="relative min-h-[600px] h-[640px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 flex flex-col justify-center items-center shadow-xs">
          {mapboxStaticUrl ? (
            <img
              src={mapboxStaticUrl}
              alt={`Map showing ISP location ${locationString}`}
              className="w-full h-full object-cover min-h-[600px]"
            />
          ) : osmEmbedUrl ? (
            <iframe
              title="ISP Geolocation Map"
              width="100%"
              height="100%"
              className="min-h-[600px] w-full border-0 grayscale contrast-125 opacity-90 hover:opacity-100 transition-opacity"
              src={osmEmbedUrl}
            />
          ) : (
            <div className="p-4 text-center">
              <div className="text-2xl mb-1">🗺️</div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {hasCoordinates ? "Rendering Mapbox map..." : "Geolocation coordinates unavailable"}
              </p>
            </div>
          )}

          {hasCoordinates && (
            <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-slate-900 text-[11px] flex items-center justify-between shadow-sm border border-slate-200/60">
              <span className="truncate flex items-center gap-1.5 text-slate-900">
                <CountryFlag countryCode={countryCode} countryName={country} size={16} />
                <span className="text-slate-900 font-semibold">{mapLocationString}</span>
              </span>
            </div>
          )}
        </div>
      )}

      {/* 2. Second Section: Appearance (Device Reels - moved below map) */}
      {showDetails && (
        <div className="pt-2 flex items-center justify-center gap-4 sm:gap-6 flex-wrap">
          {/* Reel Slot 1: OS */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-[60px] h-[60px] flex items-center justify-center p-1">
              <DeviceIcon name={os} size={48} />
            </div>
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 text-center truncate max-w-[70px]">
              {os}
            </span>
          </div>

          {/* Reel Slot 2: Browser */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-[60px] h-[60px] flex items-center justify-center p-1">
              <DeviceIcon name={browser} size={48} />
            </div>
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 text-center truncate max-w-[70px]">
              {browser}
            </span>
          </div>

          {/* Reel Slot 3: Device Type */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-[60px] h-[60px] flex items-center justify-center p-1">
              <DeviceIcon name={isMobile ? "Mobile" : "Desktop"} size={48} />
            </div>
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 text-center truncate max-w-[70px]">
              {isMobile ? "Mobile" : "Desktop"}
            </span>
          </div>

          {/* Reel Slot 4: Country Flag Circular Avatar */}
          {(countryCode || country || city) && (
            <div className="flex flex-col items-center gap-1.5 min-w-0">
              <div className="w-[60px] h-[60px] flex items-center justify-center p-1 shrink-0">
                <CountryFlag countryCode={countryCode} countryName={country} size={40} className="w-[40px] h-[40px] rounded-full object-cover" />
              </div>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 text-center truncate max-w-[90px] w-full" title={city || country || countryCode}>
                {city || country || countryCode}
              </span>
            </div>
          )}
        </div>
      )}

      {/* 3. Third Section: ISP Information (Moved underneath the map with space above) */}
      {showDetails && (
        <div className="pt-2 mt-4 space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/60">
            <span className="text-slate-500 dark:text-slate-400 font-medium">ISP Provider:</span>
            <span className="font-semibold text-slate-900 dark:text-slate-100">{isp}</span>
          </div>
          <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/60">
            <span className="text-slate-500 dark:text-slate-400 font-medium">IP Address:</span>
            <span className="font-mono text-slate-900 dark:text-slate-100">{ip}</span>
          </div>
          <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/60">
            <span className="text-slate-500 dark:text-slate-400 font-medium">Location:</span>
            <span className="font-medium text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <CountryFlag countryCode={countryCode} countryName={country} />
              <span>{locationString}</span>
            </span>
          </div>
          {hasCoordinates && (
            <div className="flex items-center justify-between py-1">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Coordinates:</span>
              <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                {latNum.toFixed(4)}°, {lngNum.toFixed(4)}°
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default LiveDevice;
