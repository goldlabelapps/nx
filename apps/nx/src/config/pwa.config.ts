import { nxConfig } from "@/lib/nxConfig";

export const pwaConfig: PwaConfig = {
  enabled: true,
  name: nxConfig.name,
  shortName: nxConfig.name,
  tagline: nxConfig.tagline,
  startUrl: "/",
  scope: "/",
  display: "standalone",
  orientation: "portrait",
  themeColor: nxConfig.theme.light.primary,
  backgroundColor: "#0F172A",
  appleTouchIcon: "/png/favicon.png",
  favicon: nxConfig.favicon,
  icons: [
    {
      src: "/png/favicon.png",
      sizes: "192x192",
      type: "image/png",
      purpose: "any",
    },
    {
      src: "/png/favicon.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "any",
    },
    {
      src: "/png/favicon.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "maskable",
    },
    {
      src: "/svg/favicon.svg",
      sizes: "512x512",
      type: "image/svg+xml",
      purpose: "any",
    },
    {
      src: "/svg/favicon.svg",
      sizes: "any",
      type: "image/svg+xml",
      purpose: "any",
    },
  ],
};
