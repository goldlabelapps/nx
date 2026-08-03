import type { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

export default function manifest(): MetadataRoute.Manifest {
  const configPath = path.join(process.cwd(), 'nx.config.json');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8')) as {
    name?: string;
    siteName?: string;
    description?: string;
    cartridges?: {
      designSystem?: {
        pwa?: {
          background?: string;
        };
        themes?: Record<string, { background?: string }>;
      };
    };
  };

  const pwaBackground = config?.cartridges?.designSystem?.pwa?.background?.trim() || '#364450';

  const appName = config?.name || config?.siteName || 'NX°';
  const description = config?.description || 'Rapidly build modern apps';

  return {
    name: appName,
    short_name: appName,
    description,
    start_url: '/',
    scope: '/',
    display: 'fullscreen',
    orientation: 'any',
    background_color: pwaBackground,
    theme_color: pwaBackground,
    icons: [
      {
        src: '/favicons/favicon.svg',
        type: 'image/svg+xml',
        sizes: 'any',
        purpose: 'any',
      },

      {
        src: '/favicons/favicon_light.svg',
        type: 'image/svg+xml',
        sizes: 'any',
        purpose: 'any',
      },

      {
        src: '/favicons/favicon_dark.svg',
        type: 'image/svg+xml',
        sizes: 'any',
        purpose: 'any',
      },

      {
        src: '/favicons/ios.png',
        type: 'image/png',
        sizes: '512x512',
        purpose: 'maskable',
      },
      {
        src: '/favicons/favicon_dark.png',
        type: 'image/png',
        sizes: '512x512',
        purpose: 'any',
      },
      {
        src: '/favicons/favicon_light.png',
        type: 'image/png',
        sizes: '512x512',
        purpose: 'any',
      },
    ],
  };
}
