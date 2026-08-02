import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
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
    const { container } = render(
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

    expect(container.querySelector('a[href="/"]')?.textContent).toBe('Home');
    expect(container.querySelector('a[href="/features"]')?.textContent).toBe('Features');
    expect(container.querySelector('a[href="/features/design-system"]')?.textContent).toBe('Design System');
    expect(container.querySelector('a[href="/features/storybook"]')?.textContent).toBe('Storybook');
  });
});