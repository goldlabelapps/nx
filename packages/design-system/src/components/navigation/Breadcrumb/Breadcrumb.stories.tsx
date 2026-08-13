import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumb } from '../../../index';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Navigation/Breadcrumb',
  component: Breadcrumb,
  args: {
    items: [
      { label: 'Docs', href: '/docs' },
      { label: 'Navigation', href: '/docs/navigation' },
      { label: 'Breadcrumb' },
    ],
  },
  argTypes: {
    items: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  parameters: {
    usage: {
      code: [
        "import { Breadcrumb } from '@nx/design-system';",
        '',
        '<Breadcrumb',
        '  items={[',
        "    { label: 'Docs', href: '/docs' },",
        "    { label: 'Navigation', href: '/docs/navigation' },",
        "    { label: 'Breadcrumb' },",
        '  ]}',
        '/>',
      ].join('\n'),
    },
  },
  render: (args) => <Breadcrumb {...args} />,
};
