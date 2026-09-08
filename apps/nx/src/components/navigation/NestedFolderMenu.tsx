"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Folder,
  FolderOpen,
  FileText,
  ChevronRight,
  ChevronDown,
  Search,
  X,
  BookOpen,
  Zap,
  Terminal,
  Settings,
  Code2,
  Download,
  ShieldCheck,
  Home,
} from "lucide-react";
import { GuideMeta } from "@/lib/markdown";
import {
  MenuItemNode,
  buildNestedMenuTree,
  filterMenuNodes,
  getAncestorFolderIds,
} from "@/lib/nestedMenu";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  download: Download,
  Download: Download,
  settings: Settings,
  Settings: Settings,
  terminal: Terminal,
  Terminal: Terminal,
  code: Code2,
  Code2: Code2,
  flash: Zap,
  Zap: Zap,
  ShieldCheck: ShieldCheck,
  home: Home,
  BookOpen: BookOpen,
};

export interface NestedFolderMenuProps {
  guides: GuideMeta[];
  currentCleanSlug?: string;
  onNavigate?: () => void;
  className?: string;
}

interface TreeNodeItemProps {
  node: MenuItemNode;
  level: number;
  pathname: string;
  expandedFolders: Record<string, boolean>;
  toggleFolder: (id: string) => void;
  onNavigate?: () => void;
}

function TreeNodeItem({
  node,
  level,
  pathname,
  expandedFolders,
  toggleFolder,
  onNavigate,
}: TreeNodeItemProps) {
  const isExpanded = Boolean(expandedFolders[node.id]);

  if (node.isFolder) {
    const FolderIcon = isExpanded ? FolderOpen : Folder;
    const childCount = node.children.length;

    const folderHref = node.slug
      ? node.cleanSlug === "index"
        ? "/"
        : `/${node.cleanSlug}`
      : undefined;

    const isFolderActive = folderHref ? pathname === folderHref : false;

    return (
      <div className="space-y-1">
        {/* Folder Header Row */}
        <div
          className={cn(
            "group flex items-center justify-between rounded-xl px-2.5 py-2 text-xs font-semibold transition-all cursor-pointer select-none",
            isFolderActive
              ? "bg-[#85580C]/10 text-[#85580C]"
              : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
          )}
          style={{ paddingLeft: `${Math.max(10, level * 14 + 10)}px` }}
        >
          <div
            className="flex items-center gap-2 flex-1 min-w-0 py-0.5"
            onClick={() => toggleFolder(node.id)}
          >
            <FolderIcon
              className={cn(
                "h-4 w-4 shrink-0 transition-colors",
                isExpanded ? "text-[#85580C]" : "text-slate-400 group-hover:text-slate-600"
              )}
            />
            {folderHref ? (
              <Link
                href={folderHref}
                onClick={(e) => {
                  e.stopPropagation();
                  if (onNavigate) onNavigate();
                }}
                className="truncate hover:underline"
              >
                {node.name}
              </Link>
            ) : (
              <span className="truncate">{node.name}</span>
            )}
          </div>

          <div className="flex items-center gap-1 shrink-0 ml-2">
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-white border border-slate-200 text-slate-500">
              {childCount}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleFolder(node.id);
              }}
              className="p-1 rounded-lg hover:bg-slate-200/60 text-slate-400 hover:text-slate-600"
              aria-label={isExpanded ? "Collapse folder" : "Expand folder"}
            >
              {isExpanded ? (
                <ChevronDown className="h-3.5 w-3.5 text-[#85580C]" />
              ) : (
                <ChevronRight className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Render Folder Children */}
        {isExpanded && node.children.length > 0 && (
          <div className="space-y-0.5 border-l border-slate-200/70 ml-4 pl-1">
            {node.children.map((childNode) => (
              <TreeNodeItem
                key={childNode.id}
                node={childNode}
                level={level + 1}
                pathname={pathname}
                expandedFolders={expandedFolders}
                toggleFolder={toggleFolder}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  // File Item Node
  const itemHref = node.cleanSlug === "index" ? "/" : `/${node.cleanSlug}`;
  const isActive = pathname === itemHref || pathname === `/docs/${node.cleanSlug}`;
  const IconComp = node.icon && iconMap[node.icon] ? iconMap[node.icon] : FileText;

  return (
    <Link
      href={itemHref}
      onClick={() => {
        if (onNavigate) onNavigate();
      }}
      className={cn(
        "flex items-center gap-2 rounded-xl px-2.5 py-2 text-xs font-medium transition-colors",
        isActive
          ? "bg-[#0f172a] text-white font-bold shadow-sm"
          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
      )}
      style={{ paddingLeft: `${Math.max(10, level * 14 + 10)}px` }}
    >
      <IconComp
        className={cn("h-3.5 w-3.5 shrink-0", isActive ? "text-white" : "text-slate-400")}
      />
      <span className="truncate">{node.name}</span>
    </Link>
  );
}

export function NestedFolderMenu({
  guides,
  currentCleanSlug = "",
  onNavigate,
  className,
}: NestedFolderMenuProps) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");

  const fullTree = useMemo(() => buildNestedMenuTree(guides), [guides]);

  // Initial expanded folders: expand only active route ancestor folders, default all others to collapsed
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>(() => {
    const ancestors = getAncestorFolderIds(fullTree, currentCleanSlug);
    const initial: Record<string, boolean> = {};
    ancestors.forEach((id) => {
      initial[id] = true;
    });
    return initial;
  });

  const [prevSlug, setPrevSlug] = useState(currentCleanSlug);
  if (prevSlug !== currentCleanSlug) {
    setPrevSlug(currentCleanSlug);
    if (currentCleanSlug) {
      const ancestors = getAncestorFolderIds(fullTree, currentCleanSlug);
      if (ancestors.length > 0) {
        setExpandedFolders((prev) => {
          const updated = { ...prev };
          ancestors.forEach((id) => (updated[id] = true));
          return updated;
        });
      }
    }
  }

  const toggleFolder = (folderId: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }));
  };

  const isSearching = searchQuery.trim().length > 0;
  const displayTree = useMemo(() => {
    if (!isSearching) return fullTree;
    return filterMenuNodes(fullTree, searchQuery);
  }, [fullTree, searchQuery, isSearching]);

  // When searching, auto expand all folder nodes in displayTree
  const searchExpandedState = useMemo(() => {
    if (!isSearching) return expandedFolders;
    const state: Record<string, boolean> = { ...expandedFolders };
    function expandAll(nodes: MenuItemNode[]) {
      for (const node of nodes) {
        if (node.isFolder) {
          state[node.id] = true;
          expandAll(node.children);
        }
      }
    }
    expandAll(displayTree);
    return state;
  }, [isSearching, displayTree, expandedFolders]);

  return (
    <div className={cn("space-y-3", className)}>
      {/* Search Filter Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`Filter ${guides.length} folder docs...`}
          className="w-full pl-8 pr-7 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#85580C] focus:bg-white transition-all"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Tree Content */}
      <div className="space-y-1 pt-1">
        {displayTree.length === 0 ? (
          <div className="py-6 text-center text-xs text-slate-500">
            No matching documents found for &quot;{searchQuery}&quot;
          </div>
        ) : (
          displayTree.map((node) => (
            <TreeNodeItem
              key={node.id}
              node={node}
              level={0}
              pathname={pathname}
              expandedFolders={searchExpandedState}
              toggleFolder={toggleFolder}
              onNavigate={onNavigate}
            />
          ))
        )}
      </div>
    </div>
  );
}
