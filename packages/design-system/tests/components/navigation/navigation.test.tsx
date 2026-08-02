import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Breadcrumb from '../../../src/components/navigation/Breadcrumb';
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

  it('renders flat and nested items', () => {
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
    expect(screen.getByRole('button', { name: 'Design System' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Storybook' })).toBeTruthy();
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
});