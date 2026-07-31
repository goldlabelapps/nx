import fs from "fs";
import path from "path";
import matter from "gray-matter";

/**
 * Finds markdown files by a comma-separated list of slugs and returns their content objects.
 * @param slugs Comma-separated string or array of slugs
 * @param project Project name (default: "free")
 * @returns Array of content objects for each slug
 */
export function serverUseSlugs(slugs: string[] | string = [], project: string = "free"): any[] {
    if (!project) {
        project = process.env.NEXT_PUBLIC_TENANT || "free";
    }
    // Normalize slugs to array
    let slugArr: string[] = [];
    if (typeof slugs === "string") {
        slugArr = slugs.split(",").map(s => s.trim()).filter(Boolean);
    } else if (Array.isArray(slugs)) {
        slugArr = slugs.map(s => s.trim()).filter(Boolean);
    }
    const markdownDir = `public/${project}/markdown`;

    // Helper to find a file by slug
    function findFileBySlug(targetSlug: string): string | null {
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
                        if (slug === targetSlug) {
                            foundPath = filePath;
                        }
                    }
                }
            }
        };
        walk(markdownDir);
        return foundPath;
    }

    // For each slug, find the file and return its content object
    const results: any[] = [];
    for (const slug of slugArr) {
        const filePath = findFileBySlug(slug);
        if (filePath) {
            const fileContent = fs.readFileSync(filePath, "utf-8");
            const parsed = matter(fileContent);
            results.push({ ...parsed.data, content: parsed.content, filePath });
        }
    }
    return results;
}
