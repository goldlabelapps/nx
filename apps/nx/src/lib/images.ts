import ogManifest from "../../public/jpg/og-images.json";
import { siteConfig } from "@/config";

export interface FeaturedImageOptions {
  image?: string;
  featuredImage?: string;
  slug?: string;
  category?: string;
  tags?: string[];
  theme?: "dark" | "light";
}

interface OgImageVersion {
  path: string;
}

interface OgImageItem {
  id: string;
  name: string;
  category: string;
  versions?: {
    dark?: OgImageVersion;
    light?: OgImageVersion;
  };
}

/**
 * Resolves the URL for a featured image for use in page metadata (OpenGraph/Twitter cards)
 * or layout components.
 */
export function getFeaturedImageUrl(options: FeaturedImageOptions = {}): string {
  const { image, featuredImage, slug, category, tags, theme = "dark" } = options;

  // Helper check for valid URL path
  const isUrlPath = (str?: string) =>
    Boolean(str && (str.startsWith("/") || str.startsWith("http://") || str.startsWith("https://") || str.includes(".")));

  // 1. Explicit image path passed directly
  const explicitImage = image || featuredImage;
  if (explicitImage && typeof explicitImage === "string" && explicitImage.trim().length > 0 && isUrlPath(explicitImage.trim())) {
    return explicitImage.trim();
  }

  // 2. Lookup in og-images.json manifest
  if (ogManifest && Array.isArray(ogManifest.items)) {
    const items = ogManifest.items as OgImageItem[];

    // Collect candidate strings to search for in manifest
    const candidates: string[] = [];

    if (explicitImage && typeof explicitImage === "string" && !isUrlPath(explicitImage.trim())) {
      const trimmed = explicitImage.trim().toLowerCase();
      candidates.push(trimmed);
    }

    if (slug) {
      const trimmedSlug = slug.trim().toLowerCase();
      candidates.push(trimmedSlug);
      // Split slug by '/' and '-'
      const parts = trimmedSlug.split(/[/_-]/).filter(Boolean);
      candidates.push(...parts);
    }

    if (category) {
      const trimmedCat = category.trim().toLowerCase();
      candidates.push(trimmedCat);
      const catParts = trimmedCat.split(/[/_-\s&]+/).filter(Boolean);
      candidates.push(...catParts);
    }

    if (tags && Array.isArray(tags)) {
      tags.forEach((tag) => {
        if (typeof tag === "string" && tag.trim()) {
          candidates.push(tag.trim().toLowerCase());
        }
      });
    }

    for (const candidate of candidates) {
      const match = items.find(
        (item) =>
          item.id?.toLowerCase() === candidate ||
          item.category?.toLowerCase() === candidate ||
          item.name?.toLowerCase() === candidate
      );

      if (match?.versions) {
        const selectedVersion =
          match.versions[theme] ?? match.versions.dark ?? match.versions.light;
        if (selectedVersion?.path) {
          return selectedVersion.path;
        }
      }
    }
  }

  // 3. Fallback to site default OG image
  return siteConfig.metadata.ogImage || "/png/open-graph.png";
}
