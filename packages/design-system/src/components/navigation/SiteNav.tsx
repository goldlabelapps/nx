'use client';

import { Fragment, useEffect, useState, type ReactNode } from 'react';
import type { SiteNavProps, T_NavNode } from '../../types';
import List from '../lists/List';
import ListItem from '../lists/ListItem';
import ListItemButton from '../lists/ListItemButton';
import ListItemText from '../lists/ListItemText';

function getNavPath(item: T_NavNode): string {
  if (typeof item.slug === 'string' && item.slug.trim()) {
    return item.slug;
  }
  if (typeof item.path === 'string' && item.path.trim()) {
    return item.path;
  }
  return '#';
}

function isSuppressedHomeItem(item: T_NavNode, depth: number): boolean {
  if (depth !== 0) {
    return false;
  }

  const title = (item.title ?? '').trim().toLowerCase();
  const path = getNavPath(item);
  return title === 'home' || path === '/';
}

function normalizeNavPath(path: string): string {
  if (!path || path === '/') {
    return '/';
  }

  const trimmed = path.trim();
  return trimmed.endsWith('/') ? trimmed.slice(0, -1) : trimmed;
}

function isOnCurrentPath(itemPath: string, currentPath: string): boolean {
  if (!currentPath || !itemPath || itemPath === '#') {
    return false;
  }

  const normalizedCurrentPath = normalizeNavPath(currentPath);
  const normalizedItemPath = normalizeNavPath(itemPath);

  if (normalizedItemPath === '/') {
    return normalizedCurrentPath !== '/';
  }

  return normalizedCurrentPath === normalizedItemPath || normalizedCurrentPath.startsWith(`${normalizedItemPath}/`);
}

function renderNavItems(
  items: T_NavNode[],
  navigateTo?: (path: string, item: T_NavNode) => void,
  depth = 0,
  keyPrefix = 'nav',
  currentPath = '',
): ReactNode {
  if (!Array.isArray(items) || !items.length) {
    return null;
  }

  return (
    <List disablePadding dense>
      {items.map((item, index) => {
        if (isSuppressedHomeItem(item, depth)) {
          return null;
        }

        const key = `${keyPrefix}-${index}-${item.title || item.slug || item.path || 'node'}`;
        const hasChildren = Array.isArray(item.children) && item.children.length > 0;
        const label = item.title || 'Untitled';
        const itemPath = getNavPath(item);
        const isCurrentPath = Boolean(currentPath && itemPath && currentPath === itemPath);
        const shouldRenderChildren = Boolean(hasChildren && isOnCurrentPath(itemPath, currentPath));

        return (
          <Fragment key={key}>
            <ListItem disablePadding>
              <ListItemButton
                disabled={isCurrentPath}
                onClick={() => {
                  navigateTo?.(itemPath, item);
                }}
                sx={{
                  pl: 1.5 + depth * 2,
                  py: 0.25,
                  minHeight: 28,
                  borderRadius: 1,
                }}
              >
                <ListItemText

                  primary={label}
                  sx={{ my: 0 }}
                  primaryTypographyProps={{
                    fontWeight: 400,
                    fontSize: '1rem',
                    lineHeight: 1.15,
                  }}
                />
              </ListItemButton>
            </ListItem>
            {shouldRenderChildren ? renderNavItems(item.children as T_NavNode[], navigateTo, depth + 1, key, currentPath) : null}
          </Fragment>
        );
      })}
    </List>
  );
}

export default function SiteNav({ items, navigateTo }: SiteNavProps) {
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const pathname = window.location.pathname;
    setCurrentPath(pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname);
  }, []);

  return renderNavItems(items, navigateTo, 0, 'nav', currentPath);
}
