import type { Metadata } from "next";
import "./globals.css";
const project = process.env.NEXT_PUBLIC_PROJECT || "nx";
const config = (await import(`../public/${project}/config.json`)).default;
const { title, icon, favicon, description } = config;
import { UbereduxProvider } from './NX/Uberedux';

export const metadata: Metadata = {
  title,
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
        <link rel="manifest" href={`/${project}/manifest.json`} />
        <link rel="icon" href={favicon} />
        <link rel="shortcut icon" href={favicon} type="image/svg+xml" />
        <meta name="theme-color" content={"#FFF"} />
        <meta name="application-name" content={title} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={title} />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body>
        <div className="wrapper">
          <UbereduxProvider>{children}</UbereduxProvider>
        </div>
      </body>
    </html>
  );
}

