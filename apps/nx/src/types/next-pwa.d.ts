declare module "next-pwa" {
  import type { NextConfig } from "next";

  export interface PWAConfig {
    dest?: string;
    disable?: boolean;
    register?: boolean;
    scope?: string;
    sw?: string;
    skipWaiting?: boolean;
    clientsClaim?: boolean;
    reloadOnOnline?: boolean;
    fallbacks?: {
      document?: string;
      image?: string;
      audio?: string;
      video?: string;
      font?: string;
    };
    buildExcludes?: Array<string | RegExp>;
    publicExcludes?: string[];
  }

  export default function withPWAInit(
    pwaConfig?: PWAConfig
  ): (nextConfig?: NextConfig) => NextConfig;
}
