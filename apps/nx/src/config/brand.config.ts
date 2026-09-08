import { nxConfig } from "@/lib/nxConfig";

export const brandConfig: BrandConfig = {
  name: nxConfig.name,
  tagline: nxConfig.tagline,
  logoType: "svg",
  logoSrc: nxConfig.favicon,
  logoLight: "/svg/headerlogo_light.svg",
  logoDark: "/svg/headerlogo_dark.svg",
  contextMenu: {
    enabled: true,
    copySvgLabel: "Copy Template Logo as SVG",
    guidelinesLabel: "Template Guidelines",
    guidelinesUrl: "/",
  },
};
