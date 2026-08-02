import type { Metadata } from "next";
import '@nx/design-system/styles.css';
import '@nx/design-system/site-layout.css';
import fs from 'fs';
import path from 'path';
import { AppShell, DesignSystemProvider } from '@nx/design-system';
import { UbereduxProvider } from './NX/Uberedux';
import { normalizeTenant } from './NX/lib/normalizeTenant';

const tenant = normalizeTenant();
const defaultTenant = 'nx';
const tenantConfigPath = path.join(process.cwd(), 'public', tenant, 'config.json');
const fallbackConfigPath = path.join(process.cwd(), 'public', defaultTenant, 'config.json');
const hasTenantConfig = fs.existsSync(tenantConfigPath);
const resolvedTenant = hasTenantConfig ? tenant : defaultTenant;
const configPath = hasTenantConfig ? tenantConfigPath : fallbackConfigPath;
const configRaw = fs.readFileSync(configPath, 'utf-8');
const config = JSON.parse(configRaw);
const { title, description, favicon } = config;
const configuredDesignSystem = config?.cartridges?.designSystem?.system;
const designSystemId = typeof configuredDesignSystem === 'string' && configuredDesignSystem.trim()
  ? configuredDesignSystem.trim()
  : 'wireframe';

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

  return new URL('https://nx');
}

const metadataBase = resolveMetadataBase(config?.url);

export const metadata: Metadata = {
  metadataBase,
  title: `${title}, ${description}`,
  description,
  manifest: '/manifest.webmanifest',
  icons: {
    icon: favicon,
    shortcut: favicon,
    apple: favicon,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-design-system={designSystemId}>
      <head>
        <link rel="icon" href={favicon} />
        <meta name="application-name" content={title} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={title} />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body>
        <div className="wrapper">
          <DesignSystemProvider mode="light">
            <UbereduxProvider config={config}>
              <AppShell>{children}</AppShell>
            </UbereduxProvider>
          </DesignSystemProvider>
        </div>
      </body>
    </html>
  );
}
