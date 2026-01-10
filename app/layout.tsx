import type { Metadata } from "next";

import "./goldlabel/styles.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Goldlabel",
  description: "A modern publishing platform built with Next.js",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteTitle = "NX";
  // const siteDescription = "by Goldlabel";
  const shortcutIcon = '/svg/favicon.svg';
  const appleTouchIcon = '/png/apple-touch-icon.png';

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href={shortcutIcon} />
        <link rel="shortcut icon" href={shortcutIcon} type="image/x-icon" />
        <link rel="apple-touch-icon" sizes="180x180" href={appleTouchIcon} />
        <meta name="theme-color" content="#C09F52" />
        <meta name="application-name" content={siteTitle} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="NX" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
