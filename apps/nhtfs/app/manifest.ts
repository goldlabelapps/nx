import type { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import nxConfig from '../public/nx/config.json';
import { fileURLToPath } from 'url';

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
  const defaultIconPath = '/favicons/ios.png';
  const androidSvgIconPath = '/favicons/android-icon.svg';
  const androidMaskableIconPath = '/favicons/android-maskable-512.png';
  const appPublicDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../public');
  const androidSvgIconExists = fs.existsSync(path.join(appPublicDir, androidSvgIconPath.slice(1)));
  const androidMaskableIconExists = fs.existsSync(path.join(appPublicDir, androidMaskableIconPath.slice(1)));
  const androidPrimaryIcon = androidSvgIconExists ? androidSvgIconPath : (androidMaskableIconExists ? androidMaskableIconPath : defaultIconPath);
  const androidPrimaryIconType = androidSvgIconExists ? 'image/svg+xml' : 'image/png';
  const androidPrimaryIconSizes = androidSvgIconExists ? 'any' : '512x512';
  const androidMaskableIcon = androidMaskableIconExists ? androidMaskableIconPath : defaultIconPath;

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
        src: androidPrimaryIcon,
        type: androidPrimaryIconType,
        sizes: androidPrimaryIconSizes,
        purpose: 'any',
      },
      {
        src: androidMaskableIcon,
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
