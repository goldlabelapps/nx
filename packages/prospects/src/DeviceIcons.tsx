"use client";

import React from "react";
import { Icon, type IconName } from "@goldlabelapps/theme";

export type IconType =
  | "MacOS"
  | "Windows"
  | "Linux"
  | "Android"
  | "iOS"
  | "Chrome"
  | "Safari"
  | "Firefox"
  | "Edge"
  | "Desktop"
  | "Mobile"
  | string;

interface DeviceIconProps {
  name: IconType;
  className?: string;
  size?: number;
}

export function DeviceIcon({ name, className = "", size = 50 }: DeviceIconProps) {
  const normalized = name.toLowerCase();

  let iconName: IconName = "desktop";
  if (normalized.includes("mac")) iconName = "mac";
  else if (normalized.includes("win")) iconName = "windows";
  else if (normalized.includes("linux")) iconName = "linux";
  else if (normalized.includes("android")) iconName = "android";
  else if (normalized.includes("ios") || normalized.includes("iphone")) iconName = "iphone";
  else if (normalized.includes("chrome")) iconName = "chrome";
  else if (normalized.includes("safari")) iconName = "safari";
  else if (normalized.includes("firefox")) iconName = "firefox";
  else if (normalized.includes("edge")) iconName = "edge";
  else if (normalized.includes("mobile") || normalized.includes("phone")) iconName = "mobile";
  else if (normalized.includes("desktop")) iconName = "desktop";

  return (
    <span className={`inline-flex items-center justify-center text-slate-800 dark:text-slate-100 select-none pointer-events-none ${className}`}>
      <Icon icon={iconName} size={size} />
    </span>
  );
}

interface CountryFlagProps {
  countryCode?: string;
  countryName?: string;
  className?: string;
  size?: number;
}

export function CountryFlag({ countryCode, countryName, className = "w-5 h-3.5", size = 20 }: CountryFlagProps) {
  if (!countryCode) return null;
  const flagPath = `/svg/flags/${countryCode.toLowerCase()}.svg`;

  return (
    <img
      src={flagPath}
      alt={countryName || countryCode}
      width={size}
      height={Math.round(size * 0.7)}
      className={`inline-block rounded-xs shadow-xs object-cover select-none pointer-events-none ${className}`}
      onError={(e) => {
        (e.currentTarget as HTMLElement).style.display = "none";
      }}
    />
  );
}
