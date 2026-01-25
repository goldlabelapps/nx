import type { Metadata } from "next";
import "./globals.css";
import fs from 'fs';
import path from 'path';
// import { UbereduxProvider } from './NX/Uberedux';

const project = process.env.NEXT_PUBLIC_PROJECT || "nx";
const configPath = path.join(process.cwd(), 'public', project, 'config.json');
const configRaw = fs.readFileSync(configPath, 'utf-8');
const config = JSON.parse(configRaw);
const { title, icon, favicon, description } = config;

export const metadata: Metadata = {
  title: `${title}, ${description}`,
  description,
  icons: {
    icon: favicon,
    shortcut: icon,
    apple: icon,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <head>
        <link rel="icon" href={favicon} />
        <meta name="theme-color" content={"#FFF"} />
        <link rel="manifest" href={`/${project}/manifest.json`} />
        <meta name="application-name" content={title} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={title} />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body>
        <div className="wrapper">
          {/* <UbereduxProvider config={config}>
            {children}
          </UbereduxProvider> */}

          {children}

        </div>
      </body>
    </html>
  );
}

