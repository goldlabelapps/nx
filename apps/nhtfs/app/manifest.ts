import type { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import { normalizeTenant } from './NX/lib/normalizeTenant';

export default function manifest(): MetadataRoute.Manifest {
  const tenant = normalizeTenant();
  const defaultTenant = 'nx';
  const tenantConfigPath = path.join(process.cwd(), 'public', tenant, 'config.json');
  const fallbackConfigPath = path.join(process.cwd(), 'public', defaultTenant, 'config.json');
  const hasTenantConfig = fs.existsSync(tenantConfigPath);
  const configPath = hasTenantConfig ? tenantConfigPath : fallbackConfigPath;
  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8')) as {
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
  const pwaBackground = configuredPwaBackground || themedPwaBackground || '#111111';
  const defaultIconPath = '/favicons/ios.png';
  const androidSvgIconPath = '/favicons/android-icon.svg';
  const androidMaskableIconPath = '/favicons/android-maskable-512.png';
  const androidSvgIconExists = fs.existsSync(path.join(process.cwd(), 'public', androidSvgIconPath.slice(1)));
  const androidMaskableIconExists = fs.existsSync(path.join(process.cwd(), 'public', androidMaskableIconPath.slice(1)));
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
