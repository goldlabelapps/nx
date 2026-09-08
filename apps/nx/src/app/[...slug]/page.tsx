import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getGuideBySlug, getAllGuides, getGuideStaticSlugs } from "@/lib/markdown";
import { GuideLayout } from "@/components/guide/GuideLayout";
import { MarkdownContent } from "@/components/guide/MarkdownContent";
import { siteConfig } from "@/config";
import { getFeaturedImageUrl } from "@/lib/images";

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateStaticParams() {
  return getGuideStaticSlugs();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    return {
      title: `Guide Not Found — ${siteConfig.brand.name}`,
    };
  }

  const title = `${guide.title} | ${siteConfig.brand.name} Docs`;
  const description = guide.description || siteConfig.metadata.tagline;
  const featuredImageUrl = getFeaturedImageUrl({
    image: guide.image || guide.smartImage,
    slug: guide.cleanSlug,
    tags: guide.tags,
    category: guide.category,
  });

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      siteName: siteConfig.brand.name,
      url: `${siteConfig.metadata.siteUrl}/${guide.cleanSlug}`,
      images: [
        {
          url: featuredImageUrl,
          width: 1200,
          height: 630,
          alt: title,
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

export default async function HowToSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  const allGuides = getAllGuides();

  return (
    <GuideLayout guides={allGuides} currentGuide={guide}>
      <MarkdownContent content={guide.content} hideFirstH1 filePath={guide.filePath} />
    </GuideLayout>
  );
}
