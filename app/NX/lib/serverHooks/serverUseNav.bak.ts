
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface NavItem {
    title: string;
    path: string;
    order?: number;
    icon?: string;
    type?: string; // 'terminal' or undefined
    children?: NavItem[];
}

async function getMarkdownRoot() {
    const project = process.env.NEXT_PUBLIC_TENANT || "goldlabel";
    return path.join(process.cwd(), `public/${project}/markdown`);
}

function normalizeSlug(slug: string | undefined, fallback: string): string {
    if (!slug || typeof slug !== "string" || slug.trim() === "") {
        slug = fallback;
    }
    // Ensure leading slash
    if (!slug.startsWith("/")) {
        slug = "/" + slug;
    }
    // Remove trailing slash unless root
    if (slug.length > 1 && slug.endsWith("/")) {
        slug = slug.replace(/\/+$/, "");
    }
    return slug;
}

function getFrontmatterFromMarkdown(filePath: string, fallback: string): { title: string; order?: number; slug: string; icon?: string; type?: string } {
    const content = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(content);
    const title = data.title || path.basename(filePath, ".md");
    const order = typeof data.order === "number" ? data.order : undefined;
    const slug = normalizeSlug(data.slug, fallback);
    const icon = typeof data.icon === "string" ? data.icon : undefined;
    const type = typeof data.type === "string" ? data.type : undefined;
    return { title, order, slug, icon, type };
}

function buildNavTree(dir: string, baseUrl: string): NavItem[] {
    if (!fs.existsSync(dir)) {
        // Directory does not exist, return empty array
        return [];
    }
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const navItems = entries
        .filter((entry) => entry.isDirectory() || entry.name.endsWith(".md"))
        .map((entry) => {
            if (entry.isDirectory()) {
                const children = buildNavTree(path.join(dir, entry.name), `${baseUrl}/${entry.name}`);
                // Try to find an index.md for directory metadata
                const indexPath = path.join(dir, entry.name, "index.md");
                let meta: { title: string; slug: string; order?: number; icon?: string; type?: string } = { title: entry.name, slug: normalizeSlug(undefined, `/${entry.name}`), order: undefined, icon: undefined, type: undefined };
                if (fs.existsSync(indexPath)) {
                    const { title, order, slug, icon, type } = getFrontmatterFromMarkdown(indexPath, `/${entry.name}`);
                    meta = { title, slug, order, icon, type };
                }
                return {
                    ...meta,
                    path: meta.slug,
                    children,
                };
            } else {
                const filePath = path.join(dir, entry.name);
                const fallback = `/${entry.name.replace(/\.md$/, "")}`;
                const { title, order, slug, icon, type } = getFrontmatterFromMarkdown(filePath, fallback);
                return {
                    title,
                    order,
                    path: slug,
                    icon,
                    type,
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

export async function serverUseNav(): Promise<NavItem[]> {
    const project = process.env.NEXT_PUBLIC_TENANT || "goldlabel";
    const markdownRoot = await getMarkdownRoot();
    const baseUrl = `/${project}/markdown`;
    return buildNavTree(markdownRoot, baseUrl);
}
