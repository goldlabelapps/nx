
import type { Metadata } from "next";
const project = process.env.NEXT_PUBLIC_PROJECT;
import(`../public/${project}/${project}.css`);
import { Inter } from "next/font/google";
const config = (await import(`../public/${project}/config.mjs`)).default;
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
        <link rel="manifest" href={`/${project}/manifest.json`} />
        <link rel="icon" href={`/${project}/favicon.svg`} />
        <link rel="shortcut icon" href={`/${project}/favicon.svg`} type="image/svg+xml" />
        <link rel="apple-touch-icon" sizes="180x180" href={`/${project}/favicon.svg`} />
        <meta name="theme-color" content={"#000"} />
        <meta name="application-name" content={title} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={title} />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className={inter.className}>
        <div className="wrapper">
          <div className="main-content-green-border">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
