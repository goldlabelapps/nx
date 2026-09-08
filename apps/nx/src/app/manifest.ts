import type { MetadataRoute } from "next";
import { pwaConfig } from "@/config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: pwaConfig.name,
    short_name: pwaConfig.shortName,
    description: pwaConfig.tagline,
    start_url: pwaConfig.startUrl,
    scope: pwaConfig.scope,
    display: pwaConfig.display,
    orientation: pwaConfig.orientation,
    theme_color: pwaConfig.themeColor,
    background_color: pwaConfig.backgroundColor,
    icons: pwaConfig.icons.map((icon) => ({
      src: icon.src,
      sizes: icon.sizes,
      type: icon.type,
      purpose: (icon.purpose === "maskable" || icon.purpose === "any maskable"
        ? "maskable"
        : icon.purpose === "monochrome"
        ? "monochrome"
        : "any") as "any" | "maskable" | "monochrome" | undefined,
    })),
  };
}
