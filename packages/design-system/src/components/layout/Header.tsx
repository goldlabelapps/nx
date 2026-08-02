"use client";

import Logo from '../brand/Logo';
import type { SiteHeaderProps } from '../../types';

export default function Header({
  title,
  actions,
}: SiteHeaderProps) {
  return (
    <header>
      <div
        aria-label="Header"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}
      >
        <div aria-label="Logo and title" style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
          <a
            href="/"
            aria-label={`Go to ${title} home`}
            title={title}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'inherit', textDecoration: 'none' }}
          >
            <Logo name={title}>{title}</Logo>
          </a>
        </div>
        
        {actions ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginLeft: 'auto' }}>
            {actions}
          </div>
        ) : null}
      </div>
    </header>
  );
}
