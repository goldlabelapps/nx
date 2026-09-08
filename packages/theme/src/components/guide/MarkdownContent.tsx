"use client";

import React from "react";

export function MarkdownContent({ content }: { content: string }) {
  // Simple markdown renderer for headers, tables, code blocks, and lists
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none text-slate-800 dark:text-slate-100 dark:prose-a:text-sky-400 dark:prose-a:hover:text-sky-300 leading-relaxed font-sans">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
