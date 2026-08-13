import type { Meta, StoryObj } from '@storybook/react-vite';
import { MenuDrawer, SiteNav, type T_NavNode } from '../../../index';

const sampleNav: T_NavNode[] = [
  { title: 'Home', slug: '/' },
  {
    title: 'Guides',
    slug: '/guides',
    children: [
      { title: 'Getting Started', slug: '/guides/getting-started' },
      { title: 'Components', slug: '/guides/components' },
    ],
  },
  { title: 'API', slug: '/api' },
];

const meta: Meta<typeof MenuDrawer> = {
  title: 'Layout/Menu Drawer',
  component: MenuDrawer,
  args: {
    toggleAriaLabel: 'Toggle navigation menu',
  },
  argTypes: {
    toggleAriaLabel: { control: 'text' },
    navItems: { control: false },
    actions: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof MenuDrawer>;

export const Default: Story = {
  parameters: {
    usage: {
      code: [
        "import { MenuDrawer, SiteNav } from '@nx/design-system';",
        '',
        'const navItems = [',
        "  { title: 'Home', slug: '/' },",
        "  { title: 'API', slug: '/api' },",
        '];',
        '',
        '<MenuDrawer navItems={<SiteNav items={navItems} />} />',
      ].join('\n'),
    },
  },
  render: (args) => <MenuDrawer {...args} navItems={<SiteNav items={sampleNav} />} />,
};
