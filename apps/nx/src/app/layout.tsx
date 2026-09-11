import { Suspense } from "react";
import Script from "next/script";
import { siteConfig } from "@/config/site.config";
import { nxConfig } from "@/lib/nxConfig";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/footer/Footer";
import { AppProviders } from "@/components/providers/AppProviders";
import "./globals.css";


export const viewport: Viewport = {
  themeColor: siteConfig.pwa.themeColor,
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: siteConfig.metadata.title,
  description: siteConfig.metadata.tagline,
  metadataBase: new URL(siteConfig.metadata.siteUrl),
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: siteConfig.pwa.shortName,
  },
  icons: {
    icon: [
      { url: siteConfig.pwa.appleTouchIcon || "/png/favicon.png", sizes: "512x512", type: "image/png" },
      { url: siteConfig.pwa.favicon || "/svg/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: siteConfig.pwa.appleTouchIcon || "/png/favicon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: siteConfig.metadata.title,
    description: siteConfig.metadata.tagline,
    url: siteConfig.metadata.siteUrl,
    siteName: siteConfig.brand.name,
    type: "website",
    images: [
      {
        url: siteConfig.metadata.ogImage || "/png/open-graph.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.brand.name} — ${siteConfig.metadata.title}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.metadata.title,
    description: siteConfig.metadata.tagline,
    creator: siteConfig.metadata.twitterHandle,
    images: [siteConfig.metadata.twitterImage || "/png/open-graph.png"],
  },
};

const initialThemeClass = nxConfig.theme.defaultTheme === "dark" ? "dark" : "";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={initialThemeClass} style={{ colorScheme: nxConfig.theme.defaultTheme }} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <Script
          id="theme-initializer"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var stored=localStorage.getItem('theme');var def='${nxConfig.theme.defaultTheme}';var res=stored==='dark'||stored==='light'?stored:(stored==='system'?(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):def);if(res==='dark'){document.documentElement.classList.add('dark');document.documentElement.style.colorScheme='dark';}else{document.documentElement.classList.remove('dark');document.documentElement.style.colorScheme='light';}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white dark:bg-[#0F172A] text-slate-900 dark:text-slate-100 antialiased selection:bg-[#0f172a] dark:selection:bg-slate-700 selection:text-white font-sans transition-colors duration-200">
        <AppProviders>
          <Suspense fallback={null}>
            <Header iconOnly />
          </Suspense>
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
