import { render, screen } from '@testing-library/react';
import {
  SiteFooter,
  SiteHeader,
  SiteMain,
  SiteNav,
  type T_NavNode,
} from '@nx/design-system';

describe('design-system site components', () => {
  it('renders recursive navigation nodes', () => {
    const items: T_NavNode[] = [
      { title: 'Home', slug: '/' },
      {
        title: 'Features',
        slug: '/features',
        children: [{ title: 'Design System', slug: '/features/design-system' }],
      },
    ];

    render(<SiteNav items={items} />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByText('Design System')).toBeInTheDocument();
  });

  it('renders breadcrumbs and mobile navigation in the header', () => {
    render(
      <SiteHeader
        title="Docs"
        description="Reference"
        breadcrumbItems={[
          { label: 'Home', href: '/' },
          { label: 'Docs' },
        ]}
        homeHref="/"
        logoSrc="/nx/png/favicon.png"
        logoAlt="NX logo"
        navItems={<SiteNav items={[{ title: 'Home', slug: '/' }]} />}
      />,
    );

    expect(screen.getByText('Docs')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Go to Docs home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('button', { name: 'Toggle menu' })).toBeInTheDocument();
  });

  it('renders the main section and featured image when provided', () => {
    const { container } = render(
      <SiteMain featuredImage="/hero.png">
        <p>Body</p>
      </SiteMain>,
    );

    expect(screen.getByText('Body')).toBeInTheDocument();
    expect(container.querySelector('section[aria-label="Page content"] img')).toHaveAttribute('src', '/hero.png');
  });

  it('renders footer links', () => {
    render(<SiteFooter />);

    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about');
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', 'https://github.com/goldlabelapps/nx');
  });
});
