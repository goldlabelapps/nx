import { nxConfig } from "@/lib/nxConfig";

export const heroConfig: HeroConfig = {
  headline: nxConfig.tagline,
  subheadline: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  gradientWords: nxConfig.tagline.split(" "),
  primaryCta: {
    label: "Pricing",
    href: "/#solutions",
    icon: "ArrowRight",
  },
  secondaryCta: {
    label: "Documentation",
    href: "/",
    icon: "ExternalLink",
  },
  video: {
    enabled: false,
  },
  particleField: {
    enabled: true,
    count: 85,
    interactive: true,
    colors: [nxConfig.theme.light.primary, "#01358d", "#F97316", "#64748B", nxConfig.theme.dark.primary],
    maxSpeed: 0.45,
    connectionDistance: 140,
  },
};