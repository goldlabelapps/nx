"use client";

import React from "react";
import Link from "next/link";
import { Video } from "lucide-react";
import type { VideoItem } from "../../types";
import { Button } from "../ui/Button";

export interface VideoLayoutProps {
  videos: VideoItem[];
  currentVideo: VideoItem;
}

export function VideoLayout({ videos, currentVideo }: VideoLayoutProps) {
  const isPortrait = currentVideo.orientation === "portrait";

  return (
    <div className="min-h-screen pt-28 pb-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-4 space-y-4">
            <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-[#012867] font-bold text-sm">
                <Video className="h-4 w-4" />
                <span>Live Walkthroughs & Demos</span>
              </div>
              <ul className="space-y-2">
                {videos.map((v) => {
                  const isActive = v.id === currentVideo.id;
                  return (
                    <li key={v.id}>
                      <Link
                        href={`/videos/${v.id}`}
                        className={`block p-3 rounded-2xl transition-all ${
                          isActive
                            ? "bg-[#012867] text-white shadow-md"
                            : "hover:bg-slate-100 text-slate-800"
                        }`}
                      >
                        <div className="font-bold text-xs">{v.title}</div>
                        <div className="text-[11px] opacity-80 line-clamp-1">{v.tagline}</div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

          <main className="lg:col-span-8 space-y-6">
            <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-10 shadow-xl space-y-6">
              <div className="flex items-center justify-between gap-4">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {currentVideo.title}
                </h1>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                  Duration: {currentVideo.duration}
                </span>
              </div>

              <div
                className={`w-full bg-black rounded-2xl overflow-hidden flex items-center justify-center ${
                  isPortrait ? "aspect-[9/16] max-w-[320px] mx-auto" : "aspect-video"
                }`}
              >
                <video
                  src={currentVideo.videoUrl}
                  controls
                  className="w-full h-full object-contain"
                />
              </div>

              <p className="text-slate-600 text-sm leading-relaxed">
                {currentVideo.description}
              </p>

              {currentVideo.keyFeatures && (
                <div className="pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
                    Key Walkthrough Highlights
                  </h4>
                  <ul className="space-y-2">
                    {currentVideo.keyFeatures.map((kf, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                        <span className="text-[#012867] font-bold">✓</span>
                        <span>{kf}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {currentVideo.cta && (
                <div className="pt-4">
                  <Button href={currentVideo.cta.href} variant="primary">
                    {currentVideo.cta.label}
                  </Button>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
