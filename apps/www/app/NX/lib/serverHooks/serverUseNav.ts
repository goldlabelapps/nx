import path from "path";
import { buildContentNavTreeFromMarkdownRoot } from '../content';
import type { ContentNavItem } from '../content';

export type NavItem = ContentNavItem;


async function getMarkdownRoot() {
    return path.join(process.cwd(), 'public', 'nx', 'markdown');
}

export async function serverUseNav(): Promise<NavItem[]> {
    const markdownRoot = await getMarkdownRoot();
    return buildContentNavTreeFromMarkdownRoot(markdownRoot);
}
