"use client";

import Logo from '../brand/Logo';
import Heading from '../headings/Heading';
import MenuDrawer from './MenuDrawer';
import type { SiteHeaderProps } from '../../types';

export default function Header({
  title,
  description,
  navItems,
}: SiteHeaderProps) {
  return (
    <header>
      <div
        aria-label="Header"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}
      >
        <div aria-label="Logo and title" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a
            href="/"
            aria-label={`Go to ${title} home`}
            title={title}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'inherit', textDecoration: 'none' }}
          >
            <Logo name={title}>{title}</Logo>
          </a>
        </div>

        <MenuDrawer navItems={navItems} toggleAriaLabel="Toggle menu" />
      </div>
    </header>
  );
}
