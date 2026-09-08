"use client";

import Link from "next/link";
import { ArrowRight, Tag, Briefcase, BookOpen, FileText, Video, Layers } from "lucide-react";
import { profileData } from "@/data/profileData";
import { SearchResultsData, HighlightText, getContentSnippet } from "./useSearch";

export interface SearchResultsListProps {
  query: string;
  searchResults: SearchResultsData;
  hasResults: boolean;
  onSelectResult?: () => void;
}

export function SearchResultsList({
  query,
  searchResults,
  hasResults,
  onSelectResult,
}: SearchResultsListProps) {
  if (!query.trim()) return null;

  if (!hasResults) {
    return (
      <div className="p-6 text-center text-slate-500 dark:text-slate-400">
        No exact matches for &quot;{query}&quot;. Try searching for <i>Next.js</i>, <i>React</i>, <i>Flash</i>, or <i>Agentic AI</i>.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Guide & Documentation Matches */}
      {searchResults.guides.length > 0 && (
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            ({searchResults.guides.length}) Results
          </div>
          <div className="space-y-2">
            {searchResults.guides.map((guide) => (
              <Link
                key={guide.cleanSlug}
                href={guide.cleanSlug === "index" ? "/" : `/${guide.cleanSlug}`}
                onClick={onSelectResult}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border border-slate-100 dark:border-slate-800 transition-all flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 flex items-center gap-2">
                    <span>
                      <HighlightText text={guide.title} query={query} />
                    </span>
                    {guide.category && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-indigo-200 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-bold">
                        <HighlightText text={guide.category} query={query} />
                      </span>
                    )}
                  </div>
                  {guide.description && (
                    <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                      <HighlightText text={getContentSnippet(guide.description, query)} query={query} />
                    </div>
                  )}
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 shrink-0 ml-2 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Blog Matches */}
      {searchResults.blogs.length > 0 && (
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5" />
            Blogs ({searchResults.blogs.length})
          </div>
          <div className="space-y-2">
            {searchResults.blogs.map((blog) => (
              <Link
                key={blog.id}
                href={blog.href}
                onClick={onSelectResult}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border border-slate-100 dark:border-slate-800 transition-all flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 flex items-center gap-2">
                    <span>
                      <HighlightText text={blog.title} query={query} />
                    </span>
                    {blog.category && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-emerald-200 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 font-bold">
                        <HighlightText text={blog.category} query={query} />
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                    <HighlightText text={getContentSnippet(blog.summary || blog.content || "", query)} query={query} />
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 shrink-0 ml-2 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Video Matches */}
      {searchResults.videos.length > 0 && (
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2 flex items-center gap-1.5">
            <Video className="w-3.5 h-3.5" />
            Videos ({searchResults.videos.length})
          </div>
          <div className="space-y-2">
            {searchResults.videos.map((vid) => (
              <Link
                key={vid.id}
                href="/videos"
                onClick={onSelectResult}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border border-slate-100 dark:border-slate-800 transition-all flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 flex items-center gap-2">
                    <span>
                      <HighlightText text={vid.title} query={query} />
                    </span>
                    {vid.badge && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-purple-200 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 font-bold">
                        <HighlightText text={vid.badge} query={query} />
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                    <HighlightText text={getContentSnippet(vid.tagline || vid.description, query)} query={query} />
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 shrink-0 ml-2 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Feature Explorer Matches */}
      {searchResults.features.length > 0 && (
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            Techstack ({searchResults.features.length})
          </div>
          <div className="space-y-2">
            {searchResults.features.map((feat) => (
              <Link
                key={feat.id}
                href="/engineering"
                onClick={onSelectResult}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border border-slate-100 dark:border-slate-800 transition-all flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                    <HighlightText text={feat.title} query={query} />
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                    <HighlightText text={getContentSnippet(feat.tabLabel || feat.description, query)} query={query} />
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 shrink-0 ml-2 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Tag Matches */}
      {searchResults.tags.length > 0 && (
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2 flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5" />
            Skills ({searchResults.tags.length})
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {searchResults.tags.map((tag) => (
              <Link
                key={tag.slug}
                href={`/tag/${tag.slug}`}
                onClick={onSelectResult}
                className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border border-slate-100 dark:border-slate-800 transition-colors flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                    <HighlightText text={tag.name} query={query} />
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                    <HighlightText text={getContentSnippet(tag.description, query)} query={query} />
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 shrink-0 ml-2 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Role Matches */}
      {searchResults.roles.length > 0 && (
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2 flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5" />
            Experience ({searchResults.roles.length})
          </div>
          <div className="space-y-2">
            {searchResults.roles.map((role) => {
              const matchingTag = profileData.tags.find((t) =>
                role.skills.some((s) => s.toLowerCase() === t.name.toLowerCase())
              );
              const targetUrl = matchingTag ? `/tag/${matchingTag.slug}` : `/tag/${role.eraId}`;

              return (
                <Link
                  key={role.id}
                  href={targetUrl}
                  onClick={onSelectResult}
                  className="block p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border border-slate-100 dark:border-slate-800 transition-all group cursor-pointer"
                >
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 flex items-center gap-1.5">
                      <span>
                        <HighlightText text={role.title} query={query} />
                      </span>
                      <span>•</span>
                      <span className="text-indigo-600 dark:text-indigo-400">
                        <HighlightText text={role.company} query={query} />
                      </span>
                    </span>
                    <div className="flex items-center gap-1 text-slate-400 group-hover:text-indigo-600 shrink-0 ml-2">
                      <span className="text-xs">{role.period}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                    <HighlightText text={getContentSnippet(role.summary, query)} query={query} />
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {role.skills.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 text-[10px] font-semibold rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                      >
                        <HighlightText text={s} query={query} />
                      </span>
                    ))}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
