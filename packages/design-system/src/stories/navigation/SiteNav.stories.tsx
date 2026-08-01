import type { Meta, StoryObj } from '@storybook/react';
import { SiteNav, type T_NavNode } from '../../index';

const sampleNav: T_NavNode[] = [
  { title: 'Home', slug: '/' },
  {
    title: 'Features',
    slug: '/features',
    children: [
      { title: 'Design System', slug: '/features/design-system' },
      { title: 'Storybook', slug: '/features/storybook' },
      { title: 'Navigation', slug: '/features/navigation' },
    ],
  },
  {
    title: 'Guides',
    slug: '/guides',
    children: [
      { title: 'Setup', slug: '/guides/setup' },
      { title: 'Usage', slug: '/guides/usage' },
    ],
  },
  { title: 'Docs', slug: '/docs' },
];

const meta: Meta<typeof SiteNav> = {
  title: 'Navigation/Site Nav',
  component: SiteNav,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof SiteNav>;

export const Default: Story = {
  render: () => (
    <div className="site-panel site-panel-nav" style={{ maxWidth: 320 }}>
      <SiteNav items={sampleNav} />
    </div>
  ),
};
