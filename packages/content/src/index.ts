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

export function buildNavTreeFromFlatItems(items: ContentNavItem[]): ContentNavItem[] {
  const sorted = [...items].sort((a, b) => {
    const orderA = typeof a.order === 'number' ? a.order : 9999;
    const orderB = typeof b.order === 'number' ? b.order : 9999;

    if (orderA !== orderB) {
      return orderA - orderB;
    }

    return a.title.localeCompare(b.title);
  });

  const byPath = new Map<string, ContentNavItem>();

  for (const item of sorted) {
    const normalizedPath = normalizePath(item.path);
    byPath.set(normalizedPath, {
      ...item,
      path: normalizedPath,
      children: [],
    });
  }

  const roots: ContentNavItem[] = [];

  for (const item of sorted) {
    const normalizedPath = normalizePath(item.path);
    const node = byPath.get(normalizedPath);

    if (!node) {
      continue;
    }

    const parts = normalizedPath.split('/').filter(Boolean);
    const parentPath = parts.length > 1 ? `/${parts.slice(0, -1).join('/')}` : null;

    if (parentPath && parentPath !== '/' && byPath.has(parentPath)) {
      byPath.get(parentPath)?.children?.push(node);
      continue;
    }

    roots.push(node);
  }

  const pruneEmptyChildren = (nodes: ContentNavItem[]): ContentNavItem[] =>
    nodes.map((node) => {
      const nextChildren = node.children && node.children.length
        ? pruneEmptyChildren(node.children)
        : undefined;

      return {
        ...node,
        children: nextChildren,
      };
    });

  return pruneEmptyChildren(roots);
}
