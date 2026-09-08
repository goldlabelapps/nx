import { metadataConfig } from "./metadata.config";
import { brandConfig } from "./brand.config";
import { pwaConfig } from "./pwa.config";
import { navigationConfig } from "./navigation.config";
import { heroConfig } from "./hero.config";
import { statementConfig } from "./statement.config";
import { featuresConfig } from "./features.config";
import { videosConfig } from "./videos.config";
import { useCasesConfig } from "./useCases.config";
import { solutionsConfig } from "./solutions.config";
import { blogsConfig } from "./blogs.config";
import { authCtaConfig } from "./authCta.config";
import { footerConfig } from "./footer.config";

export const siteConfig: SiteConfig = {
  metadata: metadataConfig,
  brand: brandConfig,
  pwa: pwaConfig,
  navigation: navigationConfig,
  hero: heroConfig,
  statement: statementConfig,
  features: featuresConfig,
  videos: videosConfig,
  useCases: useCasesConfig,
  solutions: solutionsConfig,
  blogs: blogsConfig,
  authCta: authCtaConfig,
  footer: footerConfig,
};

export {
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
};
