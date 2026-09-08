import { describe, it, expect } from "vitest";
import { cn, detectUserOS, defaultConfig } from "../src/index";
import * as themeExports from "../src/index";

describe("@goldlabelapps/theme package exports", () => {
  it("exports core design utilities", () => {
    expect(typeof cn).toBe("function");
    expect(cn("px-4", "py-2")).toBe("px-4 py-2");
    expect(cn("px-4", "px-6")).toBe("px-6");
    expect(typeof detectUserOS).toBe("function");
  });

  it("exports defaultConfig with site config structure", () => {
    expect(defaultConfig.metadata).toBeDefined();
    expect(defaultConfig.brand).toBeDefined();
    expect(defaultConfig.hero).toBeDefined();
    expect(defaultConfig.features).toBeDefined();
  });

  it("exports all UI, layout, and context components", () => {
    expect(themeExports.Button).toBeDefined();
    expect(themeExports.Card).toBeDefined();
    expect(themeExports.CustomCursorWrapper).toBeDefined();
    expect(themeExports.ThemeToggle).toBeDefined();
    expect(themeExports.Header).toBeDefined();
    expect(themeExports.Footer).toBeDefined();
    expect(themeExports.DropdownMenu).toBeDefined();
    expect(themeExports.MobileMenu).toBeDefined();
    expect(themeExports.ShareMenu).toBeDefined();
    expect(themeExports.BrandLogo).toBeDefined();
    expect(themeExports.LogoContextMenu).toBeDefined();
    expect(themeExports.HeroSection).toBeDefined();
    expect(themeExports.ParticleCanvas).toBeDefined();
    expect(themeExports.VideoModal).toBeDefined();
    expect(themeExports.FeatureExplorer).toBeDefined();
    expect(themeExports.SolutionsSection).toBeDefined();
    expect(themeExports.StatementSection).toBeDefined();
    expect(themeExports.VideoSection).toBeDefined();
    expect(themeExports.UseCaseSlider).toBeDefined();
    expect(themeExports.BlogSection).toBeDefined();
    expect(themeExports.DownloadBanner).toBeDefined();
    expect(themeExports.GuideLayout).toBeDefined();
    expect(themeExports.MarkdownContent).toBeDefined();
    expect(themeExports.VideoLayout).toBeDefined();
    expect(themeExports.ConfigProvider).toBeDefined();
    expect(themeExports.useSiteConfig).toBeDefined();
    expect(themeExports.ThemeProvider).toBeDefined();
    expect(themeExports.useTheme).toBeDefined();
  });

  it("provides high-contrast error and feedback palette colors in createAppTheme for dark mode", () => {
    const lightTheme = themeExports.createAppTheme("light");
    const darkTheme = themeExports.createAppTheme("dark");

    expect(lightTheme.palette.error.main).toBe("#DC2626");
    expect(darkTheme.palette.error.main).toBe("#F87171");
    expect(darkTheme.palette.error.contrastText).toBe("#0F172A");
    expect(darkTheme.palette.warning.main).toBe("#FBBF24");
    expect(darkTheme.palette.success.main).toBe("#4ADE80");
    expect(darkTheme.palette.info.main).toBe("#38BDF8");
  });
});
