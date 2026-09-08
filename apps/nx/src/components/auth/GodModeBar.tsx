"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Code2 } from "lucide-react";
import { useGod } from "@/hooks/useGod";

interface GodModeBarProps {
  filePath?: string;
  pathname?: string;
  className?: string;
}

function getTargetFilePath(explicitPath?: string, currentPathname?: string): string {
  if (explicitPath) return explicitPath;

  const path = (currentPathname || "").replace(/^\/|\/$/g, "");
  let relPath = path;

  if (relPath.startsWith("docs/")) {
    relPath = relPath.replace(/^docs\//, "");
  } else if (relPath === "docs" || relPath === "") {
    relPath = "index";
  }

  return `/Users/milky/My Drive/GitHub/nx-clients/apps/nx/public/md/${relPath}.md`;
}

export function GodModeBar({ filePath, pathname: customPathname, className = "mb-6" }: GodModeBarProps) {
  const { isGod } = useGod();
  const currentPathname = usePathname();
  const [opening, setOpening] = useState(false);

  if (!isGod) return null;

  const pathname = customPathname || currentPathname;
  const targetFile = getTargetFilePath(filePath, pathname);

  const handleOpenInVSCode = async () => {
    setOpening(true);
    try {
      const res = await fetch("/api/open-in-editor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filePath, pathname }),
      });
      const data = await res.json();
      const resolvedPath = data.filePath || targetFile;
      window.location.href = `vscode://file${encodeURI(resolvedPath)}`;
    } catch {
      window.location.href = `vscode://file${encodeURI(targetFile)}`;
    } finally {
      setTimeout(() => setOpening(false), 2000);
    }
  };

  return (
    <div className={`not-prose flex items-center justify-end ${className}`}>
      <a
        href={`vscode://file${encodeURI(targetFile)}`}
        onClick={(e) => {
          e.preventDefault();
          handleOpenInVSCode();
        }}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0f172a] hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-sm cursor-pointer border border-slate-700 shrink-0"
        title={`Open ${targetFile} in Visual Studio Code`}
        aria-label="Edit markdown page in VS Code"
      >
        <Code2 className="h-3.5 w-3.5 text-blue-400" />
        <span>{opening ? "Opening VS Code..." : "Edit in VS Code"}</span>
      </a>
    </div>
  );

}
