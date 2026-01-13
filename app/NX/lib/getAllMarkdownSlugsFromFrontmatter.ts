import fs from "fs";
import path from "path";
import matter from "gray-matter";

/**
 * Recursively collects all markdown slugs from frontmatter in a directory.
 * @param dir Directory to search (default: project markdown dir)
 * @param project Project name (default: "nx")
 * @returns Array of slug arrays
 */
export function getAllMarkdownSlugsFromFrontmatter(dir?: string, project: string = "nx"): string[][] {
    if (!dir) {
        dir = `public/${project}/markdown`;
    }
    let slugs: string[][] = [];
    if (!fs.existsSync(dir)) {
        return slugs;
    }
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        if (entry.isDirectory()) {
            slugs = slugs.concat(getAllMarkdownSlugsFromFrontmatter(path.join(dir, entry.name), project));
        } else if (entry.name.endsWith(".md")) {
            const filePath = path.join(dir, entry.name);
            const { data } = matter(fs.readFileSync(filePath, "utf-8"));
            let slug = data.slug;
            if (typeof slug === "string") {
                slug = slug.replace(/^\/+/, '');
                if (slug === "") {
                    slugs.push([]);
                } else {
                    slugs.push(slug.split("/"));
                }
            }
        }
    }
    return slugs;
}
