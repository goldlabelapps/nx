"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config";
import { ExternalLink } from "lucide-react";
import GitHubIcon from "@mui/icons-material/GitHub";

export function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs sm:text-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Footer Link Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 pb-8 sm:pb-10">
          {siteConfig.footer.columns.map((col, idx) => (
            <div key={idx} className="space-y-3">
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider">
                {col.title}
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                {col.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    {!link.href || link.href === "#" ? (
                      <span className="text-slate-600 dark:text-slate-400">
                        {link.label}
                      </span>
                    ) : link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                      >
                        <span>{link.label}</span>
                        <ExternalLink className="h-3 w-3 text-slate-400 dark:text-slate-500" />
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {siteConfig.footer.bottomLinks.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <a
            href="https://github.com/goldlabelapps/nx"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Repository"
            className="inline-flex items-center justify-center rounded-full p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
          >
            <GitHubIcon fontSize="small" />
          </a>
        </div>
      </div>
    </footer>
  );
}
