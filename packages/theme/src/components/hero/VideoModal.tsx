"use client";

import React, { useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { X, Smartphone, Monitor } from "lucide-react";

export interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title?: string;
  badge?: string;
  orientation?: "landscape" | "portrait";
  aspectRatio?: "16/9" | "9/16" | "landscape" | "portrait";
}

const emptySubscribe = () => () => {};

export function VideoModal({
  isOpen,
  onClose,
  videoUrl,
  title = "Video Preview",
  badge,
  orientation,
  aspectRatio,
}: VideoModalProps) {
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isPortrait =
    orientation === "portrait" ||
    aspectRatio === "9/16" ||
    aspectRatio === "portrait" ||
    videoUrl.toLowerCase().includes("portrait") ||
    videoUrl.toLowerCase().includes("two.mp4") ||
    videoUrl.toLowerCase().includes("builders-merchant");

  const isLocalMp4 =
    videoUrl.endsWith(".mp4") ||
    videoUrl.startsWith("/mp4/") ||
    (!videoUrl.startsWith("http://") && !videoUrl.startsWith("https://") && !videoUrl.includes("embed"));

  const modalContent = (
    <div
      data-testid="video-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 animate-in fade-in duration-200"
    >
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-xl transition-opacity"
        onClick={onClose}
        aria-hidden="true"
        data-testid="video-modal-backdrop"
      />

      <div
        className={`relative z-10 w-full overflow-hidden rounded-3xl bg-[#111317] border border-white/15 shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col ${
          isPortrait
            ? "max-w-[340px] sm:max-w-[380px] max-h-[90vh]"
            : "max-w-4xl sm:max-w-5xl"
        }`}
      >
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/10 bg-[#16181e]/90 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-2 min-w-0 pr-2">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-400 animate-pulse shrink-0" />
            <div className="flex items-center gap-2 truncate">
              {isPortrait ? (
                <Smartphone className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              ) : (
                <Monitor className="h-3.5 w-3.5 text-[#38BDF8] shrink-0" />
              )}
              <h3 className="text-xs sm:text-sm font-semibold text-neutral-200 truncate">
                {title}
              </h3>
            </div>
            {badge && (
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-slate-300 border border-white/10 shrink-0">
                {badge}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div
          className={`relative w-full bg-black flex items-center justify-center overflow-hidden ${
            isPortrait ? "aspect-[9/16] max-h-[75vh]" : "aspect-video"
          }`}
        >
          {isLocalMp4 ? (
            <video
              src={videoUrl}
              title={title}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain bg-black"
              data-testid="local-video-player"
            />
          ) : (
            <iframe
              src={videoUrl}
              title={title}
              className="absolute inset-0 h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          )}
        </div>
      </div>
    </div>
  );

  return mounted && typeof document !== "undefined"
    ? createPortal(modalContent, document.body)
    : modalContent;
}
