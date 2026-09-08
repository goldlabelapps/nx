"use client";

import React, { useState, useMemo, useEffect } from "react";
import { profileData } from "@/data/profileData";
import type { GuideMeta } from "@/lib/markdown";
import { blogsConfig } from "@/config/blogs.config";
import { videosConfig } from "@/config/videos.config";
import { featuresConfig } from "@/config/features.config";

export interface SearchResultsData {
  guides: GuideMeta[];
  blogs: typeof blogsConfig.posts;
  videos: typeof videosConfig.items;
  features: typeof featuresConfig.items;
  tags: typeof profileData.tags;
  roles: typeof profileData.roles;
}

export function useSearch(initialGuides: GuideMeta[] = []) {
  const [query, setQuery] = useState("");
  const [fetchedGuides, setFetchedGuides] = useState<GuideMeta[]>([]);

  const hasInitialGuides = initialGuides && initialGuides.length > 0;
  const guides = hasInitialGuides ? initialGuides : fetchedGuides;

  useEffect(() => {
    if (hasInitialGuides || !query.trim() || fetchedGuides.length > 0) {
      return;
    }

    let isMounted = true;
    fetch("/api/guides")
      .then((res) => (res.ok ? res.json() : { guides: [] }))
      .then((data) => {
        if (isMounted && Array.isArray(data.guides)) {
          setFetchedGuides(data.guides);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, [hasInitialGuides, query, fetchedGuides.length]);

  const searchResults: SearchResultsData = useMemo(() => {
    if (!query.trim()) {
      return { guides: [], blogs: [], videos: [], features: [], tags: [], roles: [] };
    }
    const q = query.toLowerCase().trim();

    const matchedGuides = guides.filter(
      (g) =>
        g.title.toLowerCase().includes(q) ||
        g.description.toLowerCase().includes(q) ||
        (g.tags && g.tags.some((t) => t.toLowerCase().includes(q))) ||
        (g.category && g.category.toLowerCase().includes(q)) ||
        g.cleanSlug.toLowerCase().includes(q)
    );

    const matchedBlogs = (blogsConfig.posts || []).filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        (b.summary && b.summary.toLowerCase().includes(q)) ||
        (b.category && b.category.toLowerCase().includes(q)) ||
        (b.content && b.content.toLowerCase().includes(q))
    );

    const matchedVideos = (videosConfig.items || []).filter(
      (v) =>
        v.title.toLowerCase().includes(q) ||
        v.tagline.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q) ||
        (v.keyFeatures && v.keyFeatures.some((kf) => kf.toLowerCase().includes(q)))
    );

    const matchedFeatures = (featuresConfig.items || []).filter(
      (f) =>
        f.title.toLowerCase().includes(q) ||
        (f.tabLabel && f.tabLabel.toLowerCase().includes(q)) ||
        (f.tag && f.tag.toLowerCase().includes(q)) ||
        f.description.toLowerCase().includes(q)
    );

    const matchedTags = profileData.tags.filter(
      (t) => t.name.toLowerCase().includes(q) || t.slug.includes(q) || t.description.toLowerCase().includes(q)
    );

    const matchedRoles = profileData.roles.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.company.toLowerCase().includes(q) ||
        r.skills.some((s) => s.toLowerCase().includes(q)) ||
        r.summary.toLowerCase().includes(q)
    );

    return {
      guides: matchedGuides,
      blogs: matchedBlogs,
      videos: matchedVideos,
      features: matchedFeatures,
      tags: matchedTags,
      roles: matchedRoles,
    };
  }, [query, guides]);

  const hasResults =
    searchResults.guides.length > 0 ||
    searchResults.blogs.length > 0 ||
    searchResults.videos.length > 0 ||
    searchResults.features.length > 0 ||
    searchResults.tags.length > 0 ||
    searchResults.roles.length > 0;

  return {
    query,
    setQuery,
    searchResults,
    hasResults,
  };
}

export function HighlightText({ text, query }: { text: string; query: string }) {
  if (!query.trim() || !text) return <>{text}</>;

  const escapedQuery = query.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escapedQuery})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.trim().toLowerCase() ? (
          <mark
            key={i}
            className="bg-amber-200 dark:bg-amber-500/40 text-slate-900 dark:text-amber-100 font-bold px-0.5 rounded"
          >
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}

export function getContentSnippet(content: string, query: string, maxLength = 110): string {
  if (!content || !query.trim()) return content.slice(0, maxLength);
  const q = query.toLowerCase().trim();
  const lower = content.toLowerCase();
  const index = lower.indexOf(q);
  if (index === -1) return content.slice(0, maxLength) + (content.length > maxLength ? "..." : "");

  const start = Math.max(0, index - 25);
  const end = Math.min(content.length, index + query.length + 65);
  let snippet = content.slice(start, end);
  if (start > 0) snippet = "..." + snippet;
  if (end < content.length) snippet = snippet + "...";
  return snippet;
}
