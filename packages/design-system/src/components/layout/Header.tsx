"use client";

import { useState } from 'react';
import { Box, Popover } from '@mui/material';
import Logo from '../brand/Logo';
import IconButton from '../buttons/IconButton';
import Icon from '../icons/Icon';
import type { SiteHeaderProps } from '../../types';

export default function Header({
  title,
  description,
  breadcrumbItems,
  navItems,
}: SiteHeaderProps) {
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const isMenuOpen = Boolean(menuAnchor);

  const handleMenuToggle = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor((current) => (current ? null : event.currentTarget));
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

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

        <Box>
          <IconButton
            icon={<Icon icon="menu" />}
            ariaLabel="Toggle menu"
            onClick={handleMenuToggle}
            aria-haspopup="menu"
            aria-expanded={isMenuOpen}
            aria-controls={isMenuOpen ? 'header-mobile-nav' : undefined}
          />
          <Popover
            id="header-mobile-nav"
            open={isMenuOpen}
            anchorEl={menuAnchor}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
              sx: {
                mt: 1,
                minWidth: 240,
                p: 1.25,
                borderRadius: '3px',
              },
            }}
          >
            <nav aria-label="Primary navigation">{navItems}</nav>
          </Popover>
        </Box>
      </div>
    </header>
  );
}
