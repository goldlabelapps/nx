import type { Meta, StoryObj } from '@storybook/react';
import { SiteFooter, SiteHeader, SiteMain, SiteNav, SiteSidebar, type T_NavNode } from '../../index';

const sampleNav: T_NavNode[] = [
  { title: 'Home', slug: '/' },
  {
    title: 'Features',
    slug: '/features',
    children: [
      { title: 'Design System', slug: '/features/design-system' },
      { title: 'Storybook', slug: '/features/storybook' },
    ],
  },
  { title: 'Docs', slug: '/docs' },
];

const meta: Meta<typeof SiteHeader> = {
  title: 'Site/Chrome',
  component: SiteHeader,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof SiteHeader>;

export const Default: Story = {
  render: () => (
    <div className="site-shell">
      <SiteHeader
        title="NX Documentation"
        description="Design system reference and implementation guides"
        breadcrumbItems={[]}
        homeHref="/"
        logoSrc="/nx/png/favicon.png"
        logoAlt="NX logo"
        navItems={<SiteNav items={sampleNav} />}
      />

      <main className="site-main" id="main">
        <aside className="site-col site-col-left" aria-label="Primary navigation">
          <div className="site-panel site-panel-nav">
            <SiteNav items={sampleNav} />
          </div>
        </aside>

        <SiteMain featuredImage="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80">
          <h2>Ship consistent product surfaces</h2>
          <p>
            These components now live in the design-system package and can be consumed by multiple apps while sharing
            the same style tokens.
          </p>
        </SiteMain>

        <SiteSidebar title="Release" text="v1.0.0 pilot: grouped navigation and chrome components." />
      </main>

      <SiteFooter />
    </div>
  ),
};
