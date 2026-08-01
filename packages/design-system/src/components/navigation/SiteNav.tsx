import type { ReactNode } from 'react';
import type { SiteNavProps, T_NavNode } from '../../types';

function getNavHref(item: T_NavNode): string {
  if (typeof item.slug === 'string' && item.slug.trim()) {
    return item.slug;
  }
  if (typeof item.path === 'string' && item.path.trim()) {
    return item.path;
  }
  return '#';
}

function renderNavItems(items: T_NavNode[], keyPrefix = 'nav'): ReactNode {
  if (!Array.isArray(items) || !items.length) {
    return null;
  }

  return (
    <ul>
      {items.map((item, index) => {
        const key = `${keyPrefix}-${index}-${item.title || item.slug || item.path || 'node'}`;
        const hasChildren = Array.isArray(item.children) && item.children.length > 0;
        const label = item.title || 'Untitled';

        return (
          <li key={key}>
            {hasChildren ? (
              <details>
                <summary>
                  <a href={getNavHref(item)}>{label}</a>
                  <span aria-hidden="true">+</span>
                </summary>
                {renderNavItems(item.children as T_NavNode[], key)}
              </details>
            ) : (
              <a href={getNavHref(item)}>{label}</a>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default function SiteNav({ items }: SiteNavProps) {
  return renderNavItems(items);
}
