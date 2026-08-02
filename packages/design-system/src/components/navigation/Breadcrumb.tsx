import type { BreadcrumbItem, BreadcrumbProps } from '../../types';

export default function Breadcrumb({ items }: BreadcrumbProps) {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="site-breadcrumbs">
      <ol
        style={{
          margin: 0,
          padding: 0,
          listStyle: 'none',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              {item.href && !isLast ? <a href={item.href}>{item.label}</a> : <span aria-current={isLast ? 'page' : undefined}>{item.label}</span>}
              {!isLast ? <span aria-hidden="true">/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}