import { nxConfig } from "@/lib/nxConfig";

export const metadataConfig: SiteMetadata = {
  title: `${nxConfig.name}, ${nxConfig.tagline}`,
  tagline: nxConfig.tagline,
  siteUrl: nxConfig.url,
  twitterHandle: nxConfig.social.twitterHandle,
  twitterImage: "/png/open-graph.png",
  ogImage: "/png/open-graph.png",
  themeColor: nxConfig.theme.light.background,
};
