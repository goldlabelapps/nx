'use client';

import { MenuDrawer } from '@nx/design-system';
import { Share, Icon, IconButton } from '@nx/design-system';
import { Fragment, type ReactNode } from 'react';
import ThemeModeToggle from './ThemeModeToggle';

const GITHUB_REPO_URL = 'https://github.com/goldlabelapps/nx';

export default function HeaderActions({ navItems }: { navItems: ReactNode }) {
  const handleOpenGithub = () => {
    window.open(GITHUB_REPO_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <Fragment>
      <MenuDrawer
        navItems={navItems}
        actions={
          <Fragment>
            <Share />
            

            <ThemeModeToggle />
            <IconButton
              ariaLabel="Open GitHub repository"
              onClick={handleOpenGithub}
              icon={<Icon icon="github" color="secondary" />} />
          </Fragment>
        }
        toggleAriaLabel="Menu"
      />
    </Fragment>
  );
}
