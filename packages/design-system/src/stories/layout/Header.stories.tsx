import type { Meta, StoryObj } from '@storybook/react-vite';
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
  args: {
    title: 'NX Documentation',
    homeHref: '/',
    iconSize: 36,
    logoSrc: '/nx/png/favicon.png',
    logoAlt: 'NX logo',
  },
  argTypes: {
    title: { control: 'text' },
    homeHref: { control: 'text' },
    iconSize: { control: { type: 'number', min: 16, max: 120, step: 2 } },
    logoSrc: { control: 'text' },
    logoAlt: { control: 'text' },
    icon: { control: false },
    actions: { control: false },
    navItems: { control: false },
    description: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Playground: Story = {
  render: (args) => (
    <div className="site-shell">
      <Header {...args} />
    </div>
  ),
};

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
