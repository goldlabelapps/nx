"use client";

import Logo from '../brand/Logo';
import MenuDrawer from './MenuDrawer';
import type { SiteHeaderProps } from '../../types';

export default function Header({
  title,
  description,
  breadcrumbItems,
  navItems,
}: SiteHeaderProps) {
  return (
    <header>
      <div
        aria-label="Main header bar"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}
      >
        <div aria-label="Brand and overview">
          <a
            href="/"
            aria-label={`Go to ${title} home`}
            title={title}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'inherit', textDecoration: 'none' }}
          >
            <Logo name={title}>{title}</Logo>
            <div>
              <div style={{ color: 'text.secondary' }}>
                {breadcrumbItems.length ? (
                  <span>{breadcrumbItems.map((item) => item.label).join(' / ')}</span>
                ) : (
                  description && <span>{description}</span>
                )}
              </div>
            </div>
          </a>
        </div>

        <MenuDrawer navItems={navItems} toggleAriaLabel="Toggle menu" />
      </div>
    </header>
  );
}
