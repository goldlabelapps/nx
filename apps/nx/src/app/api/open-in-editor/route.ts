import { NextResponse } from "next/server";
import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { getGuideBySlug, getAllGuides } from "@/lib/markdown";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { filePath, pathname } = body;

    let targetFile: string | null = null;

    if (filePath && typeof filePath === "string") {
      let resolved = filePath;
      if (!path.isAbsolute(resolved)) {
        resolved = path.join(process.cwd(), resolved);
      }
      if (fs.existsSync(resolved)) {
        targetFile = resolved;
      }
    }

    if (!targetFile) {
      const rawInput = pathname || filePath || "";
      const cleaned = rawInput
        .replace(/^https?:\/\/[^\/]+/, "")
        .replace(/^\/docs\/?/, "")
        .replace(/^\/|\/$/g, "");

      const slugQuery = cleaned || "index";
      const guide = getGuideBySlug(slugQuery);

      if (guide && guide.filePath && fs.existsSync(guide.filePath)) {
        targetFile = guide.filePath;
      } else {
        const allGuides = getAllGuides();
        const match = allGuides.find(
          (g) =>
            g.cleanSlug === slugQuery ||
            g.cleanSlug.endsWith(`/${slugQuery}`) ||
            g.cleanSlug.split("/").pop() === slugQuery
        );
        if (match && match.filePath && fs.existsSync(match.filePath)) {
          targetFile = match.filePath;
        }
      }
    }

    if (!targetFile || !fs.existsSync(targetFile)) {
      return NextResponse.json(
        { error: `Markdown file not found for path/slug: ${filePath || pathname}` },
        { status: 404 }
      );
    }

    const sanitizedPath = targetFile.replace(/"/g, '\\"');
    exec(`code "${sanitizedPath}" || open -a "Visual Studio Code" "${sanitizedPath}"`, (error) => {
      if (error) {
        console.error("Failed to launch VS Code:", error);
      }
    });

    return NextResponse.json({ success: true, filePath: targetFile });
  } catch (err) {
    return NextResponse.json({ error: "Failed to open in editor", details: String(err) }, { status: 500 });
  }
}
