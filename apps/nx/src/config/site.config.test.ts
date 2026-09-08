import { describe, it, expect } from "vitest";
import { nxConfig } from "@/lib/nxConfig";
import {
  siteConfig,
  metadataConfig,
  brandConfig,
  pwaConfig,
  navigationConfig,
  heroConfig,
  statementConfig,
  featuresConfig,
  videosConfig,
  useCasesConfig,
  solutionsConfig,
  blogsConfig,
  authCtaConfig,
  footerConfig,
} from "./index";

describe("Modular Config Architecture", () => {
  it("exports individual modular configuration objects correctly", () => {
    expect(metadataConfig.title).toBe(`${nxConfig.name}, ${nxConfig.tagline}`);
    expect(metadataConfig.tagline).toBe(nxConfig.tagline);
    expect(brandConfig.name).toBe(nxConfig.name);
    expect(pwaConfig.shortName).toBe(nxConfig.name);
    expect(navigationConfig.links.length).toBeGreaterThan(0);
    expect(heroConfig.headline).toBe(nxConfig.tagline);
    expect(statementConfig.headline).toContain("Built with modern primitives");
    expect(featuresConfig.items.length).toBe(4);
    expect(videosConfig.items.length).toBe(2);
    expect(useCasesConfig.items.length).toBe(2);
    expect(solutionsConfig.cards.length).toBe(2);
    expect(blogsConfig.posts.length).toBe(5);
    expect(authCtaConfig.cliQuickInstall.command).toContain("git clone");
    expect(footerConfig.columns.length).toBe(4);
  });

  it("composes siteConfig accurately from individual modules", () => {
    expect(siteConfig.metadata).toBe(metadataConfig);
    expect(siteConfig.brand).toBe(brandConfig);
    expect(siteConfig.pwa).toBe(pwaConfig);
    expect(siteConfig.navigation).toBe(navigationConfig);
    expect(siteConfig.hero).toBe(heroConfig);
    expect(siteConfig.statement).toBe(statementConfig);
    expect(siteConfig.features).toBe(featuresConfig);
    expect(siteConfig.videos).toBe(videosConfig);
    expect(siteConfig.solutions).toBe(solutionsConfig);
    expect(siteConfig.blogs).toBe(blogsConfig);
    expect(siteConfig.authCta).toBe(authCtaConfig);
    expect(siteConfig.footer).toBe(footerConfig);
  });

  it("has valid metadata and twitter image asset", () => {
    expect(siteConfig.metadata.title).toBe(`${nxConfig.name}, ${nxConfig.tagline}`);
    expect(siteConfig.metadata.tagline).toBe(nxConfig.tagline);
    expect(siteConfig.metadata.twitterImage).toBe("/png/open-graph.png");
    expect(siteConfig.metadata.ogImage).toBe("/png/open-graph.png");
    expect(siteConfig.metadata.twitterHandle).toBe("@goldlabelapps");
  });

  it("has valid brand configuration and logo menu", () => {
    expect(siteConfig.brand.name).toBe(nxConfig.name);
    expect(siteConfig.brand.contextMenu.enabled).toBe(true);
    expect(siteConfig.brand.contextMenu.copySvgLabel).toBe("Copy Template Logo as SVG");
  });

  it("has valid PWA configuration with brand assets and theme tokens", () => {
    expect(siteConfig.pwa.enabled).toBe(true);
    expect(siteConfig.pwa.appleTouchIcon).toBe("/png/favicon.png");
    expect(siteConfig.pwa.favicon).toBe("/svg/favicon.svg");
    expect(siteConfig.brand.logoSrc).toBe("/svg/favicon.svg");
    expect(siteConfig.pwa.name).toBe(nxConfig.name);
    expect(siteConfig.pwa.shortName).toBe(nxConfig.name);
    expect(siteConfig.pwa.tagline).toBe(nxConfig.tagline);
    expect(siteConfig.pwa.icons.length).toBeGreaterThanOrEqual(2);
    expect(siteConfig.pwa.themeColor).toBe("#0f172a");
  });

  it("has navigation links and CTAs", () => {
    expect(siteConfig.navigation.links.length).toBe(5);

    const nxLink = siteConfig.navigation.links.find((l) => l.label === "NX°");
    expect(nxLink).toBeDefined();
    expect(nxLink?.href).toBe("/nx");

    const aboutLink = siteConfig.navigation.links.find((l) => l.label === "About");
    expect(aboutLink).toBeDefined();
    expect(aboutLink?.href).toBe("/goldlabel");

    const flashLink = siteConfig.navigation.links.find((l) => l.label === "Flash");
    expect(flashLink).toBeUndefined();

    const blogLink = siteConfig.navigation.links.find((l) => l.label === "Blog");
    expect(blogLink).toBeDefined();
    expect(blogLink?.href).toBe("/blog");
    expect(blogLink?.dropdown?.length).toBe(3);

    const expLink = siteConfig.navigation.links.find((l) => l.label === "Experience");
    expect(expLink).toBeDefined();
    expect(expLink?.href).toBe("/experience");

    const contactLink = siteConfig.navigation.links.find((l) => l.label === "Contact");
    expect(contactLink).toBeDefined();
    expect(contactLink?.href).toBe("/contact");

    expect(siteConfig.navigation.primaryCta.label).toBe("GitHub");
    expect(siteConfig.navigation.primaryCta.href).toBe("/#github");
    expect(siteConfig.navigation.secondaryCta?.label).toBe("Documentation");
    expect(siteConfig.navigation.remoteControlBadge?.enabled).toBe(true);
  });

  it("exports valid hero configuration", () => {
    expect(heroConfig.headline).toBe(nxConfig.tagline);
    expect(siteConfig.hero.primaryCta.label).toBe("Pricing");
    expect(siteConfig.hero.primaryCta.href).toBe("/#solutions");
    expect(siteConfig.hero.particleField.colors.length).toBeGreaterThan(0);
  });

  it("has statement section with floating icons", () => {
    expect(siteConfig.statement.headline).toContain("Built with modern primitives");
    expect(siteConfig.statement.floatingIcons.length).toBeGreaterThan(0);
    siteConfig.statement.floatingIcons.forEach((icon) => {
      expect(icon.symbol).toBeDefined();
      expect(icon.x).toBeGreaterThanOrEqual(0);
      expect(icon.y).toBeGreaterThanOrEqual(0);
    });
  });

  it("has feature explorer items with preview snippets", () => {
    expect(siteConfig.features.items.length).toBe(4);
    const designItem = siteConfig.features.items.find((f) => f.id === "design-system");
    expect(designItem?.codeSnippet?.code).toContain("corporate-slate");

    const toolingItem = siteConfig.features.items.find((f) => f.id === "developer-tooling");
    expect(toolingItem?.terminalSnippet?.commands.length).toBeGreaterThan(0);
  });

  it("has showcase video items with definitions", () => {
    expect(siteConfig.videos.items.length).toBe(2);
    const v = siteConfig.videos.items[0];
    expect(v.title).toBe("It's Not What You Know");
    expect(v.videoUrl).toBeDefined();
    expect(v.duration).toBeDefined();
    expect(v.keyFeatures?.length).toBeGreaterThan(0);
  });

  it("has solutions with standard and enterprise tiers", () => {
    expect(siteConfig.solutions.cards.length).toBe(2);
    const stdCard = siteConfig.solutions.cards.find((c) => c.id === "standard");
    expect(stdCard?.highlighted).toBe(true);
  });

  it("has blog posts with dates and categories", () => {
    expect(siteConfig.blogs.posts.length).toBe(5);
    siteConfig.blogs.posts.forEach((post) => {
      expect(post.title).toBeDefined();
      expect(post.date).toBeDefined();
      expect(post.category).toBeDefined();
    });
  });

  it("has auth CTA configuration for the GitHub repository advert", () => {
    expect(siteConfig.authCta.primaryCta.label).toContain("GitHub");
    expect(siteConfig.authCta.primaryCta.href).toContain("github.com/goldlabelapps/nx");
    expect(siteConfig.authCta.secondaryCta.label).toContain("Guide");
    expect(siteConfig.authCta.cliQuickInstall.command).toContain("git clone");
    expect(siteConfig.authCta.trustBadge).toContain("NX");
  });

  it("has comprehensive footer links and copyright with company info", () => {
    expect(siteConfig.footer.columns.length).toBe(4);
    expect(siteConfig.footer.bottomLinks.length).toBeGreaterThan(0);
    expect(siteConfig.footer.copyright).toContain("Goldlabel Apps");
  });
});
