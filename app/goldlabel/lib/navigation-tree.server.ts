
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface NavItem {
    title: string;
    path: string;
    order?: number;
    children?: NavItem[];
}


const MARKDOWN_ROOT = path.join(process.cwd(), "app/goldlabel/markdown");

function getFrontmatterFromMarkdown(filePath: string): { title: string; order?: number; slug?: string } {
    const content = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(content);
    let slug = data.slug;
    if (typeof slug === "string" && !slug.startsWith("/")) {
        slug = "/" + slug;
    }
    return {
        title: data.title || path.basename(filePath, ".md"),
        order: typeof data.order === "number" ? data.order : undefined,
        slug,
    };
}

function buildNavTree(dir: string, baseUrl = "/goldlabel/markdown"): NavItem[] {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const navItems = entries
        .filter((entry) => entry.isDirectory() || entry.name.endsWith(".md"))
        .map((entry) => {
            if (entry.isDirectory()) {
                const children = buildNavTree(path.join(dir, entry.name), `${baseUrl}/${entry.name}`);
                // Try to find an index.md for directory metadata
                const indexPath = path.join(dir, entry.name, "index.md");
                let meta = { title: entry.name, slug: `/${entry.name}` };
                if (fs.existsSync(indexPath)) {
                    const { title, order, slug } = getFrontmatterFromMarkdown(indexPath);
                    meta = { title, order, slug: slug || `/${entry.name}` };
                }
                return {
                    ...meta,
                    path: meta.slug,
                    children,
                };
            } else {
                const filePath = path.join(dir, entry.name);
                const { title, order, slug } = getFrontmatterFromMarkdown(filePath);
                return {
                    title,
                    order,
                    path: slug || `/${entry.name.replace(/\.md$/, "")}`,
                };
            }
        });
    // Sort by order, then title
    navItems.sort((a, b) => {
        const orderA = typeof a.order === "number" ? a.order : 9999;
        const orderB = typeof b.order === "number" ? b.order : 9999;
        if (orderA !== orderB) return orderA - orderB;
        return a.title.localeCompare(b.title);
    });
    return navItems;
}

export function getNavigationTree(): NavItem[] {
    return buildNavTree(MARKDOWN_ROOT, "/goldlabel/markdown");
}
