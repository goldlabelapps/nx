import { serverUseNav, type NavItem } from './serverUseNav';

type ChildPageLink = {
  title: string;
  path: string;
  icon?: string;
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

function findNodeByPath(items: NavItem[], targetPath: string): NavItem | null {
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

function mapVisibleChildren(items: NavItem[]): ChildPageLink[] {
  return items
    .filter((item) => !isHiddenInNav(item.hideInNav) && item.path)
    .map((item) => ({
      title: item.title,
      path: normalizePath(item.path),
      icon: item.icon,
    }));
}

export async function serverUseChildPages(currentPath: string): Promise<ChildPageLink[]> {
  const normalizedPath = normalizePath(currentPath);
  const navItems = await serverUseNav();
  const currentNode = findNodeByPath(navItems, normalizedPath);

  if (currentNode?.children?.length) {
    return mapVisibleChildren(currentNode.children);
  }

  if (normalizedPath === '/') {
    return mapVisibleChildren(navItems).filter((item) => item.path !== '/');
  }

  return [];
}

export type { ChildPageLink };
