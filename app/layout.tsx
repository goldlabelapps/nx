
import type { Metadata } from "next";
import "./goldlabel/styles.css";
import { Inter } from "next/font/google";
import config from "./goldlabel/goldlabel.config.mjs";
const inter = Inter({ subsets: ["latin"], display: "swap" });


const { title, icon, cartridges } = config;
const defaultTheme = cartridges.designSystem.defaultTheme;
const theme = cartridges.designSystem.themes[defaultTheme];
const primaryColor = theme.primary;

export const metadata: Metadata = {
  title,
  description: config.description,
  icons: {
    icon,
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
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href={icon} />
        <link rel="shortcut icon" href={icon} type="image/x-icon" />
        <link rel="apple-touch-icon" sizes="180x180" href={icon} />
        <meta name="theme-color" content={primaryColor} />
        <meta name="application-name" content={title} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={title} />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className={inter.className}>
        <div className="umbrella">
          {children}
        </div>
      </body>
    </html>
  );
}
