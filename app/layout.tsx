import type { Metadata } from "next";
import "@/goldlabel/styles.css";
import Header from "@/goldlabel/components/Header";
import Footer from "@/goldlabel/components/Footer";
import { getAllDocs } from "@/goldlabel/lib/firestore-service";

export const metadata: Metadata = {
  title: "UK Medical Cannabis",
  description: "UK medical cannabis listings covering products, suppliers, and options to buy online with UK delivery",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const shortcutIcon = '/svg/favicon.svg';
  const appleTouchIcon = '/png/favicon.png';

  // Fetch all docs for navigation, handle errors gracefully
  let allDocs: any[] = [];
  let firebaseError: { code: string; message: string; indexUrl?: string } | null = null;

  try {
    allDocs = await getAllDocs();
  } catch (error: any) {
    console.error('Firebase connection error in layout:', error);
    firebaseError = {
      code: error?.code || 'UNKNOWN',
      message: error?.message || 'Failed to connect to Firebase',
      indexUrl: error?.indexUrl
    };
  }

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href={shortcutIcon} />
        <link rel="shortcut icon" href={shortcutIcon} type="image/x-icon" />
        <link rel="apple-touch-icon" sizes="180x180" href={appleTouchIcon} />
        <meta name="theme-color" content="#000" />
        <meta name="application-name" content="Listingslab" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Listingslab" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body>
        <Header
          title={metadata.title as string}
          description={metadata.description as string}
          navItems={allDocs}
        />
        {firebaseError && (
          <div className="firebase-error-banner">
            <div className="firebase-error-content">
              <span className="firebase-error-icon">⚠️</span>
              <div className="firebase-error-details">
                <strong>Firebase Connection Issue</strong>
                <p>{firebaseError.message}</p>
                {firebaseError.indexUrl && (
                  <a
                    href={firebaseError.indexUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="firebase-error-link"
                  >
                    Create Required Index →
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
        {children}
        <Footer />
      </body>
    </html>
  );
}
