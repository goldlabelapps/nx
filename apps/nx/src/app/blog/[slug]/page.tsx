import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts, getPostStaticSlugs } from "@/lib/blogs";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { MarkdownContent } from "@/components/guide/MarkdownContent";
import { siteConfig } from "@/config";
import { getFeaturedImageUrl } from "@/lib/images";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return getPostStaticSlugs();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: `Blog Not Found — ${siteConfig.brand.name}`,
    };
  }

  const title = `${post.title} | ${siteConfig.brand.name} Blogs`;
  const description = post.summary || siteConfig.metadata.tagline;
  const featuredImageUrl = getFeaturedImageUrl({
    image: post.image || post.featuredImage,
    slug: post.id,
    tags: post.tags,
    category: post.category,
  });

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      siteName: siteConfig.brand.name,
      url: `${siteConfig.metadata.siteUrl}/blog/${post.id}`,
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

export default async function BlogSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllPosts();

  return (
    <ArticleLayout posts={allPosts} currentPost={post}>
      <MarkdownContent content={post.content || ""} />
    </ArticleLayout>
  );
}
