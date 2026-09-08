import type { Metadata } from "next";
import { profileData } from "@/data/profileData";
import { getAllGuides } from "@/lib/markdown";
import { videosConfig } from "@/config/videos.config";
import { FeaturedImage } from "@goldlabelapps/theme";
import Link from "next/link";
import { Tag as TagIcon } from "lucide-react";
import { siteConfig } from "@/config";
import { getFeaturedImageUrl } from "@/lib/images";

function slugifyTag(t: string): string {
  return t
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function formatTagTitle(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

const tagIndexTitle = `All Tags — ${siteConfig.brand.name}`;
const tagIndexDesc = "Browse guides, documentation, skills, and projects by topic tag.";
const featuredImageUrl = getFeaturedImageUrl({ slug: "nx" });

export const metadata: Metadata = {
  title: tagIndexTitle,
  description: tagIndexDesc,
  openGraph: {
    title: tagIndexTitle,
    description: tagIndexDesc,
    type: "website",
    siteName: siteConfig.brand.name,
    url: `${siteConfig.metadata.siteUrl}/tag`,
    images: [
      {
        url: featuredImageUrl,
        width: 1200,
        height: 630,
        alt: tagIndexTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: tagIndexTitle,
    description: tagIndexDesc,
    images: [featuredImageUrl],
  },
};

export default async function TagIndexPage() {
  const tagMap = new Map<string, { slug: string; name: string; count: number; category: string }>();

  // Profile tags
  profileData.tags.forEach((t) => {
    tagMap.set(t.slug, {
      slug: t.slug,
      name: t.name,
      count: 0,
      category: t.category,
    });
  });

  // Collect guide tags
  const guides = getAllGuides();
  guides.forEach((g) => {
    g.tags?.forEach((t) => {
      const slug = slugifyTag(t);
      if (!slug) return;
      const existing = tagMap.get(slug);
      if (existing) {
        existing.count += 1;
      } else {
        tagMap.set(slug, {
          slug,
          name: formatTagTitle(slug),
          count: 1,
          category: "guide",
        });
      }
    });
  });

  // Count role skills
  profileData.roles.forEach((r) => {
    r.skills.forEach((s) => {
      const slug = slugifyTag(s);
      if (!slug) return;
      const existing = tagMap.get(slug);
      if (existing) {
        existing.count += 1;
      }
    });
  });

  // Count video tags
  videosConfig.items.forEach((v) => {
    v.tags?.forEach((t) => {
      const slug = slugifyTag(t);
      if (!slug) return;
      const existing = tagMap.get(slug);
      if (existing) {
        existing.count += 1;
      }
    });
  });

  const allTags = Array.from(tagMap.values()).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 sm:pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <FeaturedImage slug="nx" height={260} />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider border border-indigo-200 dark:border-indigo-800">
            <TagIcon className="w-3.5 h-3.5" />
            <span>Tag Directory</span>
          </div>

          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">
            Browse by Topic & Technology
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-300">
            Explore guides, documentation, skills, and projects categorized by tag.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {allTags.map((t) => (
            <Link
              key={t.slug}
              href={`/tag/${t.slug}`}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-indigo-500 dark:hover:border-indigo-500 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-2.5">
                <TagIcon className="w-4 h-4 text-indigo-500 shrink-0" />
                <span className="font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {t.name}
                </span>
              </div>
              {t.count > 0 && (
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  {t.count}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
