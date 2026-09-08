import { describe, it, expect } from "vitest";
import manifest from "./manifest";
import { pwaConfig } from "@/config";

describe("Web App Manifest generator", () => {
  it("generates manifest matching pwa.config.ts specifications", () => {
    const generatedManifest = manifest();

    expect(generatedManifest.name).toBe(pwaConfig.name);
    expect(generatedManifest.short_name).toBe(pwaConfig.shortName);
    expect(generatedManifest.description).toBe(pwaConfig.tagline);
    expect(generatedManifest.start_url).toBe(pwaConfig.startUrl);
    expect(generatedManifest.scope).toBe(pwaConfig.scope);
    expect(generatedManifest.display).toBe(pwaConfig.display);
    expect(generatedManifest.orientation).toBe(pwaConfig.orientation);
    expect(generatedManifest.theme_color).toBe(pwaConfig.themeColor);
    expect(generatedManifest.background_color).toBe(pwaConfig.backgroundColor);

    expect(generatedManifest.icons?.length).toBe(pwaConfig.icons.length);
    expect(generatedManifest.icons?.[0].src).toBe(pwaConfig.icons[0].src);
    expect(generatedManifest.icons?.[0].type).toBe(pwaConfig.icons[0].type);
  });
});
