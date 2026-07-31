// @ts-ignore: side-effect import without type declarations
import "./globals.css";
// @ts-ignore: side-effect import without type declarations
import "mapbox-gl/dist/mapbox-gl.css";
import fs from 'fs';
import path from 'path';
import { UbereduxProvider } from './NX/Uberedux';

const tenant = process.env.NEXT_PUBLIC_TENANT || "free";
const configPath = path.join(process.cwd(), 'public', tenant, 'config.json');
const configRaw = fs.readFileSync(configPath, 'utf-8');
const config = JSON.parse(configRaw);
const { title, favicon } = config;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
        <link rel="icon" href={favicon} />
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
            {children}
          </UbereduxProvider>
        </div>
      </body>
    </html>
  );
}
