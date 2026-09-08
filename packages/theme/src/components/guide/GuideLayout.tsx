"use client";

import React from "react";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import type { GuideMeta } from "../../types";

export interface GuideLayoutProps {
  guides: GuideMeta[];
  currentGuide?: GuideMeta;
  children: React.ReactNode;
}

export function GuideLayout({
  guides,
  currentGuide,
  children,
}: GuideLayoutProps) {
  return (
    <div className="min-h-screen pt-28 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-3 space-y-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 mb-4 text-[#012867] font-bold text-sm">
                <BookOpen className="h-4 w-4" />
                <span>How To Guides</span>
              </div>
              <ul className="space-y-1">
                {guides.map((g) => {
                  const isActive = currentGuide?.slug === g.slug;
                  return (
                    <li key={g.slug}>
                      <Link
                        href={`/how-to${g.slug === "/" ? "" : g.slug}`}
                        className={`block px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                          isActive
                            ? "bg-[#012867] text-white"
                            : "text-slate-700 hover:bg-slate-200/70"
                        }`}
                      >
                        {g.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

          <main className="lg:col-span-9">{children}</main>
        </div>
      </div>
    </div>
  );
}
