"use client";

import React, { useState, useEffect, useRef, useSyncExternalStore } from "react";
import { Search, X } from "lucide-react";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import { useTheme } from "@/context/ThemeContext";
import { profileData } from "@/data/profileData";
import { useSearch } from "./useSearch";
import { SearchResultsList } from "./SearchResultsList";
import { cn } from "@/lib/utils";

const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function SearchDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const mounted = useSyncExternalStore(emptySubscribe, getClientSnapshot, getServerSnapshot);
  const { theme } = useTheme();
  const isDark = mounted && theme === "dark";
  const inputRef = useRef<HTMLInputElement>(null);

  const { query, setQuery, searchResults, hasResults } = useSearch();

  // Keyboard shortcut (Cmd+K / Ctrl+K) to open search dialog
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setQuery("");
  };

  const handleSelectResult = () => {
    handleClose();
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label="Search"
        title="Search (Cmd+K)"
        className={cn(
          "inline-flex items-center justify-center h-9 w-9 rounded-full text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer",
          isOpen && "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
        )}
      >
        <Search className="h-4 w-4" aria-hidden="true" />
      </button>

      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="search-dialog-title"
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "20px",
            p: 1.5,
            maxWidth: "680px",
            maxHeight: "85vh",
            backgroundColor: isDark ? "#0f172a" : "#ffffff",
            color: isDark ? "#f8fafc" : "#0f172a",
            backgroundImage: "none",
            border: isDark ? "1px solid #334155" : "1px solid #e2e8f0",
          },
        }}
      >
        <div className="flex items-center justify-between px-2 pt-1 pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200" id="search-dialog-title">
            <Search className="w-4 h-4 text-indigo-500" />
            <span>Search Experience & Documentation</span>
          </div>
          <IconButton
            onClick={handleClose}
            size="small"
            aria-label="Close search"
            sx={{ color: isDark ? "#94a3b8" : "#64748b" }}
          >
            <X className="w-4 h-4" />
          </IconButton>
        </div>

        <DialogContent sx={{ p: 2 }}>
          {/* Search Input Box */}
          <div className="relative flex items-center shadow-sm rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 focus-within:border-indigo-500 transition-all">
            <div className="pl-3.5 text-slate-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search site (e.g. Next.js, Flash, Agentic AI, React)..."
              autoFocus
              className="w-full py-3 px-3 text-base bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="pr-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                aria-label="Clear search query"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Tag Pills */}
          {!query && (
            <div className="mt-8">
              <p className="text-xs text-slate-400 dark:text-slate-500 mb-2">Try:</p>
              <div className="flex flex-wrap gap-1.5">
                {profileData.tags
                  .filter((t) => t.name !== "FastAPI" && t.name !== "Supabase" && t.name !== "Firebase")
                  .slice(0, 6)
                  .map((tag) => {
                    const label = tag.slug === "flash" ? "Flash" : tag.name;
                    return (
                      <button
                        key={tag.slug}
                        onClick={() => setQuery(label)}
                        className="px-2.5 py-1 text-xs font-medium rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors cursor-pointer"
                      >
                        {label}
                      </button>
                    );
                  })}
              </div>
            </div>
          )}

          {/* Search Results List */}
          {query.trim() && (
            <div className="mt-4 max-h-[55vh] overflow-y-auto pr-1">
              <SearchResultsList
                query={query}
                searchResults={searchResults}
                hasResults={hasResults}
                onSelectResult={handleSelectResult}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
