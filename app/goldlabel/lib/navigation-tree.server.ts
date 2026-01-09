import fs from "fs";
import path from "path";

export interface NavItem {
    title: string;
    path: string;
    children?: NavItem[];
}

const MARKDOWN_ROOT = path.join(process.cwd(), "app/goldlabel/markdown");

function getTitleFromMarkdown(filePath: string): string {
    const content = fs.readFileSync(filePath, "utf-8");
    const match = content.match(/^#\s+(.+)/m);
    return match ? match[1].trim() : path.basename(filePath, ".md");
}

function buildNavTree(dir: string, baseUrl = "/goldlabel/markdown"): NavItem[] {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    return entries
        .filter((entry) => entry.isDirectory() || entry.name.endsWith(".md"))
        .map((entry) => {
            if (entry.isDirectory()) {
                const children = buildNavTree(path.join(dir, entry.name), `${baseUrl}/${entry.name}`);
                return {
                    title: entry.name,
                    path: `${baseUrl}/${entry.name}`,
                    children,
                };
            } else {
                const filePath = path.join(dir, entry.name);
                return {
                    title: getTitleFromMarkdown(filePath),
                    path: `${baseUrl}/${entry.name.replace(/\.md$/, "")}`,
                };
            }
        });
}

export function getNavigationTree(): NavItem[] {
    return buildNavTree(MARKDOWN_ROOT, "/goldlabel/markdown");
}
