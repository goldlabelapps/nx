"use client";

import Logo from '../../brand/Logo/Logo';
import type { SiteHeaderProps } from './types';

export default function Header({
  title,
  actions,
  icon,
  iconSize = 36,
  homeHref = '/',
  logoSrc,
  logoAlt,
}: SiteHeaderProps) {

  return (
    <header>
      <div
        aria-label="Header"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}
      >

        <div aria-label="Logo and title" style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
          <a
            href={homeHref}
            aria-label={`Go to ${title} home`}
            title={title}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'inherit', textDecoration: 'none' }}
          >
            {icon || logoSrc ? (
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                {icon ? (
                  <Logo icon={icon} iconSize={iconSize}>
                    {title}
                  </Logo>
                ) : (
                  <img
                    src={logoSrc}
                    alt={logoAlt || title}
                    style={{ width: iconSize, height: iconSize, objectFit: 'contain' }}
                  />
                )}
              </div>
            ) : (
              <Logo icon={icon} iconSize={iconSize}>
                {title}
              </Logo>
            )}
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
