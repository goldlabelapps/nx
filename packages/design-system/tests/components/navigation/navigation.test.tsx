import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Breadcrumb from '../../../src/components/navigation/Breadcrumb';
import Share from '../../../src/components/navigation/Share';
import SiteNav from '../../../src/components/navigation/SiteNav';

describe('site navigation', () => {
  it('renders breadcrumb trail with current page marker', () => {
    const { container } = render(
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Docs', href: '/docs' },
          { label: 'Navigation' },
        ]}
      />
    );

    expect(screen.getByLabelText('Breadcrumb')).toBeTruthy();
    expect(container.querySelector('nav.site-breadcrumbs a[href="/"]')?.textContent).toBe('Home');
    expect(container.querySelector('nav.site-breadcrumbs span[aria-current="page"]')?.textContent).toBe('Navigation');
  });

  it('renders flat and nested items', async () => {
    const originalPath = window.location.pathname;
    window.history.pushState({}, '', '/features');

    try {
      render(
        <SiteNav
          items={[
            { title: 'Home', slug: '/' },
            {
              title: 'Features',
              slug: '/features',
              children: [
                { title: 'Design System', slug: '/features/design-system' },
                { title: 'Storybook', slug: '/features/storybook' },
              ],
            },
          ]}
        />
      );

      expect(screen.queryByRole('button', { name: 'Home' })).toBeNull();
      expect(screen.getByRole('button', { name: 'Features' })).toBeTruthy();
      expect(await screen.findByRole('button', { name: 'Design System' })).toBeTruthy();
      expect(await screen.findByRole('button', { name: 'Storybook' })).toBeTruthy();
    } finally {
      window.history.pushState({}, '', originalPath);
    }
  });

  it('calls navigateTo with path and item when clicked', () => {
    const navigateTo = vi.fn();

    const { container } = render(
      <SiteNav
        navigateTo={navigateTo}
        items={[
          { title: 'Home', slug: '/' },
          { title: 'Docs', path: '/docs' },
        ]}
      />
    );

    expect(within(container).queryByRole('button', { name: 'Home' })).toBeNull();

    fireEvent.click(within(container).getByRole('button', { name: 'Docs' }));
    expect(navigateTo).toHaveBeenCalledWith('/docs', { title: 'Docs', path: '/docs' });
  });

  it('renders share actions and copies the provided url', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText,
      },
    });

    render(
      <Share
        url="https://nx.dev/design-system/share"
        title="NX Design System"
        description="Reusable navigation primitives."
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Open share menu' }));

    expect(await screen.findByRole('menu', { name: 'Share menu' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Share on X/Twitter' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Share on Facebook' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Share on LinkedIn' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Share on WhatsApp' })).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'Copy link' }));

    expect(writeText).toHaveBeenCalledWith('https://nx.dev/design-system/share');
    expect((await screen.findByRole('status')).textContent).toContain('Copied https://nx.dev/design-system/share to clipboard.');
  });
});