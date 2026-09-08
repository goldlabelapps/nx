"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Copy, ExternalLink } from "lucide-react";
import { siteConfig } from "@/config";
import { CleverText, FlashMovieShortcode } from "@goldlabelapps/flash";
import { GodModeBar } from "@/components/auth/GodModeBar";

interface MarkdownContentProps {
  content: string;
  hideFirstH1?: boolean;
  filePath?: string;
}

function CodeBlock({ language, code }: { language: string; code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-[#0b1220] shadow-xl text-slate-800 dark:text-slate-100 font-mono text-xs sm:text-sm">
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-200/70 dark:bg-slate-900/90 border-b border-slate-300/70 dark:border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-[11px] font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider ml-1">
            {language || "code"}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-colors text-xs cursor-pointer"
          title="Copy code to clipboard"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="leading-relaxed">
          <code>{code.trim()}</code>
        </pre>
      </div>
    </div>
  );
}

export function MarkdownContent({ content, hideFirstH1 = false, filePath }: MarkdownContentProps) {
  // Simple block tokenizer to safely render markdown structures
  const renderMarkdownBlocks = () => {
    const lines = content.split(/\r?\n/);
    const elements: React.ReactNode[] = [];
    let i = 0;
    let firstH1Skipped = false;

    const parseInline = (text: string): React.ReactNode => {
      // Parse markdown shortcodes, bold, code, links
      const parts: React.ReactNode[] = [];
      let cursor = 0;
      const regex = /(\[CleverText\s+[^\]]*?text=["'](.*?)["'][^\]]*?\])|(\[FlashMovie\s+([^\]]*?)\])|(\*\*([^*]+)\*\*)|(`([^`]+)`)|(\[([^\]]+)\]\(([^)]+)\))/g;
      let match;

      while ((match = regex.exec(text)) !== null) {
        if (match.index > cursor) {
          parts.push(text.slice(cursor, match.index));
        }

        if (match[1]) {
          const cleverTextVal = match[2];
          parts.push(
            <CleverText
              key={`clever-${match.index}`}
              text={cleverTextVal}
              style={{ fontFamily: "inherit" }}
            />
          );
        } else if (match[3]) {
          const attrsString = match[4];
          const props: Record<string, string | boolean | number> = {};
          const attrRegex = /(\w+)="(.*?)"/g;
          let attrMatch;
          while ((attrMatch = attrRegex.exec(attrsString)) !== null) {
            const [, key, val] = attrMatch;
            if (val === "true") props[key] = true;
            else if (val === "false") props[key] = false;
            else if (!isNaN(Number(val))) props[key] = Number(val);
            else props[key] = val;
          }
          parts.push(
            <FlashMovieShortcode key={`flashmovie-${match.index}`} {...props} />
          );
        } else if (match[5]) {
          parts.push(<strong key={match.index} className="font-bold text-slate-900">{match[6]}</strong>);
        } else if (match[7]) {
          parts.push(
            <code
              key={match.index}
              className="px-1.5 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-[#0f172a] font-mono text-[0.875em] font-semibold"
            >
              {match[8]}
            </code>
          );
        } else if (match[9]) {
          const label = match[10];
          const href = match[11];
          const isExternal = href.startsWith("http://") || href.startsWith("https://") || href.startsWith("mailto:") || href.startsWith("file:");
          const isAnchor = href.startsWith("#");

          if (!isExternal && !isAnchor) {
            const [urlPath, hash] = href.split("#");
            let cleanPath = urlPath.replace(/\.md$/, "");
            if (cleanPath.endsWith("/index")) {
              cleanPath = cleanPath.slice(0, -6);
            }

            let resolvedRoute = cleanPath;
            if (!cleanPath.startsWith("/")) {
              let currentDir = "";
              if (filePath) {
                const mdMarker = "/public/md/";
                const idx = filePath.indexOf(mdMarker);
                if (idx !== -1) {
                  const relFilePath = filePath.slice(idx + mdMarker.length);
                  currentDir = relFilePath.split("/").slice(0, -1).join("/");
                }
              }
              const segments = (currentDir ? currentDir + "/" + cleanPath : cleanPath).split("/");
              const stack: string[] = [];
              for (const seg of segments) {
                if (seg === "" || seg === ".") continue;
                if (seg === "..") {
                  stack.pop();
                } else {
                  stack.push(seg);
                }
              }
              resolvedRoute = "/" + stack.join("/");
            }

            if (hash) {
              resolvedRoute += "#" + hash;
            }

            parts.push(
              <Link
                key={match.index}
                href={resolvedRoute}
                className="text-[#0f172a] font-semibold hover:underline decoration-1 underline-offset-2"
              >
                {label}
              </Link>
            );
          } else {
            parts.push(
              <a
                key={match.index}
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="text-[#0f172a] font-semibold hover:underline decoration-1 underline-offset-2 inline-flex items-center gap-0.5"
              >
                <span>{label}</span>
                {isExternal && <ExternalLink className="h-3 w-3 inline opacity-70" />}
              </a>
            );
          }
        }

        cursor = regex.lastIndex;
      }

      if (cursor < text.length) {
        parts.push(text.slice(cursor));
      }

      return parts.length > 0 ? parts : text;
    };

    while (i < lines.length) {
      const line = lines[i];

      if (line.trim().startsWith("```")) {
        const language = line.trim().slice(3).trim();
        const codeLines: string[] = [];
        i++;
        while (i < lines.length && !lines[i].trim().startsWith("```")) {
          codeLines.push(lines[i]);
          i++;
        }
        i++;
        elements.push(
          <CodeBlock
            key={`code-${i}`}
            language={language}
            code={codeLines.join("\n")}
          />
        );
        continue;
      }

      if (line.startsWith("# ")) {
        if (hideFirstH1 && !firstH1Skipped) {
          firstH1Skipped = true;
          i++;
          continue;
        }
        elements.push(
          <h1 key={`h1-${i}`} className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-8 mb-4">
            {parseInline(line.slice(2))}
          </h1>
        );
        i++;
        continue;
      }
      if (line.startsWith("## ")) {
        elements.push(
          <h2 key={`h2-${i}`} className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-10 mb-4 pb-2 border-b border-slate-200">
            {parseInline(line.slice(3))}
          </h2>
        );
        i++;
        continue;
      }
      if (line.startsWith("### ")) {
        elements.push(
          <h3 key={`h3-${i}`} className="text-xl sm:text-2xl font-bold text-slate-900 mt-8 mb-3">
            {parseInline(line.slice(4))}
          </h3>
        );
        i++;
        continue;
      }
      if (line.startsWith("#### ")) {
        elements.push(
          <h4 key={`h4-${i}`} className="text-lg font-bold text-slate-900 mt-6 mb-2">
            {parseInline(line.slice(5))}
          </h4>
        );
        i++;
        continue;
      }

      if (line.trim() === "---" || line.trim() === "***") {
        elements.push(<hr key={`hr-${i}`} className="my-8 border-slate-200" />);
        i++;
        continue;
      }

      if (line.trim().startsWith("|") && line.trim().endsWith("|")) {
        const tableLines: string[] = [];
        while (i < lines.length && lines[i].trim().startsWith("|") && lines[i].trim().endsWith("|")) {
          tableLines.push(lines[i]);
          i++;
        }

        if (tableLines.length >= 2) {
          const headerRow = tableLines[0].split("|").slice(1, -1).map((c) => c.trim());
          const bodyRows = tableLines.slice(2).map((row) =>
            row.split("|").slice(1, -1).map((c) => c.trim())
          );

          elements.push(
            <div key={`table-${i}`} className="my-6 overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-900 font-semibold">
                  <tr>
                    {headerRow.map((cell, idx) => (
                      <th key={idx} className="px-4 py-3 text-xs uppercase tracking-wider text-slate-700">
                        {parseInline(cell)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {bodyRows.map((row, rIdx) => (
                    <tr key={rIdx} className={rIdx % 2 === 0 ? "bg-white hover:bg-slate-50/70 transition-colors" : "bg-slate-50/40 hover:bg-slate-50/80 transition-colors"}>
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="px-4 py-3 text-xs sm:text-sm">
                          {parseInline(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
          continue;
        }
      }

      if (line.startsWith("> ")) {
        const quoteLines: string[] = [];
        while (i < lines.length && lines[i].startsWith("> ")) {
          quoteLines.push(lines[i].slice(2));
          i++;
        }
        elements.push(
          <div key={`quote-${i}`} className="my-6 p-4 rounded-2xl bg-[#0f172a]/[0.04] border-l-4 border-[#0f172a] text-slate-700 text-sm">
            {quoteLines.map((ql, qIdx) => (
              <p key={qIdx} className={qIdx > 0 ? "mt-2" : ""}>
                {parseInline(ql)}
              </p>
            ))}
          </div>
        );
        continue;
      }

      if (line.trim().startsWith("* ") || line.trim().startsWith("- ")) {
        const listItems: string[] = [];
        while (i < lines.length && (lines[i].trim().startsWith("* ") || lines[i].trim().startsWith("- "))) {
          listItems.push(lines[i].trim().slice(2));
          i++;
        }
        elements.push(
          <ul key={`ul-${i}`} className="my-4 space-y-2 list-disc list-inside text-slate-700 text-sm sm:text-base leading-relaxed pl-2">
            {listItems.map((item, idx) => (
              <li key={idx} className="leading-relaxed">
                {parseInline(item)}
              </li>
            ))}
          </ul>
        );
        continue;
      }

      if (/^\d+\.\s/.test(line.trim())) {
        const listItems: string[] = [];
        while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
          listItems.push(lines[i].trim().replace(/^\d+\.\s/, ""));
          i++;
        }
        elements.push(
          <ol key={`ol-${i}`} className="my-4 space-y-2 list-decimal list-inside text-slate-700 text-sm sm:text-base leading-relaxed pl-2">
            {listItems.map((item, idx) => (
              <li key={idx} className="leading-relaxed">
                {parseInline(item)}
              </li>
            ))}
          </ol>
        );
        continue;
      }

      if (line.trim().startsWith("<div")) {
        const htmlLines: string[] = [];
        while (i < lines.length && !lines[i].includes("</div>")) {
          htmlLines.push(lines[i]);
          i++;
        }
        if (i < lines.length) {
          htmlLines.push(lines[i]);
          i++;
        }
        elements.push(
          <div
            key={`html-${i}`}
            className="my-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0f172a]/[0.06] to-[#0f172a]/[0.02] border border-[#0f172a]/15 text-center shadow-sm"
          >
            <h3 className="text-xl font-bold text-[#0f172a] mb-2">{siteConfig.authCta.title}</h3>
            <p className="text-sm sm:text-base text-slate-600 mb-6 max-w-xl mx-auto">
              {siteConfig.authCta.subtitle}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={siteConfig.authCta.primaryCta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold text-sm shadow-md transition-all hover:shadow-lg"
              >
                <span>{siteConfig.authCta.primaryCta.label}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <Link
                href={siteConfig.authCta.secondaryCta.href}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-300 text-slate-800 hover:text-[#0f172a] hover:border-[#0f172a]/40 font-bold text-sm transition-colors"
              >
                <span>{siteConfig.authCta.secondaryCta.label}</span>
              </Link>
            </div>
            <p className="mt-4 text-xs sm:text-sm text-slate-600">
              <span className="font-semibold text-slate-700">{siteConfig.authCta.cliQuickInstall.label}:</span>{" "}
              <span className="font-mono text-[#0f172a]">{siteConfig.authCta.cliQuickInstall.command}</span>
            </p>
          </div>
        );
        continue;
      }

      if (line.trim() === "") {
        i++;
        continue;
      }

      if (line.trim().startsWith("[FlashMovie")) {
        elements.push(
          <div key={`fm-${i}`} className="my-4">
            {parseInline(line)}
          </div>
        );
        i++;
        continue;
      }

      elements.push(
        <p key={`p-${i}`} className="my-4 text-slate-700 text-sm sm:text-base leading-relaxed">
          {parseInline(line)}
        </p>
      );
      i++;
    }

    return elements;
  };

  return (
    <div className="prose prose-slate max-w-none prose-headings:font-bold prose-a:text-[#0f172a] prose-headings:text-slate-900">
      {renderMarkdownBlocks()}
      {!hideFirstH1 && <GodModeBar filePath={filePath} className="mt-8" />}
    </div>
  );

}

