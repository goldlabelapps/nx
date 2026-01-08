import type { Metadata } from "next";
import "./goldlabel/styles.css";
import Header from "./goldlabel/components/Header";
import Footer from "./goldlabel/components/Footer";


export const metadata: Metadata = {
  title: "Goldlabel",
  description: "A modern content management and publishing platform built with Next.js",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const shortcutIcon = '/svg/favicon.svg';
  const appleTouchIcon = '/png/apple-touch-icon.png';

  // Navigation and doc logic removed
  const headerTitle = "NX";
  const headerDescription = "by Goldlabel";
  const navItems: any[] = [];

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href={shortcutIcon} />
        <link rel="shortcut icon" href={shortcutIcon} type="image/x-icon" />
        <link rel="apple-touch-icon" sizes="180x180" href={appleTouchIcon} />
        <meta name="theme-color" content="#C09F52" />
        <meta name="application-name" content="NX" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="NX" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body>
        <Header
          title={headerTitle}
          description={headerDescription}
        />
        {/* Firebase error handling removed as requested */}
        {children}
        <Footer />
      </body>
    </html>
  );
}
