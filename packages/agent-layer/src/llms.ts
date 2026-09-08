/**
 * Types and generator for llms.txt standard files.
 */

export interface LlmsSiteMetadata {
  /** Name of the site or project. */
  name: string;
  /** Brief description of the site or project. */
  description?: string;
  /** Canonical base URL of the site (e.g., 'https://goldlabel.pro'). */
  url?: string;
  /** Alias for canonical URL to align with AgentManifest. */
  baseUrl?: string;
  /** Optional additional summary or details. */
  details?: string;
}

export interface LlmsResource {
  /** Title of the resource or page. */
  title: string;
  /** Absolute or relative URL. */
  url: string;
  /** Optional summary description of the resource. */
  description?: string;
}

export interface LlmsSection {
  /** Section heading title. */
  title: string;
  /** Optional section description. */
  description?: string;
  /** List of resources within this section. */
  resources?: LlmsResource[];
}

export interface LlmsTxtOptions {
  /** Site metadata. */
  site: LlmsSiteMetadata;
  /** Standalone top-level resources. */
  resources?: LlmsResource[];
  /** Categorized sections of resources. */
  sections?: LlmsSection[];
  /** Optional additional summary or details text. */
  details?: string;
}

/**
 * Resolves a given resource URL against an optional site base URL.
 */
export function resolveResourceUrl(url: string, baseUrl?: string): string {
  const trimmedUrl = url.trim();
  if (!baseUrl || !baseUrl.trim()) {
    return trimmedUrl;
  }

  const trimmedBase = baseUrl.trim();

  // If already absolute URL (http://, https://, etc.)
  if (/^[a-z][a-z0-9+.-]*:/i.test(trimmedUrl) || trimmedUrl.startsWith('//')) {
    return trimmedUrl;
  }

  try {
    // Ensure base URL has a protocol if missing
    const validBase = /^[a-z][a-z0-9+.-]*:/i.test(trimmedBase)
      ? trimmedBase
      : `https://${trimmedBase}`;

    const parsedBase = new URL(validBase);
    const resolved = new URL(trimmedUrl, parsedBase);
    return resolved.toString();
  } catch {
    return trimmedUrl;
  }
}

/**
 * Generates an llms.txt document string from structured options.
 */
export function generateLlmsTxt(options: LlmsTxtOptions): string {
  if (!options || typeof options !== 'object') {
    throw new TypeError('Options object is required for generateLlmsTxt.');
  }

  const { site } = options;
  if (!site || typeof site !== 'object') {
    throw new TypeError('site metadata object is required in LlmsTxtOptions.');
  }

  const name = site.name ? site.name.trim() : '';
  if (!name) {
    throw new TypeError('site.name is required in LlmsTxtOptions.');
  }

  const siteUrl = site.url || site.baseUrl;

  const lines: string[] = [];

  // Title (# Site Name)
  lines.push(`# ${name}`);

  // Summary quote (> Site Description)
  if (site.description && site.description.trim()) {
    lines.push('');
    lines.push(`> ${site.description.trim()}`);
  }

  // Details paragraph
  const detailsText = site.details || options.details;
  if (detailsText && detailsText.trim()) {
    lines.push('');
    lines.push(detailsText.trim());
  }

  // Format helper for resources
  const formatResource = (res: LlmsResource): string => {
    const title = res.title ? res.title.trim() : '';
    const rawUrl = res.url ? res.url.trim() : '';

    if (!title || !rawUrl) {
      throw new TypeError('Each resource must have a valid title and url.');
    }

    const resolvedUrl = resolveResourceUrl(rawUrl, siteUrl);
    if (res.description && res.description.trim()) {
      return `- [${title}](${resolvedUrl}): ${res.description.trim()}`;
    }
    return `- [${title}](${resolvedUrl})`;
  };

  // Top-level resources
  if (options.resources && Array.isArray(options.resources)) {
    const validResources = options.resources.filter(
      (r) => r && typeof r === 'object'
    );
    if (validResources.length > 0) {
      lines.push('');
      for (const res of validResources) {
        lines.push(formatResource(res));
      }
    }
  }

  // Sections
  if (options.sections && Array.isArray(options.sections)) {
    for (const section of options.sections) {
      if (!section || typeof section !== 'object') continue;
      const sectionTitle = section.title ? section.title.trim() : '';
      if (!sectionTitle) continue;

      const resources = Array.isArray(section.resources)
        ? section.resources.filter((r) => r && typeof r === 'object')
        : [];

      // Skip section if it has no description and no resources
      if (resources.length === 0 && (!section.description || !section.description.trim())) {
        continue;
      }

      lines.push('');
      lines.push(`## ${sectionTitle}`);

      if (section.description && section.description.trim()) {
        lines.push('');
        lines.push(section.description.trim());
      }

      if (resources.length > 0) {
        lines.push('');
        for (const res of resources) {
          lines.push(formatResource(res));
        }
      }
    }
  }

  return lines.join('\n') + '\n';
}
