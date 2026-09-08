"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FeaturedImage } from "@goldlabelapps/theme";
import {
  Play,
  Video,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Smartphone,
  CheckCircle2,
  Home,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Layers,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoLayoutProps {
  videos: VideoItem[];
  currentVideo: VideoItem;
}

export function VideoLayout({ videos, currentVideo }: VideoLayoutProps) {
  const pathname = usePathname();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const videoImg = currentVideo.image || currentVideo.featuredImage;
  const featuredImageProp = videoImg ? { src: videoImg } : undefined;

  const currentIndex = videos.findIndex((v) => v.id === currentVideo.id);
  const prevVideo = currentIndex > 0 ? videos[currentIndex - 1] : null;
  const nextVideo =
    currentIndex >= 0 && currentIndex < videos.length - 1
      ? videos[currentIndex + 1]
      : null;

  const isPortrait = currentVideo.orientation === "portrait";

  return (
    <div className="min-h-screen bg-slate-50/50 pt-20 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Bar */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 py-4 mb-4">
          <Link
            href="/"
            className="hover:text-[#0f172a] transition-colors flex items-center gap-1"
          >
            <Home className="h-3.5 w-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          <Link
            href="/videos"
            className="hover:text-[#0f172a] transition-colors font-medium"
          >
            Videos
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          <span className="font-semibold text-slate-900 truncate max-w-[200px] sm:max-w-none">
            {currentVideo.title}
          </span>
        </nav>

        {/* 2-Column Grid: Left Sidebar + Main Video Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar: Video Playlist Navigation */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200/80 p-4 sm:p-5 shadow-sm">
              <button
                type="button"
                onClick={() => setIsMobileNavOpen((prev) => !prev)}
                className="w-full flex items-center justify-between gap-2 text-left cursor-pointer lg:cursor-default pb-3 lg:pb-3 border-b border-slate-100"
                aria-expanded={isMobileNavOpen}
                aria-label="Toggle navigation menu"
              >
                <div className="flex items-center gap-2">
                  <Video className="h-4 w-4 text-[#0f172a]" />
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                    Live Walkthroughs & Demos
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

              <nav
                className={cn(
                  "space-y-1.5 pt-3 lg:pt-3",
                  isMobileNavOpen ? "block" : "hidden lg:block"
                )}
              >
                {videos.map((item) => {
                  const isActive =
                    pathname === `/videos/${item.id}` ||
                    (item.id === videos[0]?.id && pathname === "/videos");
                  const itemIsPortrait = item.orientation === "portrait";

                  return (
                    <Link
                      key={item.id}
                      href={`/videos/${item.id}`}
                      onClick={() => setIsMobileNavOpen(false)}
                      className={cn(
                        "group flex items-start gap-3 p-3 rounded-2xl text-xs transition-all duration-200",
                        isActive
                          ? "bg-[#0f172a] text-white shadow-md shadow-[#0f172a]/20"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 border border-transparent hover:border-slate-200"
                      )}
                    >
                      <div
                        className={cn(
                          "mt-0.5 rounded-xl p-2 shrink-0 transition-colors",
                          isActive
                            ? "bg-white/15 text-white"
                            : "bg-slate-100 text-slate-500 group-hover:bg-[#0f172a]/10 group-hover:text-[#0f172a]"
                        )}
                      >
                        {itemIsPortrait ? (
                          <Smartphone className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4 fill-current" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span
                            className={cn(
                              "text-[10px] font-extrabold uppercase tracking-wider px-1.5 py-0.2 rounded-md",
                              isActive
                                ? "bg-white/20 text-slate-100"
                                : "bg-slate-100 text-slate-500"
                            )}
                          >
                            {item.badge || "Video"}
                          </span>
                          <span
                            className={cn(
                              "text-[10px] font-mono font-bold",
                              isActive ? "text-slate-200" : "text-slate-500"
                            )}
                          >
                            {item.duration}
                          </span>
                        </div>

                        <h4
                          className={cn(
                            "font-bold leading-snug line-clamp-1",
                            isActive ? "text-white" : "text-slate-900"
                          )}
                        >
                          {item.title}
                        </h4>

                        <p
                          className={cn(
                            "text-[11px] line-clamp-1 mt-0.5 font-normal",
                            isActive ? "text-slate-200/80" : "text-slate-500"
                          )}
                        >
                          {item.tagline}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </nav>
            </div>

          </aside>

          {/* Main Video Content Area */}
          <main className="lg:col-span-8 space-y-8">
            {/* Video Player Card */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
              <FeaturedImage
                image={featuredImageProp}
                slug={currentVideo.id || "nx"}
                alt={currentVideo.title}
                height={280}
                flushTop
              />
              <div className="p-5 sm:p-8">
                {/* Header Info */}
                <div className="pb-6 mb-6 border-b border-slate-200/80">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white text-[#0f172a] border border-[#0f172a]/15 inline-flex items-center gap-1.5">
                    <Sparkles className="h-3 w-3 text-[#0f172a]" />
                    <span>{currentVideo.category || currentVideo.badge || "Live Walkthrough"}</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-white text-slate-700 border border-slate-200">
                    Duration: {currentVideo.duration}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {currentVideo.title}
                </h1>
                <p className="mt-2 text-base sm:text-lg font-semibold text-[#0f172a]">
                  {currentVideo.tagline}
                </p>
                <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                  {currentVideo.description}
                </p>
              </div>

              {/* Responsive Video Player Player Container */}
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl p-2 sm:p-4 flex items-center justify-center">
                {isPortrait ? (
                  <div className="py-4 w-full flex justify-center">
                    <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[9/16] rounded-3xl border-4 border-slate-700 bg-black overflow-hidden shadow-2xl ring-1 ring-white/10">
                      {/* Notch */}
                      <div className="absolute top-2 inset-x-0 flex justify-center z-20 pointer-events-none">
                        <div className="h-3.5 w-20 bg-slate-900 rounded-full border border-white/10" />
                      </div>
                      <video
                        src={currentVideo.videoUrl}
                        controls
                        playsInline
                        preload="metadata"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black flex items-center justify-center">
                    <video
                      src={currentVideo.videoUrl}
                      controls
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
              </div>

              {/* Key Features / Highlights */}
              {currentVideo.keyFeatures && currentVideo.keyFeatures.length > 0 && (
                <div className="mt-8 pt-8 border-t border-slate-200/80">
                  <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-2">
                    <Layers className="h-4 w-4 text-[#0f172a]" />
                    <span>Key Walkthrough Highlights</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentVideo.keyFeatures.map((feature, fIdx) => (
                      <div
                        key={fIdx}
                        className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200/60"
                      >
                        <CheckCircle2 className="h-4 w-4 text-slate-700 shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm font-medium text-slate-700 leading-snug">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Script / Historical Notes if available */}
              {currentVideo.script && (
                <div className="mt-8 pt-8 border-t border-slate-200/80">
                  <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-[#0f172a]" />
                    <span>Film Script &amp; Production Notes</span>
                  </h3>
                  <div className="p-4 sm:p-6 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs sm:text-sm leading-relaxed whitespace-pre-line border border-slate-800 shadow-inner">
                    {currentVideo.script}
                  </div>
                </div>
              )}

              {/* Tag Chips underneath body content */}
              {currentVideo.tags && currentVideo.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mt-8 pt-6 border-t border-slate-200/80">
                  {currentVideo.tags.map((t, idx) => {
                    const tagSlug = t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                    return (
                      <Link
                        key={idx}
                        href={`/tag/${tagSlug}`}
                        className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:!text-white border border-slate-200 dark:border-slate-600 transition-all inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span className="dark:!text-white">{t}</span>
                      </Link>
                    );
                  })}
                </div>
              )}



              {/* Pagination Controls between videos */}
              <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                {prevVideo ? (
                  <Link
                    href={`/videos/${prevVideo.id}`}
                    className="flex items-center gap-3 p-3.5 rounded-2xl border border-slate-200 hover:border-[#0f172a]/40 hover:bg-[#0f172a]/[0.02] transition-all group w-full sm:w-auto"
                  >
                    <ArrowLeft className="h-4 w-4 text-slate-400 group-hover:text-[#0f172a] group-hover:-translate-x-0.5 transition-transform" />
                    <div className="text-left">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Previous Video
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#0f172a]">
                        {prevVideo.title}
                      </span>
                    </div>
                  </Link>
                ) : (
                  <div />
                )}

                {nextVideo ? (
                  <Link
                    href={`/videos/${nextVideo.id}`}
                    className="flex items-center justify-end gap-3 p-3.5 rounded-2xl border border-slate-200 hover:border-[#0f172a]/40 hover:bg-[#0f172a]/[0.02] transition-all group w-full sm:w-auto"
                  >
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Next Video
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#0f172a]">
                        {nextVideo.title}
                      </span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-[#0f172a] group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            </div>
          </div>
        </main>
        </div>
      </div>
    </div>
  );
}
