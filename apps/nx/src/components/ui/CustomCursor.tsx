"use client";

import React, { useState, useRef } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CustomCursorWrapperProps {
  children: React.ReactNode;
  cursorLabel?: string;
  onClick?: () => void;
  className?: string;
}

export function CustomCursorWrapper({
  children,
  cursorLabel = "Play intro",
  onClick,
  className,
}: CustomCursorWrapperProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      className={cn("relative cursor-pointer group overflow-hidden rounded-3xl", className)}
    >
      {children}

      {/* Floating magnetic cursor badge */}
      <div
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
        }}
        className={cn(
          "pointer-events-none absolute z-30 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-neutral-950 shadow-2xl transition-opacity duration-150",
          isHovered ? "opacity-100 scale-100" : "opacity-0 scale-75"
        )}
      >
        <Play className="h-3.5 w-3.5 fill-black text-black" />
        <span>{cursorLabel}</span>
      </div>
    </div>
  );
}
