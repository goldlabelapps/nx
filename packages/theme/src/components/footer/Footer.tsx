"use client";

import React from "react";
import Link from "next/link";
import { useSiteConfig } from "../../context/ConfigContext";
import { BrandLogo } from "../navigation/LogoContextMenu";
import { ExternalLink } from "lucide-react";

export function Footer() {
  const siteConfig = useSiteConfig();
  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs sm:text-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-12 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <BrandLogo />
            <span className="text-slate-300 dark:text-slate-600 font-mono text-xs">•</span>
            <span className="text-slate-700 dark:text-slate-200 font-medium">{siteConfig.footer.tagline}</span>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            {siteConfig.footer.address || "Goldlabel Apps"}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
          {siteConfig.footer.columns.map((col, idx) => (
            <div key={idx} className="space-y-4">
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    {!link.href || link.href === "#" ? (
                      <span className="text-slate-600 dark:text-slate-300">
                        {link.label}
                      </span>
                    ) : link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-[#012867] dark:hover:text-white transition-colors"
                      >
                        <span>{link.label}</span>
                        <ExternalLink className="h-3 w-3 text-slate-400 dark:text-slate-500" />
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-slate-600 dark:text-slate-300 hover:text-[#012867] dark:hover:text-white transition-colors"
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

        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {siteConfig.footer.bottomLinks.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="hover:text-[#012867] dark:hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div>{siteConfig.footer.copyright}</div>
        </div>
      </div>
    </footer>
  );
}
