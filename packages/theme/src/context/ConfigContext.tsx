"use client";

import React, { createContext, useContext, useMemo } from "react";
import type { SiteConfig } from "../types";

export const defaultConfig: SiteConfig = {
  metadata: {
    title: "NX° Template",
    description: "Modular full-stack web application",
    siteUrl: "https://goldlabel.pro",
    twitterHandle: "@goldlabelapps",
    twitterImage: "/png/open-graph.png",
    ogImage: "/png/open-graph.png",
    themeColor: "#FFFFFF",
  },
  brand: {
    name: "NX°",
    tagline: "Modern full-stack application template",
    logoType: "svg",
    logoSrc: "/svg/nx.svg",
    contextMenu: {
      enabled: true,
      copySvgLabel: "Copy Logo as SVG",
      guidelinesLabel: "Brand Guidelines",
      guidelinesUrl: "/how-to",
    },
  },
  pwa: {
    enabled: true,
    name: "NX° Template",
    shortName: "NX°",
    description: "Modern full-stack application template",
    startUrl: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    themeColor: "#FFFFFF",
    backgroundColor: "#FFFFFF",
    appleTouchIcon: "/png/favicon_light.png",
    favicon: "/svg/favicon.svg",
    icons: [],
  },
  navigation: {
    links: [],
    primaryCta: { label: "Get Started with NX°", href: "#" },
  },
  hero: {
    headline: "Modern Full-Stack Application",
    subheadline: "Built with modular design primitives and strict type safety.",
    primaryCta: { label: "Get Started", href: "#" },
    secondaryCta: { label: "Learn More", href: "#" },
    video: { enabled: false },
    particleField: {
      enabled: true,
      count: 85,
      interactive: true,
      colors: ["#012867", "#01358d", "#F97316", "#64748B", "#38BDF8"],
    },
  },
  statement: {
    badge: "Architecture & Design",
    headline: "Built with modern primitives and typed configurations.",
    floatingIcons: [],
  },
  features: {
    sectionTitle: "Features & Capabilities",
    items: [],
  },
  videos: {
    title: "Showcase Demos",
    subtitle: "Explore interactive walkthroughs and features.",
    items: [],
  },
  useCases: {
    title: "Showcase Demos",
    subtitle: "Explore interactive walkthroughs and features.",
    items: [],
  },
  solutions: {
    title: "Flexible Plans",
    subtitle: "Choose the plan that best fits your workflow.",
    cards: [],
  },
  blogs: {
    title: "Articles & Guides",
    viewAllCta: { label: "View All", href: "/how-to" },
    posts: [],
  },
  authCta: {
    badge: "✦ Ready to Get Started?",
    title: "Launch Your Application Today",
    subtitle: "Built with high performance and seamless developer experience.",
    primaryCta: { label: "Get Started", href: "#" },
    secondaryCta: { label: "Documentation", href: "/how-to" },
    cliQuickInstall: { label: "Run dev server:", command: "pnpm dev" },
    trustBadge: "TypeScript • Next.js • Tailwind CSS • Vitest",
  },
  footer: {
    tagline: "Beyond Frameworks",
    brandName: "Goldlabel",
    columns: [],
    bottomLinks: [],
    copyright: "© 2026 Goldlabel Apps Ltd",
  },
};

const ConfigContext = createContext<SiteConfig>(defaultConfig);

export interface ConfigProviderProps {
  value: SiteConfig;
  children: React.ReactNode;
}

export function ConfigProvider({ value, children }: ConfigProviderProps) {
  const mergedValue = useMemo(() => ({ ...defaultConfig, ...value }), [value]);
  return <ConfigContext.Provider value={mergedValue}>{children}</ConfigContext.Provider>;
}

export function useSiteConfig(override?: Partial<SiteConfig>): SiteConfig {
  const ctx = useContext(ConfigContext);
  if (!override) return ctx;
  return { ...ctx, ...override };
}
