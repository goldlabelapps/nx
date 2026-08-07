import type { Metadata, Viewport } from "next";
import '@nx/design-system/styles.css';
import '@nx/design-system/site-layout.css';
import fs from 'fs';
import path from 'path';
import { AppShell, DesignSystemProvider } from '@nx/design-system';
import { UbereduxProvider } from '@nx/uberedux';
import Init from './Init';
import nxConfig from '../public/nx/config.json';
import { fileURLToPath } from 'url';

const config = nxConfig;
const title = typeof config.siteName === 'string' && config.siteName.trim()
  ? config.siteName
  : 'NX°';
const description = typeof config.description === 'string' && config.description.trim()
  ? config.description
  : '';
const favicon = typeof config.favicon === 'string' && config.favicon.trim()
  ? config.favicon
  : '/favicons/favicon.svg';
const configuredDesignSystem = config?.cartridges?.designSystem?.system;
const designSystemId = typeof configuredDesignSystem === 'string' && configuredDesignSystem.trim()
  ? configuredDesignSystem.trim()
  : 'wireframe';
const configuredPwaBackground = typeof config?.cartridges?.designSystem?.pwa?.background === 'string'
  ? config.cartridges.designSystem.pwa.background.trim()
  : '';
const defaultThemeId = typeof config?.cartridges?.designSystem?.defaultTheme === 'string'
  ? config.cartridges.designSystem.defaultTheme.trim()
  : '';
const themedPwaBackground = defaultThemeId && typeof config?.cartridges?.designSystem?.themes?.[defaultThemeId as keyof typeof config.cartridges.designSystem.themes]?.background === 'string'
  ? config.cartridges.designSystem.themes[defaultThemeId as keyof typeof config.cartridges.designSystem.themes].background.trim()
  : '';
const pwaBackground = configuredPwaBackground || themedPwaBackground || '#111111';
const defaultFavicon = typeof favicon === 'string' && favicon.trim()
  ? favicon
  : '/favicons/favicon.svg';
const defaultIconPath = '/favicons/ios.png';
const appleTouchIconPath = '/favicons/apple-touch-icon.png';
const appPublicDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../public');
const appleTouchIcon = fs.existsSync(path.join(appPublicDir, appleTouchIconPath.slice(1)))
  ? appleTouchIconPath
  : defaultIconPath;

function resolveMetadataBase(input: unknown): URL {
  if (typeof input === 'string') {
    const value = input.trim();
    if (value) {
      try {
        return new URL(value);
      } catch {
        try {
          return new URL(`https://${value.replace(/^\/+/, '')}`);
        } catch {
          // Fall through to default URL.
        }
      }
    }
  }

  return new URL('https://goldlabel.pro');
}

const metadataBase = resolveMetadataBase(config?.url);

export const metadata: Metadata = {
  metadataBase,
  title: `${title}, ${description}`,
  description,
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      {
        url: defaultFavicon,
        type: defaultFavicon.endsWith('.svg') ? 'image/svg+xml' : 'image/png',
        sizes: defaultFavicon.endsWith('.svg') ? 'any' : '32x32',
      },
      {
        url: appleTouchIcon,
        type: 'image/png',
        sizes: '32x32',
      },
    ],
    shortcut: defaultFavicon,
    apple: appleTouchIcon,
  },
};

export const viewport: Viewport = {
  themeColor: pwaBackground,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-design-system={designSystemId}>
      <head>
        <link rel="icon" href={defaultFavicon} type={defaultFavicon.endsWith('.svg') ? 'image/svg+xml' : 'image/png'} sizes={defaultFavicon.endsWith('.svg') ? 'any' : '32x32'} />
        <link rel="icon" href="/favicons/favicon_dark.svg" type="image/svg+xml" media="(prefers-color-scheme: dark)" sizes="any" />
        <link rel="icon" href="/favicons/favicon_light.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicons/favicon_dark.png" type="image/png" media="(prefers-color-scheme: dark)" sizes="32x32" />
        <link rel="apple-touch-icon" href={appleTouchIcon} />
        <meta name="theme-color" content={pwaBackground} />
        <meta name="application-name" content={title} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={title} />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body>
        <div className="wrapper">
          <DesignSystemProvider>
            <UbereduxProvider config={config}>
              <Init />
              <AppShell>{children}</AppShell>
            </UbereduxProvider>
          </DesignSystemProvider>
        </div>
      </body>
    </html>
  );
}
