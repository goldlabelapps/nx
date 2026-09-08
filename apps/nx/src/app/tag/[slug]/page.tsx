import type { Metadata } from "next";
import { profileData, TagInfo } from "@/data/profileData";
import { getAllGuides } from "@/lib/markdown";
import { videosConfig } from "@/config/videos.config";
import { FeaturedImage } from "@goldlabelapps/theme";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Tag, Briefcase, Calendar, CheckCircle, BookOpen, Video, ArrowRight } from "lucide-react";
import { QuickContactSection } from "@/components/contact/QuickContactSection";
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

function getTagData(slug: string): TagInfo {
  const profileTag = profileData.tags.find(
    (t) => t.slug === slug || slugifyTag(t.slug) === slug || slugifyTag(t.name) === slug
  );

  if (profileTag) return profileTag;

  const formattedName = formatTagTitle(slug);
  return {
    slug,
    name: formattedName,
    category: "core",
    eraId: "era-6",
    description: `Documentation, guides, and projects tagged with "${formattedName}".`,
  };
}

export function generateStaticParams() {
  const slugs = new Set<string>();

  profileData.tags.forEach((t) => slugs.add(t.slug));

  const guides = getAllGuides();
  guides.forEach((g) => {
    g.tags?.forEach((t) => {
      const s = slugifyTag(t);
      if (s) slugs.add(s);
    });
  });

  videosConfig.items.forEach((v) => {
    v.tags?.forEach((t) => {
      const s = slugifyTag(t);
      if (s) slugs.add(s);
    });
  });

  return Array.from(slugs).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tag = getTagData(slug);
  const title = `${tag.name} Experience & Tagged Content — Goldlabel`;
  const description = tag.description;
  const featuredImageUrl = getFeaturedImageUrl({
    image: tag.image || tag.featuredImage,
    slug: tag.slug || slug,
    category: tag.category,
  });

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: siteConfig.brand.name,
      url: `${siteConfig.metadata.siteUrl}/tag/${slug}`,
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

export default async function TagPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const tagFromProfile = profileData.tags.find(
    (t) => t.slug === slug || slugifyTag(t.slug) === slug || slugifyTag(t.name) === slug
  );

  const cleanSlugQuery = slug.replace(/-/g, " ");

  // Find matching guides
  const allGuides = getAllGuides();
  const matchingGuides = allGuides.filter(
    (g) =>
      g.tags?.some((t) => slugifyTag(t) === slug || t.toLowerCase() === cleanSlugQuery) ||
      g.cleanSlug.includes(slug) ||
      g.title.toLowerCase().includes(cleanSlugQuery)
  );

  // Find matching roles
  const matchingRoles = profileData.roles.filter(
    (role) =>
      role.skills.some(
        (s) => slugifyTag(s) === slug || s.toLowerCase().includes(cleanSlugQuery)
      ) ||
      role.summary.toLowerCase().includes(slug) ||
      role.summary.toLowerCase().includes(cleanSlugQuery) ||
      role.highlights.some((h) => h.toLowerCase().includes(slug) || h.toLowerCase().includes(cleanSlugQuery))
  );

  // Find matching videos
  const matchingVideos = videosConfig.items.filter((v) =>
    v.tags?.some((t) => slugifyTag(t) === slug || t.toLowerCase() === cleanSlugQuery)
  );

  // If no tag found anywhere and no content matches, 404
  if (!tagFromProfile && matchingGuides.length === 0 && matchingRoles.length === 0 && matchingVideos.length === 0) {
    notFound();
  }

  const tag = getTagData(slug);
  const era = profileData.eras.find((e) => e.id === tag.eraId);
  const tagImg = tag.image || tag.featuredImage;
  const tagFeaturedImageProp = tagImg ? { src: tagImg } : undefined;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 sm:pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Tag Header Card */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <FeaturedImage
            image={tagFeaturedImageProp}
            slug={slug || "nx"}
            alt={tag.name}
            height={260}
            flushTop
          />
          <div className="p-8 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-indigo-200 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider">
              <Tag className="w-3.5 h-3.5" />
              <span>Tagged Topic / Skill Page</span>
            </div>

            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">
              {tag.name}
            </h1>

            {era && (
              <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                Origin Web Era: {era.name} ({era.years})
              </div>
            )}

            <p className="text-lg text-slate-600 dark:text-slate-300">
              {tag.description}
            </p>
          </div>
        </div>

        {/* Matching Guides / Articles */}
        {matchingGuides.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-indigo-600" />
              <span>Guides & Documentation ({matchingGuides.length})</span>
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {matchingGuides.map((guide) => (
                <Link
                  key={guide.cleanSlug}
                  href={guide.cleanSlug === "index" ? "/" : `/${guide.cleanSlug}`}
                  className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-indigo-500 dark:hover:border-indigo-500 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      {guide.category || "Guide"}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {guide.title}
                    </h3>
                    {guide.description && (
                      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                        {guide.description}
                      </p>
                    )}
                  </div>
                  <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Roles and Projects using this tag */}
        {matchingRoles.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-indigo-600" />
              <span>Projects & Experience ({matchingRoles.length})</span>
            </h2>

            {matchingRoles.map((role) => (
              <div
                key={role.id}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {role.title} <span className="text-indigo-600">@ {role.company}</span>
                    </h3>
                    <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                      <Calendar className="w-3 h-3" />
                      <span>{role.period}</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-slate-700 dark:text-slate-300">
                  {role.summary}
                </p>

                <ul className="space-y-1">
                  {role.highlights.map((h, i) => (
                    <li key={i} className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Matching Videos */}
        {matchingVideos.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Video className="w-6 h-6 text-indigo-600" />
              <span>Videos featuring {tag.name} ({matchingVideos.length})</span>
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {matchingVideos.map((video) => (
                <div
                  key={video.id}
                  className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2"
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    {video.badge}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {video.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {video.tagline}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Fallback if no matching content section rendered */}
        {matchingGuides.length === 0 && matchingRoles.length === 0 && matchingVideos.length === 0 && (
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border text-slate-500">
            No specific items currently mapped to this tag.
          </div>
        )}

        {/* Direct Contact Section */}
        <QuickContactSection />
      </div>
    </div>
  );
}

