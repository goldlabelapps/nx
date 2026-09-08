import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type DetectedOS = "macos-silicon" | "macos-intel" | "windows" | "linux" | "unknown";

export function detectUserOS(): DetectedOS {
  if (typeof window === "undefined" || !navigator) return "macos-silicon";

  const userAgent = navigator.userAgent.toLowerCase();
  const platform = (navigator as unknown as { userAgentData?: { platform?: string } }).userAgentData?.platform?.toLowerCase() || navigator.platform?.toLowerCase() || "";

  if (platform.includes("mac") || userAgent.includes("macintosh") || userAgent.includes("mac os")) {
    return "macos-silicon";
  }

  if (platform.includes("win") || userAgent.includes("windows")) {
    return "windows";
  }

  if (platform.includes("linux") || userAgent.includes("linux") || userAgent.includes("x11")) {
    return "linux";
  }

  return "macos-silicon";
}
