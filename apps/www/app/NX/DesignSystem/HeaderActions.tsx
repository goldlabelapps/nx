'use client';

import { MenuDrawer } from '@nx/design-system';
import { Share } from '@nx/design-system';
import { Fragment, type ReactNode } from 'react';
import ThemeModeToggle from './ThemeModeToggle';

export default function HeaderActions({ navItems }: { navItems: ReactNode }) {
  return (
    <Fragment>
      <MenuDrawer
        navItems={navItems}
        actions={
          <Fragment>
            <Share />
            <ThemeModeToggle />
          </Fragment>
        }
        toggleAriaLabel="Toggle menu"
      />
    </Fragment>
  );
}
