import type { Metadata } from "next";
import { FeaturedImage } from "@goldlabelapps/theme";
import { VideoSection } from "@/components/showcase/VideoSection";
import { DownloadBanner } from "@/components/download/DownloadBanner";
import { siteConfig } from "@/config";
import { getFeaturedImageUrl } from "@/lib/images";

const featuredImageUrl = getFeaturedImageUrl({ slug: "nx" });

export const metadata: Metadata = {
  title: `Videos | ${siteConfig.brand.name}`,
  description:
    siteConfig.videos?.subtitle ||
    "Watch live demonstration recordings of the app's core flows, dashboard, and mobile experience.",
  openGraph: {
    title: `Videos | ${siteConfig.brand.name}`,
    description:
      siteConfig.videos?.subtitle ||
      "Watch live demonstration recordings of the app's core flows, dashboard, and mobile experience.",
    type: "website",
    siteName: siteConfig.brand.name,
    url: `${siteConfig.metadata.siteUrl}/videos`,
    images: [
      {
        url: featuredImageUrl,
        width: 1200,
        height: 630,
        alt: `Videos — ${siteConfig.brand.name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Videos | ${siteConfig.brand.name}`,
    description:
      siteConfig.videos?.subtitle ||
      "Watch live demonstration recordings of the app's core flows, dashboard, and mobile experience.",
    images: [featuredImageUrl],
  },
};

export default function VideosIndexPage() {
  return (
    <div className="pt-16 sm:pt-20 pb-12 px-4 min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-5xl mx-auto pt-4">
        <FeaturedImage slug="nx" height={300} />
      </div>
      <VideoSection />
      <DownloadBanner />
    </div>
  );
}
