import fs from "fs";
import path from "path";

export interface GuideMeta {
  slug: string;
  cleanSlug: string;
  title: string;
  description: string;
  order: number;
  icon?: string;
  tags?: string[];
  smartImage?: string;
  image?: string;
  category?: string;
  era?: string;
  filePath?: string;
}

export interface GuideArticle extends GuideMeta {
  content: string;
  rawMarkdown: string;
}

export const ERA_LABELS: Record<string, string> = {
  "era-1": "Flash & Web 1.0 (2000s)",
  "era-2": "Web 2.0 & AJAX (2005-2010)",
  "era-3": "SPAs & Fullstack JS (2010-2015)",
  "era-4": "React & TypeScript (2015-2020)",
  "era-5": "Serverless & Next.js (2020-2025)",
  "era-6": "Agentic AI Systems (2025+)",
};

/**
 * Parses simple YAML-like frontmatter without external dependencies
 */
export function parseFrontmatter(fileContent: string): { data: Record<string, string | number | string[]>; content: string } {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = fileContent.match(frontmatterRegex);

  if (!match) {
    return { data: {}, content: fileContent };
  }

  const rawYaml = match[1];
  const content = match[2];
  const data: Record<string, string | number | string[]> = {};

  const lines = rawYaml.split(/\r?\n/);
  for (const line of lines) {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    const rawVal = line.slice(colonIndex + 1).trim();

    if (rawVal.startsWith("[") && rawVal.endsWith("]")) {
      data[key] = rawVal
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^['"]|['"]$/g, ""));
    } else if (key === "tags") {
      data[key] = rawVal.split(",").map((s) => s.trim());
    } else if (!isNaN(Number(rawVal)) && rawVal !== "") {
      data[key] = Number(rawVal);
    } else {
      let val = rawVal.replace(/^['"]|['"]$/g, "");
      if (key === "description" && val.includes("<div")) {
        val = val.replace(/<div\b[^>]*>/gi, "").replace(/<\/div>/gi, "").trim();
      }
      data[key] = val;
    }
  }

  return { data, content };
}

const MD_DIRECTORY = path.join(process.cwd(), "public", "md");

function getMarkdownFilesRecursively(dir: string, baseDir: string = dir): string[] {
  if (!fs.existsSync(dir)) return [];
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    if (file === "goldlabel_v1") continue; // Skip backup folder
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getMarkdownFilesRecursively(filePath, baseDir));
    } else if (file.endsWith(".md")) {
      results.push(path.relative(baseDir, filePath));
    }
  }
  return results;
}

function deriveCategory(cleanSlug: string, explicitCategory?: string, explicitEra?: string): string {
  if (explicitCategory) return explicitCategory;
  if (explicitEra && ERA_LABELS[explicitEra.toLowerCase()]) {
    return ERA_LABELS[explicitEra.toLowerCase()];
  }
  const parts = cleanSlug.split("/");
  const top = parts[0].toLowerCase();
  const second = parts[1]?.toLowerCase() || "";

  if (
    cleanSlug === "index" ||
    top === "about" ||
    top === "installation" ||
    top === "configuration" ||
    top === "api" ||
    top === "calculator" ||
    top === "testing"
  ) {
    return "Getting Started";
  }

  if (top === "business") return "Business & Strategy";
  if (top === "engineering") return "Engineering & Architecture";
  if (top === "apps") return "Apps & Cartridges";
  if (top === "concepts" || top === "experience") return "Concepts & Evolution";

  if (top === "docs") {
    if (second === "business") return "Business & Strategy";
    if (second === "engineering") return "Engineering & Architecture";
    if (second === "apps") return "Apps & Cartridges";
    if (second === "concepts" || second === "experience") return "Concepts & Evolution";
    return "Getting Started";
  }

  return top.charAt(0).toUpperCase() + top.slice(1);
}

export function slugifySegment(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");
}

export function slugifyPath(pathStr: string): string {
  if (!pathStr) return "";
  return pathStr
    .split("/")
    .map((part) => slugifySegment(part))
    .filter(Boolean)
    .join("/");
}

/**
 * Returns a list of all markdown guide files available in public/md (recursively)
 */
export function getAllGuides(): GuideMeta[] {
  if (!fs.existsSync(MD_DIRECTORY)) {
    return [];
  }

  const relativeFiles = getMarkdownFilesRecursively(MD_DIRECTORY);
  const guidesMap = new Map<string, GuideMeta>();

  for (const file of relativeFiles) {
    const fullPath = path.join(MD_DIRECTORY, file);
    const rawContent = fs.readFileSync(fullPath, "utf-8");
    const { data } = parseFrontmatter(rawContent);

    // Normalize path to cleanSlug
    const normalizedFile = file.replace(/\\/g, "/").replace(/\.md$/, "");
    let fileRelPath = normalizedFile;
    if (normalizedFile.endsWith("/index")) {
      fileRelPath = normalizedFile.slice(0, -6);
    }
    if (fileRelPath === "index" || fileRelPath === "") {
      fileRelPath = "index";
    }

    const folderSlug = fileRelPath === "index" ? "index" : slugifyPath(fileRelPath);
    const finalCleanSlug = folderSlug;
    const rawSlug = finalCleanSlug === "index" ? "/" : `/${finalCleanSlug}`;
    const era = data.era as string | undefined;
    const category = deriveCategory(finalCleanSlug, data.category as string, era);

    if (!guidesMap.has(finalCleanSlug) || file.indexOf("goldlabel_v1") === -1) {
      guidesMap.set(finalCleanSlug, {
        slug: rawSlug,
        cleanSlug: finalCleanSlug,
        title: (data.title as string) || path.basename(fileRelPath).replace(/-/g, " "),
        description: (data.description as string) || "",
        order: typeof data.order === "number" ? data.order : 100,
        icon: (data.icon as string) || "BookOpen",
        tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
        smartImage: data.smartImage as string | undefined,
        image: (data.image as string) || (data.smartImage as string) || undefined,
        category,
        era,
        filePath: fullPath,
      });
    }
  }

  return Array.from(guidesMap.values())
    .sort((a, b) => a.order - b.order);
}

/**
 * Gets a specific guide by slug array or slug string
 */
export function getGuideBySlug(slug: string | string[]): GuideArticle | null {
  const rawInput = Array.isArray(slug) ? slug.join("/") : slug;
  const normalizedSlug = rawInput.replace(/^\/|\/$/g, "");
  const targetName = normalizedSlug === "" || normalizedSlug === "index" ? "index" : slugifyPath(normalizedSlug);

  const all = getAllGuides();
  let match = all.find(
    (g) =>
      g.cleanSlug === targetName ||
      g.slug === `/${targetName}` ||
      slugifyPath(g.cleanSlug) === targetName
  );

  // Fallback: search by last slug segment if exact match not found
  if (!match && targetName !== "index") {
    match = all.find((g) => g.cleanSlug.endsWith(`/${targetName}`) || g.cleanSlug.split("/").pop() === targetName);
  }

  if (match && match.filePath && fs.existsSync(match.filePath)) {
    const rawContent = fs.readFileSync(match.filePath, "utf-8");
    const { data, content } = parseFrontmatter(rawContent);

    return {
      ...match,
      title: (data.title as string) || match.title,
      description: (data.description as string) || match.description,
      content,
      rawMarkdown: rawContent,
    };
  }

  // Fallback check direct file candidate
  const candidateFile = path.join(MD_DIRECTORY, `${targetName}.md`);
  const candidateIndex = path.join(MD_DIRECTORY, targetName, "index.md");
  const actualFile = fs.existsSync(candidateFile) ? candidateFile : fs.existsSync(candidateIndex) ? candidateIndex : null;

  if (actualFile) {
    const rawContent = fs.readFileSync(actualFile, "utf-8");
    const { data, content } = parseFrontmatter(rawContent);
    const rawSlug = (data.slug as string) || (targetName === "index" ? "/" : `/${targetName}`);
    const cleanSlug = slugifyPath(rawSlug.replace(/^\//, "")) || targetName;

    return {
      slug: rawSlug,
      cleanSlug,
      title: (data.title as string) || targetName,
      description: (data.description as string) || "",
      order: typeof data.order === "number" ? data.order : 100,
      icon: (data.icon as string) || "BookOpen",
      tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
      smartImage: data.smartImage as string | undefined,
      image: (data.image as string) || (data.smartImage as string) || undefined,
      category: deriveCategory(cleanSlug, data.category as string),
      filePath: actualFile,
      content,
      rawMarkdown: rawContent,
    };
  }

  return null;
}

/**
 * Returns static params for SSG generation
 */
export function getGuideStaticSlugs(): { slug: string[] }[] {
  const guides = getAllGuides();
  return guides
    .filter((g) => g.cleanSlug !== "index")
    .map((g) => ({
      slug: g.cleanSlug.split("/"),
    }));
}
