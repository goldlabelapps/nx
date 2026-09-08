"use client";

import React from "react";
import Link from "next/link";
import { useSiteConfig } from "../../context/ConfigContext";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import type { BlogPost } from "../../types";

export interface BlogSectionProps {
  posts?: BlogPost[];
  title?: string;
  subtitle?: string;
}

export function BlogSection({
  posts: propPosts,
  title: propTitle,
  subtitle: propSubtitle,
}: BlogSectionProps) {
  const siteConfig = useSiteConfig();
  const posts = propPosts || siteConfig.blogs.posts || [];
  const title = propTitle || siteConfig.blogs.title || "Guides & Articles";
  const subtitle = propSubtitle || siteConfig.blogs.subtitle;

  return (
    <section id="articles" className="py-24 sm:py-32 relative bg-white overflow-hidden transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#012867]/[0.06] border border-[#012867]/15 text-xs font-bold text-[#012867] mb-4 backdrop-blur-md">
              <BookOpen className="h-3.5 w-3.5" />
              <span>Articles & Guides</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-4 text-base text-slate-600 max-w-2xl">
                {subtitle}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              aria-label="Previous blog posts"
              className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              aria-label="Next blog posts"
              className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={post.href}
              className="group rounded-3xl p-6 sm:p-8 bg-slate-50 border border-slate-200 hover:border-[#012867]/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#012867]/[0.08] text-[#012867]">
                    {post.category}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{post.date}</span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-[#012867] transition-colors leading-snug mb-3">
                  {post.title}
                </h3>

                {post.summary && (
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {post.summary}
                  </p>
                )}
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200/60 flex items-center text-xs font-bold text-[#012867] group-hover:underline">
                <span>Read guide →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
