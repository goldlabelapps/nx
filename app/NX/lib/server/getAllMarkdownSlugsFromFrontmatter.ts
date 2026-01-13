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
    // If no directory is provided, default to public/{project}/markdown
    if (!dir) {
        dir = path.resolve(process.cwd(), "public", project, "markdown");
    } else if (!path.isAbsolute(dir)) {
        // If dir is relative, resolve it from the project root
        dir = path.resolve(process.cwd(), dir);
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
                    const splitSlug = slug.split("/");
                    slugs.push(splitSlug);
                }
            }
        }
    }
    return slugs;
}
