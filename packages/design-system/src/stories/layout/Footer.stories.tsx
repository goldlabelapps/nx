import type { Meta, StoryObj } from '@storybook/react-vite';
import { SiteFooter } from '../../index';

const meta: Meta<typeof SiteFooter> = {
  title: 'Layout/Footer',
  component: SiteFooter,
  args: {
    columns: [
      {
        title: 'Features',
        href: '/features',
        children: [
          { title: 'Design System', href: '/features/design-system' },
          { title: 'Storybook', href: '/features/storybook' },
          { title: 'Navigation', href: '/features/navigation' },
        ],
      },
      {
        title: 'Guides',
        href: '/guides',
        children: [
          { title: 'Setup', href: '/guides/setup' },
          { title: 'Usage', href: '/guides/usage' },
        ],
      },
      {
        title: 'API',
        href: '/api',
      },
    ],
  },
  argTypes: {
    columns: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof SiteFooter>;

export const Default: Story = {
  render: (args) => <SiteFooter {...args} />,
};
