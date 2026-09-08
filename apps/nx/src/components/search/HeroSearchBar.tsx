"use client";

import React from "react";
import Link from "next/link";
import { Search, X, BadgeCheck } from "lucide-react";
import { CleverText } from "@goldlabelapps/flash";
import { profileData } from "@/data/profileData";
import type { GuideMeta } from "@/lib/markdown";
import { ParticleCanvas } from "@/components/hero/ParticleCanvas";
import { useSearch } from "./useSearch";
import { SearchResultsList } from "./SearchResultsList";

export function HeroSearchBar({ guides = [] }: { guides?: GuideMeta[] }) {
  const { query, setQuery, searchResults, hasResults } = useSearch(guides);
  const [line1Done, setLine1Done] = React.useState(false);
  const [showLine2, setShowLine2] = React.useState(false);

  const searchContainerRef = React.useRef<HTMLDivElement>(null);

  const handleTagClick = (label: string) => {
    setQuery(label);
    if (searchContainerRef.current?.scrollIntoView) {
      searchContainerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleLine1Finish = React.useCallback(() => {
    setLine1Done(true);
    // Pause with cursor blinking before starting line 2
    setTimeout(() => {
      setShowLine2(true);
    }, 1200);
  }, []);

  return (
    <section className="relative z-30 min-h-[85vh] flex flex-col items-center justify-center pt-24 sm:pt-32 pb-16 bg-slate-50 dark:bg-slate-950">
      {/* Background Interactive Particle Canvas */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <ParticleCanvas />
      </div>

      <div className="relative z-20 w-full max-w-4xl mx-auto px-4 flex flex-col items-center text-center">
        {/* Top Feature Pill Badge */}
        <Link
          href="/experience"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-[#C09F52]/10 border border-[#85580C]/30 dark:border-[#C09F52]/30 text-xs font-semibold text-[#85580C] dark:text-[#F1D57A] backdrop-blur-md mb-10 sm:mb-12 hover:bg-slate-50 dark:hover:bg-[#C09F52]/15 transition-all shadow-sm"
        >
          <BadgeCheck className="h-3.5 w-3.5 text-[#85580C] dark:text-[#F1D57A]" />
          <span>From Flash to Agentic AI</span>
        </Link>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-3xl leading-tight min-h-[140px] sm:min-h-[180px]">
          <span className="text-slate-900 dark:text-white inline-block">
            <CleverText
              text={profileData.founder.name}
              speed={45}
              cursor={!line1Done ? "|" : ""}
              onFinish={handleLine1Finish}
              style={{ fontFamily: 'inherit' }}
            />
          </span>
          <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-[#85580C] via-[#9E6E17] to-[#784E07] dark:from-[#F1D57A] dark:via-[#C09F52] dark:to-[#E6CA65] text-3xl sm:text-5xl md:text-6xl font-bold min-h-[1.2em]">
            {showLine2 ? (
              <CleverText
                text={profileData.founder.title}
                speed={40}
                style={{ fontFamily: 'inherit' }}
              />
            ) : null}
          </span>
        </h1>

        {/* Hardened Subheadline */}
        <p className="mt-2 text-base sm:text-xl font-normal text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
          {profileData.founder.tagline}
        </p>

        {/* Prominent Front & Center Search Input */}
        <div ref={searchContainerRef} className="w-full max-w-[550px] mt-10 mb-2 sm:mb-4 relative z-20 scroll-mt-24 sm:scroll-mt-28">
          <div className="relative flex items-center shadow-2xl rounded-2xl overflow-hidden bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-2 border-indigo-500/30 focus-within:border-indigo-600 focus-within:ring-4 focus-within:ring-indigo-500/20 transition-all">
            <div className="pl-4 text-indigo-500 dark:text-indigo-400">
              <Search className="w-6 h-6" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search 20+ years of experience..."
              className="w-full py-4 px-4 text-base sm:text-lg bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="pr-4 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
                aria-label="Clear search query"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Popular Quick Tag Pills */}
          {!query && (
            <div className="mt-12 flex flex-wrap justify-center gap-2">
              <span className="text-xs text-slate-400 dark:text-slate-500 self-center mr-1 font-medium">Try:</span>
              {profileData.tags
                .filter((t) => t.name !== "FastAPI" && t.name !== "Supabase" && t.name !== "Firebase")
                .slice(0, 6)
                .map((tag) => {
                  const label = tag.slug === "flash" ? "Flash" : tag.name;
                  return (
                    <button
                      key={tag.slug}
                      onClick={() => handleTagClick(label)}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all shadow-sm cursor-pointer"
                    >
                      {label}
                    </button>
                  );
                })}
            </div>
          )}

          {/* Instant Search Results Dropdown Overlay */}
          {query.trim() && (
            <div className="absolute top-full left-0 right-0 mt-4 p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 text-left max-h-[70vh] overflow-y-auto z-50">
              <SearchResultsList
                query={query}
                searchResults={searchResults}
                hasResults={hasResults}
                onSelectResult={() => setQuery("")}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
