'use client';

import { MenuDrawer } from '@nx/design-system';
import { Fragment, type ReactNode } from 'react';
import ThemeModeToggle from './ThemeModeToggle';

export default function HeaderActions({ navItems }: { navItems: ReactNode }) {
  return (
    <Fragment>
      Share
      <ThemeModeToggle />
      <MenuDrawer navItems={navItems} toggleAriaLabel="Toggle menu" />
    </Fragment>
  );
}
