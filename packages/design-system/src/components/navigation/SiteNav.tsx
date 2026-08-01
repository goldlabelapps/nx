import type { ReactNode } from 'react';

export type T_NavNode = {
  title?: string;
  slug?: string;
  path?: string;
  children?: T_NavNode[];
};

type SiteNavProps = {
  items: T_NavNode[];
};

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
    <ul className="site-nav-list">
      {items.map((item, index) => {
        const key = `${keyPrefix}-${index}-${item.title || item.slug || item.path || 'node'}`;
        const hasChildren = Array.isArray(item.children) && item.children.length > 0;
        const label = item.title || 'Untitled';

        return (
          <li key={key} className={hasChildren ? 'site-nav-item site-nav-item-branch' : 'site-nav-item'}>
            {hasChildren ? (
              <details className="site-nav-branch">
                <summary className="site-nav-branch-summary">
                  <a href={getNavHref(item)}>{label}</a>
                  <span className="site-nav-branch-toggle" aria-hidden="true">
                    +
                  </span>
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

export function SiteNav({ items }: SiteNavProps) {
  return renderNavItems(items);
}
