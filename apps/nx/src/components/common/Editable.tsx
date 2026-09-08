"use client";

import React, { useState } from "react";
import { FileEdit } from "lucide-react";

export interface EditableProps {
  file: string;
  field?: string;
  children: React.ReactNode;
  className?: string;
  inline?: boolean;
}

export function Editable({ file, field, children, className = "", inline = false }: EditableProps) {
  const [isHovered, setIsHovered] = useState(false);

  const Component = inline ? "span" : "div";

  return (
    <Component
      className={`group relative transition-all rounded-lg ${
        inline ? "inline-block" : "block"
      } ${isHovered ? "outline-dashed outline-1 outline-amber-500/60 bg-amber-500/5 dark:bg-amber-400/5" : ""} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {isHovered && (
        <span className="pointer-events-none absolute -top-8 left-2 z-50 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/95 dark:bg-slate-100/95 text-slate-100 dark:text-slate-900 text-[11px] font-mono font-medium shadow-xl border border-slate-700/50 dark:border-slate-300/50 backdrop-blur-md animate-in fade-in zoom-in-95 duration-150 whitespace-nowrap">
          <FileEdit className="h-3 w-3 text-amber-400 dark:text-amber-600 shrink-0" />
          <span>{file}</span>
          {field && <span className="text-amber-400/80 dark:text-amber-700">[{field}]</span>}
        </span>
      )}
    </Component>
  );
}
