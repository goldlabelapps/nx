import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getVideoBySlug, getAllVideos, getVideoStaticSlugs } from "@/lib/videos";
import { VideoLayout } from "@/components/video/VideoLayout";
import { siteConfig } from "@/config";
import { getFeaturedImageUrl } from "@/lib/images";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getVideoStaticSlugs();
  return slugs;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const video = getVideoBySlug(slug);

  if (!video) {
    return {
      title: `Video Not Found — ${siteConfig.brand.name}`,
    };
  }

  const title = `${video.title} | ${siteConfig.brand.name} Videos`;
  const description = video.description || siteConfig.metadata.tagline;
  const featuredImageUrl = getFeaturedImageUrl({
    image: video.image || video.featuredImage,
    slug: video.id,
    tags: video.tags,
    category: video.category,
  });

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "video.other",
      siteName: siteConfig.brand.name,
      url: `${siteConfig.metadata.siteUrl}/videos/${video.id}`,
      images: [
        {
          url: featuredImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      videos: [
        {
          url: `${siteConfig.metadata.siteUrl}${video.videoUrl}`,
          type: "video/mp4",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [featuredImageUrl],
    },
  };
}

export default async function VideoSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const video = getVideoBySlug(slug);

  if (!video) {
    notFound();
  }

  const allVideos = getAllVideos();

  return <VideoLayout videos={allVideos} currentVideo={video} />;
}
