import type { Meta, StoryObj } from '@storybook/react';
import { Header, SiteNav, type T_NavNode } from '../../index';

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

const meta: Meta<typeof Header> = {
  title: 'Layout/Header',
  component: Header,
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Description: Story = {
  render: () => (
    <div className="site-shell">
      <Header
        title="NX Documentation"
        description="Design system reference and implementation guides"
        homeHref="/"
        logoSrc="/nx/png/favicon.png"
        logoAlt="NX logo"
        navItems={<SiteNav items={sampleNav} />}
      />
    </div>
  ),
};
