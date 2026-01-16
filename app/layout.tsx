import "./NX/styles.css";
import type { Metadata } from "next";
const project = process.env.NEXT_PUBLIC_PROJECT || "nx";
const config = (await import(`../public/${project}/config.mjs`)).default;
const { title, icon, description } = config;

export const metadata: Metadata = {
  title,
  description,
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
        <link rel="stylesheet" href={`/${project}/styles.css`} />
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
      <body>
        <div className="wrapper">
          {children}
        </div>
      </body>
    </html>
  );
}

