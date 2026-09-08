"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FeaturedImage } from "@goldlabelapps/theme";
import {
  Calendar,
  Clock,
  Home,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Search,
  X,
  FileText,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { GodModeBar } from "@/components/auth/GodModeBar";

interface ArticleLayoutProps {
  posts: BlogPost[];
  currentPost: BlogPost;
  children: React.ReactNode;
}

export function ArticleLayout({ posts, currentPost, children }: ArticleLayoutProps) {
  const pathname = usePathname();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const isBlogIndex = pathname === "/blog" || currentPost.href === "/blog";
  const postImg = currentPost.image || currentPost.featuredImage;
  const featuredImageProp = postImg ? { src: postImg } : undefined;

  const currentIndex = posts.findIndex((p) => p.id === currentPost.id);
  const prevPost = !isBlogIndex && currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextPost =
    !isBlogIndex && currentIndex >= 0 && currentIndex < posts.length - 1
      ? posts[currentIndex + 1]
      : null;

  const groupedPosts = useMemo(() => {
    return posts.reduce<Record<string, BlogPost[]>>((acc, post) => {
      const cat = post.category || "General";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(post);
      return acc;
    }, {});
  }, [posts]);

  const categories = useMemo(() => Object.keys(groupedPosts), [groupedPosts]);

  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    const activeCat = currentPost.category || categories[0] || "General";
    categories.forEach((cat) => {
      initial[cat] = cat === activeCat || isBlogIndex;
    });
    return initial;
  });

  const toggleCategory = (cat: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [cat]: !prev[cat],
    }));
  };

  const expandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    categories.forEach((cat) => (allExpanded[cat] = true));
    setExpandedCategories(allExpanded);
  };

  const collapseAll = () => {
    const allCollapsed: Record<string, boolean> = {};
    const activeCat = currentPost.category || categories[0] || "General";
    categories.forEach((cat) => (allCollapsed[cat] = cat === activeCat));
    setExpandedCategories(allCollapsed);
  };

  const isSearching = searchQuery.trim().length > 0;
  const filteredGroupedPosts = useMemo(() => {
    if (!isSearching) return groupedPosts;
    const q = searchQuery.toLowerCase();
    const result: Record<string, BlogPost[]> = {};

    categories.forEach((cat) => {
      const matching = groupedPosts[cat]?.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          (p.summary && p.summary.toLowerCase().includes(q)) ||
          p.tags?.some((t) => t.toLowerCase().includes(q))
      );
      if (matching && matching.length > 0) {
        result[cat] = matching;
      }
    });

    return result;
  }, [searchQuery, groupedPosts, categories, isSearching]);

  const filteredCategories = useMemo(() => Object.keys(filteredGroupedPosts), [
    filteredGroupedPosts,
  ]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Bar */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 py-4 mb-4 border-b border-slate-200/80 dark:border-slate-800"
        >
          <Link
            href="/"
            className="hover:text-[#0f172a] dark:hover:text-white transition-colors flex items-center gap-1 font-medium shrink-0"
          >
            <Home className="h-3.5 w-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
          {isBlogIndex ? (
            <span className="font-semibold text-slate-900 dark:text-white truncate">
              Blog
            </span>
          ) : (
            <>
              <Link
                href="/blog"
                className="hover:text-[#0f172a] dark:hover:text-white transition-colors font-semibold shrink-0"
              >
                Blog
              </Link>
              {currentPost.category && (
                <>
                  <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <Link
                    href="/blog"
                    className="hover:text-[#0f172a] dark:hover:text-white transition-colors text-slate-600 dark:text-slate-400 font-medium shrink-0"
                  >
                    {currentPost.category}
                  </Link>
                </>
              )}
              <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              <span className="font-semibold text-slate-900 dark:text-white truncate max-w-[180px] sm:max-w-none">
                {currentPost.title}
              </span>
            </>
          )}
        </nav>

        {/* 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar: Compact Accordion + Filter */}
          <aside className="lg:col-span-3 lg:sticky lg:top-24 space-y-4 pr-1">
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-4 sm:p-5 shadow-sm space-y-3">
              {/* Sidebar Header / Mobile Toggle Button */}
              <button
                type="button"
                onClick={() => setIsMobileNavOpen((prev) => !prev)}
                className="w-full flex items-center justify-between gap-2 text-left cursor-pointer lg:cursor-default"
                aria-expanded={isMobileNavOpen}
                aria-label="Toggle navigation menu"
              >
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#0f172a]" />
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
                    Blogs Navigation
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 lg:hidden text-slate-500">
                  <span className="text-[11px] font-semibold">
                    {isMobileNavOpen ? "Hide" : "Show"}
                  </span>
                  {isMobileNavOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </div>
              </button>

              {/* Sidebar Container */}
              <div
                className={cn(
                  "space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800",
                  isMobileNavOpen ? "block" : "hidden lg:block"
                )}
              >
                {/* Search Filter Input */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`Filter ${posts.length} blogs...`}
                    className="w-full pl-8 pr-7 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-[#0f172a] dark:focus:border-slate-500 focus:bg-white dark:focus:bg-slate-800 transition-all"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                {/* Expand / Collapse Controls */}
                {!isSearching && (
                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 px-1 pt-1">
                    <span className="font-semibold text-slate-400">
                      {categories.length} Sections ({posts.length} blogs)
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={expandAll}
                        className="hover:text-[#0f172a] dark:hover:text-white transition-colors font-medium cursor-pointer"
                      >
                        Expand
                      </button>
                      <span>•</span>
                      <button
                        type="button"
                        onClick={collapseAll}
                        className="hover:text-[#0f172a] dark:hover:text-white transition-colors font-medium cursor-pointer"
                      >
                        Collapse
                      </button>
                    </div>
                  </div>
                )}

                {/* Categorized Navigation List */}
                <div className="space-y-2 pt-1">
                  {filteredCategories.length === 0 ? (
                    <div className="py-6 text-center text-xs text-slate-500 dark:text-slate-400">
                      No blogs match &quot;{searchQuery}&quot;
                    </div>
                  ) : (
                    filteredCategories.map((cat) => {
                      const catPosts = filteredGroupedPosts[cat] || [];
                      const isExpanded = isSearching || Boolean(expandedCategories[cat]);

                      return (
                        <div
                          key={cat}
                          className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 overflow-hidden transition-all"
                        >
                          {/* Accordion Header */}
                          <button
                            type="button"
                            onClick={() => toggleCategory(cat)}
                            className="w-full flex items-center justify-between p-2.5 text-left hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-colors cursor-pointer"
                          >
                            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 truncate pr-2">
                              {cat}
                            </span>
                            <div className="flex items-center gap-1.5 shrink-0 text-slate-400">
                              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300">
                                {catPosts.length}
                              </span>
                              <ChevronRight
                                className={cn(
                                  "h-3.5 w-3.5 transition-transform duration-200",
                                  isExpanded && "rotate-90 text-[#0f172a]"
                                )}
                              />
                            </div>
                          </button>

                          {/* Accordion Content Links */}
                          {isExpanded && (
                            <nav className="p-1.5 space-y-0.5 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                              {catPosts.map((post) => {
                                const isActive =
                                  pathname === post.href ||
                                  pathname === `/blog/${post.id}` ||
                                  currentPost.id === post.id;

                                return (
                                  <Link
                                    key={post.id}
                                    href={post.href}
                                    onClick={() => setIsMobileNavOpen(false)}
                                    className={cn(
                                      "flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs font-medium transition-colors",
                                      isActive
                                        ? "bg-[#0f172a] dark:bg-amber-500 text-white dark:text-slate-950 font-bold shadow-sm"
                                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800"
                                    )}
                                  >
                                    <FileText
                                      className={cn(
                                        "h-3.5 w-3.5 shrink-0",
                                        isActive ? "text-white dark:text-slate-950" : "text-slate-400"
                                      )}
                                    />
                                    <span className="truncate">{post.title}</span>
                                  </Link>
                                );
                              })}
                            </nav>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Article Content */}
          <main className="lg:col-span-9 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
            <FeaturedImage
              image={featuredImageProp}
              slug={currentPost.image || currentPost.featuredImage || currentPost.id || "nx"}
              alt={currentPost.title}
              height={280}
              flushTop
            />
            <div className="p-6 sm:p-10">
              <header className="pb-6 mb-8 border-b border-slate-200/80 dark:border-slate-800">
                {(currentPost.date || currentPost.readTime) && (
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    {currentPost.date && (
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-mono">
                        <Calendar className="h-3.5 w-3.5 text-slate-400" />
                        <span>{currentPost.date}</span>
                      </div>
                    )}
                    {currentPost.readTime && (
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-mono">
                        <Clock className="h-3.5 w-3.5 text-slate-400" />
                        <span>{currentPost.readTime}</span>
                      </div>
                    )}
                  </div>
                )}

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {currentPost.title}
                </h1>
                {currentPost.summary && (
                  <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    {currentPost.summary}
                  </p>
                )}
              </header>

              {/* Rendered Markdown Body / Content */}
              <div>{children}</div>

              {currentPost.tags && currentPost.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-800">
                  {currentPost.tags.map((tag) => {
                    const tagSlug = tag
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/(^-|-$)/g, "");
                    return (
                      <Link
                        key={tag}
                        href={`/tag/${tagSlug}`}
                        className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:!text-white border border-slate-200 dark:border-slate-600 transition-all inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span className="dark:!text-white">{tag}</span>
                      </Link>
                    );
                  })}
                </div>
              )}

              {/* Navigation Footer */}
              {(prevPost || nextPost) && (
                <div className="mt-12 pt-8 border-t border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
                  {prevPost ? (
                    <Link
                      href={prevPost.href}
                      className="flex items-center gap-3 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-[#0f172a]/40 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 transition-all group w-full sm:w-auto max-w-sm"
                    >
                      <ArrowLeft className="h-4 w-4 text-slate-400 group-hover:text-[#0f172a] group-hover:-translate-x-0.5 transition-transform shrink-0" />
                      <div className="min-w-0">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">
                          Previous Blog
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#0f172a] dark:group-hover:text-amber-400 truncate block">
                          {prevPost.title}
                        </span>
                      </div>
                    </Link>
                  ) : (
                    <div />
                  )}

                  {nextPost ? (
                    <Link
                      href={nextPost.href}
                      className="flex items-center justify-end gap-3 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-[#0f172a]/40 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 transition-all group w-full sm:w-auto max-w-sm"
                    >
                      <div className="text-right min-w-0">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">
                          Next Blog
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#0f172a] dark:group-hover:text-amber-400 truncate block">
                          {nextPost.title}
                        </span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-[#0f172a] group-hover:translate-x-0.5 transition-transform shrink-0" />
                    </Link>
                  ) : (
                    <div />
                  )}
                </div>
              )}
              <GodModeBar className="mt-8" />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
