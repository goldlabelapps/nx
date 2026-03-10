import "./globals.css";
import type { Metadata } from "next";
import fs from 'fs';
import path from 'path';
import { UbereduxProvider } from './NX/Uberedux';
import RequireAuthWrapper from './NX/Paywall/components/RequireAuthWrapper';

const tenant = process.env.NEXT_PUBLIC_TENANT || "nx";
const configPath = path.join(process.cwd(), 'public', tenant, 'config.json');
const configRaw = fs.readFileSync(configPath, 'utf-8');
const config = JSON.parse(configRaw);
const { title, description, icons } = config;
const icon = icons?.light?.icon;
const favicon = icons?.light?.favicon;


export const metadata: Metadata = {
  title: `${title}, ${description}`,
  description,
  icons: {
    icon: favicon,
    shortcut: favicon,
    apple: icon,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const paywall = config.cartridges?.paywall?.enabled === true;

  return (
    <html lang="en">
      <head>
        <link rel="icon" href={favicon} />
        <meta
          name="theme-color"
          content={
            config.cartridges?.designSystem?.themes?.[
              config.cartridges?.designSystem?.defaultTheme || "light"
            ]?.background || "#971e1e"
          }
        />
        <link rel="manifest" href={`/${tenant}/manifest.json`} />
        <meta name="application-name" content={title} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={title} />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body>
        <div className="wrapper">
          <UbereduxProvider config={config}>
            {paywall ? (
              <RequireAuthWrapper config={config}>{children}</RequireAuthWrapper>
            ) : (
              children
            )}
          </UbereduxProvider>
        </div>
      </body>
    </html>
  );
}
