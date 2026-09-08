import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blogs";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { siteConfig } from "@/config";
import { getFeaturedImageUrl } from "@/lib/images";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Calendar, ArrowUpRight, Clock } from "lucide-react";

const featuredImageUrl = getFeaturedImageUrl({ slug: "nx" });

export const metadata: Metadata = {
  title: `Blog | ${siteConfig.brand.name}`,
  description:
    siteConfig.blogs?.subtitle ||
    "Read blogs and guides about building with this template.",
  openGraph: {
    title: `Blog | ${siteConfig.brand.name}`,
    description:
      siteConfig.blogs?.subtitle ||
      "Read blogs and guides about building with this template.",
    type: "website",
    siteName: siteConfig.brand.name,
    url: `${siteConfig.metadata.siteUrl}/blog`,
    images: [
      {
        url: featuredImageUrl,
        width: 1200,
        height: 630,
        alt: `Blog — ${siteConfig.brand.name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Blog | ${siteConfig.brand.name}`,
    description:
      siteConfig.blogs?.subtitle ||
      "Read blogs and guides about building with this template.",
    images: [featuredImageUrl],
  },
};

export default function BlogsIndexPage() {
  const allPosts = getAllPosts();

  const blogHubPost: BlogPost = {
    id: "nx",
    title: siteConfig.blogs?.title || "Blogs & Articles",
    date: "Sep 2026",
    summary:
      siteConfig.blogs?.subtitle ||
      "Read blogs, deep-dives, and guides about building with this template.",
    category: "Architecture",
    href: "/blog",
    tags: ["Architecture", "Flash", "React", "Next.js", "Redux", "TypeScript"],
    content: "",
  };

  return (
    <ArticleLayout posts={allPosts} currentPost={blogHubPost}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
        {allPosts.map((post) => (
          <Link key={post.id} href={post.href} className="block group">
            <Card
              variant="default"
              className="h-full flex flex-col justify-between p-5 sm:p-6 bg-slate-50/70 dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-700/80 hover:border-[#0f172a]/40 dark:hover:border-slate-500 hover:shadow-md transition-all duration-200 rounded-2xl"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold border bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-mono">
                    <Calendar className="h-3.5 w-3.5 text-slate-400" />
                    <span>{post.date}</span>
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#0f172a] dark:group-hover:text-amber-400 transition-colors line-clamp-2 mb-2">
                  {post.title}
                </h3>

                {post.summary && (
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-4">
                    {post.summary}
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-[#0f172a] dark:group-hover:text-amber-400">
                <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-[11px] font-mono">
                  {post.readTime && (
                    <>
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime}</span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <span>Read article</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#0f172a] dark:group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </ArticleLayout>
  );
}
