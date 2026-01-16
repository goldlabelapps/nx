import fs from "fs";
import path from "path";
import matter from "gray-matter";

/**
 * Recursively finds a markdown file by its slug array.
 * @param slugArr Array of slug segments
 * @param project Project name (default: "nx")
 * @returns The file path if found, otherwise null
 */
export function findMarkdownBySlug(slugArr: string[] = [], project: string = "nx"): string | null {
    if (!project) {
        project = process.env.NEXT_PUBLIC_PROJECT || "nx";
    }
    // Remove trailing empty strings from slugArr
    let normalizedSlugArr = Array.isArray(slugArr) ? [...slugArr] : [];
    while (normalizedSlugArr.length > 1 && normalizedSlugArr[normalizedSlugArr.length - 1] === "") {
        normalizedSlugArr.pop();
    }
    let foundPath: string | null = null;
    const walk = (dir: string) => {
        if (!fs.existsSync(dir)) return;
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
            if (entry.isDirectory()) {
                walk(path.join(dir, entry.name));
            } else if (entry.name.endsWith(".md")) {
                const filePath = path.join(dir, entry.name);
                const { data } = matter(fs.readFileSync(filePath, "utf-8"));
                let slug = data.slug;
                if (typeof slug === "string") {
                    slug = slug.replace(/^\/+/, '');
                    if ((normalizedSlugArr.length === 0 && (slug === "" || slug === undefined)) || normalizedSlugArr.join("/") === slug) {
                        foundPath = filePath;
                    }
                }
            }
        }
    };
    const markdownDir = `public/${project}/markdown`;
    walk(markdownDir);
    return foundPath;
}
