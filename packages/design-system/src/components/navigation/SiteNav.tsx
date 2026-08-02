'use client';

import { Fragment, type ReactNode } from 'react';
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


function renderNavItems(
  items: T_NavNode[],
  navigateTo?: (path: string, item: T_NavNode) => void,
  depth = 0,
  keyPrefix = 'nav'
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

        return (
          <Fragment key={key}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  navigateTo?.(getNavPath(item), item);
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
                    fontWeight: hasChildren ? 600 : 500,
                    fontSize: '1rem',
                    lineHeight: 1.15,
                  }}
                />
              </ListItemButton>
            </ListItem>
            {hasChildren ? renderNavItems(item.children as T_NavNode[], navigateTo, depth + 1, key) : null}
          </Fragment>
        );
      })}
    </List>
  );
}

export default function SiteNav({ items, navigateTo }: SiteNavProps) {
  return renderNavItems(items, navigateTo);
}
