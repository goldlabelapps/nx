"use client";

import React, { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config";
import { Card } from "@/components/ui/Card";
import { ChevronLeft, ChevronRight, ArrowUpRight, Calendar, Newspaper } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BlogSectionProps {
  showAll?: boolean;
  compactTop?: boolean;
}

export function BlogSection({ showAll = false, compactTop = false }: BlogSectionProps = {}) {
  const [currentPage, setCurrentPage] = useState(0);
  const posts = siteConfig.blogs.posts;
  const itemsPerPage = 3;
  const totalPages = Math.ceil(posts.length / itemsPerPage);

  const visiblePosts = showAll
    ? posts
    : posts.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
      );

  const handlePrev = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "Architecture":
        return "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-slate-300 dark:border-slate-700";
      case "Installation":
        return "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-slate-300 dark:border-slate-700";
      case "Strategy":
        return "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-700";
      default:
        return "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-700";
    }
  };

  return (
    <section
      id="blogs"
      className={cn(
        "relative transition-colors duration-200",
        compactTop
          ? "pt-4 sm:pt-6 pb-20 sm:pb-28 border-t-0"
          : "py-24 sm:py-32 border-t border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/60"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Navigation */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0f172a]/[0.06] dark:bg-slate-800 border border-[#0f172a]/15 dark:border-slate-700 text-xs font-bold text-[#0f172a] dark:text-slate-200 mb-3 uppercase tracking-wider">
              <Newspaper className="h-3.5 w-3.5" />
              <span>Blog</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              {siteConfig.blogs.title}
            </h2>
            {siteConfig.blogs.subtitle && (
              <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl">
                {siteConfig.blogs.subtitle}
              </p>
            )}
          </div>

          {!showAll && (
            <div className="flex items-center gap-3 self-start md:self-end">
              <Link
                href={siteConfig.blogs.viewAllCta.href}
                className="text-xs sm:text-sm font-bold text-[#0f172a] dark:text-slate-200 hover:text-[#1e293b] dark:hover:text-white hover:underline transition-colors mr-2"
              >
                {siteConfig.blogs.viewAllCta.label} →
              </Link>
              <button
                onClick={handlePrev}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer shadow-sm"
                aria-label="Previous blog posts"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={handleNext}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer shadow-sm"
                aria-label="Next blog posts"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Blog Post Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visiblePosts.map((post) => (
            <Link
              key={post.id}
              href={post.href}
              className="block group"
            >
              <Card
                variant="default"
                className="h-full flex flex-col justify-between p-6 sm:p-7 bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-[#0f172a]/40 dark:hover:border-slate-700 hover:shadow-lg transition-all duration-200 rounded-3xl"
              >
                <div>
                  {/* Meta Bar */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span
                      className={cn(
                        "px-2.5 py-0.5 rounded-full text-[11px] font-bold border",
                        getCategoryColor(post.category)
                      )}
                    >
                      {post.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-mono">
                      <Calendar className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
                      <span>{post.date}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-[#0f172a] dark:group-hover:text-amber-400 transition-colors line-clamp-2 mb-3">
                    {post.title}
                  </h3>

                  {/* Summary */}
                  {post.summary && (
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed mb-6">
                      {post.summary}
                    </p>
                  )}
                </div>

                {/* Read Link */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-[#0f172a] dark:group-hover:text-amber-400">
                  <span>Read blog</span>
                  <ArrowUpRight className="h-4 w-4 text-slate-400 dark:text-slate-500 group-hover:text-[#0f172a] dark:group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
