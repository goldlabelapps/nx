import fs from 'fs';
import path from 'path';

export type ContentNavItem = {
  title: string;
  path: string;
  order?: number;
  icon?: string;
  type?: string;
  hideInNav?: boolean | string;
  children?: ContentNavItem[];
};

export type ChildPageLink = {
  title: string;
  path: string;
  icon?: string;
  children?: ChildPageLink[];
};

export type FooterColumn = {
  title: string;
  href: string;
  children?: Array<{
    title: string;
    href: string;
  }>;
};

function normalizePath(input: string): string {
  if (!input || input.trim() === '') {
    return '/';
  }

  let value = input.trim();
  if (!value.startsWith('/')) {
    value = `/${value}`;
  }

  if (value.length > 1 && value.endsWith('/')) {
    value = value.replace(/\/+$/, '');
  }

  return value;
}

function isHiddenInNav(value: unknown): boolean {
  if (typeof value === 'boolean') {
    return value;
  }

  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();
    return normalized === 'true' || normalized === '1' || normalized === 'yes';
  }

  return false;
}

function findNodeByPath(items: ContentNavItem[], targetPath: string): ContentNavItem | null {
  for (const item of items) {
    if (normalizePath(item.path) === targetPath) {
      return item;
    }

    if (item.children?.length) {
      const found = findNodeByPath(item.children, targetPath);
      if (found) {
        return found;
      }
    }
  }

  return null;
}

function mapVisibleChildren(items: ContentNavItem[], includeChildren: boolean): ChildPageLink[] {
  return items
    .filter((item) => !isHiddenInNav(item.hideInNav) && item.path)
    .map((item) => {
      const mapped: ChildPageLink = {
        title: item.title,
        path: normalizePath(item.path),
        icon: item.icon,
      };

      if (includeChildren && item.children?.length) {
        const children = mapVisibleChildren(item.children, true);
        if (children.length) {
          mapped.children = children;
        }
      }

      return mapped;
    });
}

export function getChildPagesFromNav(
  navItems: ContentNavItem[],
  currentPath: string,
  options?: {
    includeChildren?: boolean;
    includeRootChildrenWhenAtRoot?: boolean;
  },
): ChildPageLink[] {
  const includeChildren = options?.includeChildren ?? true;
  const includeRootChildrenWhenAtRoot = options?.includeRootChildrenWhenAtRoot ?? true;
  const normalizedPath = normalizePath(currentPath);
  const currentNode = findNodeByPath(navItems, normalizedPath);

  if (currentNode?.children?.length) {
    return mapVisibleChildren(currentNode.children, includeChildren);
  }

  if (normalizedPath === '/' && includeRootChildrenWhenAtRoot) {
    return mapVisibleChildren(navItems, includeChildren).filter((item) => item.path !== '/');
  }

  return [];
}

export function getFooterColumnsFromChildPages(
  childPages: ChildPageLink[],
  options?: {
    maxColumns?: number;
    maxChildrenPerColumn?: number;
    fallbackColumns?: FooterColumn[];
  },
): FooterColumn[] {
  const maxColumns = options?.maxColumns ?? 4;
  const maxChildrenPerColumn = options?.maxChildrenPerColumn ?? 1;

  const columns = childPages.slice(0, maxColumns).map((page) => ({
    title: page.title,
    href: page.path,
    children: (page.children ?? []).slice(0, maxChildrenPerColumn).map((child) => ({
      title: child.title,
      href: child.path,
    })),
  }));

  if (columns.length) {
    return columns;
  }

  return options?.fallbackColumns ?? [];
}

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

type FrontmatterNavMeta = {
  title: string;
  order?: number;
  slug: string;
  icon?: string;
  type?: string;
  hideInNav?: boolean | string;
};

function getFrontmatterFromMarkdown(filePath: string, fallback: string): FrontmatterNavMeta {
  const content = fs.readFileSync(filePath, 'utf-8');
  const { data } = require('gray-matter')(content);
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
