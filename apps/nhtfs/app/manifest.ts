import type { MetadataRoute } from 'next';
import nxConfig from '../public/nx/config.json';

export default function manifest(): MetadataRoute.Manifest {
  const config = nxConfig as {
    name?: string;
    siteName?: string;
    description?: string;
    cartridges?: {
      designSystem?: {
        defaultTheme?: string;
        pwa?: {
          background?: string;
        };
        themes?: Record<string, { background?: string }>;
      };
    };
  };

  const configuredPwaBackground = config?.cartridges?.designSystem?.pwa?.background?.trim() || '';
  const defaultThemeId = config?.cartridges?.designSystem?.defaultTheme?.trim() || '';
  const themedPwaBackground = defaultThemeId
    ? config?.cartridges?.designSystem?.themes?.[defaultThemeId]?.background?.trim() || ''
    : '';
  const pwaBackground = configuredPwaBackground || themedPwaBackground || '#000';
  const svgIcon = '/nx/svg/favicon.svg';
  const pngIcon = '/nx/png/favicon.png';

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
        src: svgIcon,
        type: 'image/svg+xml',
        sizes: 'any',
        purpose: 'any',
      },
      {
        src: pngIcon,
        type: 'image/png',
        sizes: '512x512',
        purpose: 'any',
      },
      {
        src: pngIcon,
        type: 'image/png',
        sizes: '512x512',
        purpose: 'maskable',
      },
    ],
  };
}
