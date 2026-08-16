import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { ContentNavItem } from './index';

type FrontmatterNavMeta = {
  title: string;
  order?: number;
  slug: string;
  icon?: string;
  type?: string;
  hideInNav?: boolean | string;
};

function normalizeSlug(slug: string | undefined, fallback: string): string {
  if (!slug || typeof slug !== 'string' || slug.trim() === '') {
    slug = fallback;
  }

  if (!slug.startsWith('/')) {
    slug = `/${slug}`;
  }

  if (slug.length > 1 && slug.endsWith('/')) {
    slug = slug.replace(/\/+$/, '');
  }

  return slug;
}

function normalizeNavTitle(title: string, slug: string): string {
  return slug === '/' ? 'Home' : title;
}

function getFrontmatterFromMarkdown(filePath: string, fallback: string): FrontmatterNavMeta {
  const content = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(content);
  const title = data.title || path.basename(filePath, '.md');
  const order = typeof data.order === 'number' ? data.order : undefined;
  const slug = normalizeSlug(data.slug, fallback);
  const icon = typeof data.icon === 'string' ? data.icon : undefined;
  const type = typeof data.type === 'string' ? data.type : undefined;
  const hideInNav = data.hideInNav;

  return { title, order, slug, icon, type, hideInNav };
}

function buildNavTree(dir: string): ContentNavItem[] {
  if (!fs.existsSync(dir)) {
    return [];
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const navItems = entries
    .filter((entry) => entry.isDirectory() || entry.name.endsWith('.md'))
    .map((entry) => {
      if (entry.isDirectory()) {
        const children = buildNavTree(path.join(dir, entry.name));
        const indexPath = path.join(dir, entry.name, 'index.md');

        let meta: FrontmatterNavMeta = {
          title: entry.name,
          slug: normalizeSlug(undefined, `/${entry.name}`),
          order: undefined,
          icon: undefined,
          type: undefined,
          hideInNav: undefined,
        };

        if (fs.existsSync(indexPath)) {
          const parsed = getFrontmatterFromMarkdown(indexPath, `/${entry.name}`);
          meta = {
            ...parsed,
            title: normalizeNavTitle(parsed.title, parsed.slug),
          };
        }

        const filteredChildren = children.filter((child) => child.path !== meta.slug);

        return {
          ...meta,
          path: meta.slug,
          children: filteredChildren,
        } as ContentNavItem;
      }

      const filePath = path.join(dir, entry.name);
      const fallback = `/${entry.name.replace(/\.md$/, '')}`;
      const { title, order, slug, icon, type, hideInNav } = getFrontmatterFromMarkdown(filePath, fallback);

      return {
        title: normalizeNavTitle(title, slug),
        order,
        path: slug,
        icon,
        type,
        hideInNav,
      } as ContentNavItem;
    });

  navItems.sort((a, b) => {
    const orderA = typeof a.order === 'number' ? a.order : 9999;
    const orderB = typeof b.order === 'number' ? b.order : 9999;

    if (orderA !== orderB) {
      return orderA - orderB;
    }

    return a.title.localeCompare(b.title);
  });

  return navItems;
}

export function buildContentNavTreeFromMarkdownRoot(markdownRoot: string): ContentNavItem[] {
  return buildNavTree(markdownRoot);
}
