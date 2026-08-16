import { buildContentNavTreeFromMarkdownRoot } from '@nx/content/server';
import type { ContentNavItem } from '@nx/content';
import { resolveMarkdownRoot } from '../markdownRoots';

export type NavItem = ContentNavItem;


async function getMarkdownRoot() {
    return resolveMarkdownRoot();
}

export async function serverUseNav(): Promise<NavItem[]> {
    const markdownRoot = await getMarkdownRoot();
    return buildContentNavTreeFromMarkdownRoot(markdownRoot);
}
