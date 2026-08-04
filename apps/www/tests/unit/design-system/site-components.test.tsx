import { render, screen } from '@testing-library/react';
import {
  SiteFooter,
  Header,
  SiteMain,
  SiteNav,
  type T_NavNode,
} from '@nx/design-system';

describe('design-system site components', () => {
  it('renders recursive navigation nodes', async () => {
    const originalPath = window.location.pathname;
    window.history.pushState({}, '', '/features');

    try {
      const items: T_NavNode[] = [
        { title: 'Home', slug: '/' },
        {
          title: 'Features',
          slug: '/features',
          children: [{ title: 'Design System', slug: '/features/design-system' }],
        },
      ];

      render(<SiteNav items={items} />);

      expect(screen.queryByText('Home')).toBeNull();
      expect(screen.getByText('Features')).toBeInTheDocument();
      expect(await screen.findByText('Design System')).toBeInTheDocument();
    } finally {
      window.history.pushState({}, '', originalPath);
    }
  });

  it('renders the header home link and actions', () => {
    render(
      <Header
        title="Docs"
        description="Reference"
        homeHref="/"
        logoSrc="/nx/png/favicon.png"
        logoAlt="NX logo"
        navItems={<SiteNav items={[{ title: 'Home', slug: '/' }]} />}
        actions={<button type="button">Toggle menu</button>}
      />,
    );

    expect(screen.getByRole('link', { name: 'Go to Docs home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('img', { name: 'NX logo' })).toBeInTheDocument();
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
