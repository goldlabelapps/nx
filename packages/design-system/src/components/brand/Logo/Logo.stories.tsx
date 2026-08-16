import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesignSystemProvider, Logo } from '../../../index';

const meta: Meta<typeof Logo> = {
  title: 'Brand/Logo',
  component: Logo,
  args: {
    name: 'NX',
    subtitle: 'Design System',
    favicon: false,
    iconSize: 36,
  },
  argTypes: {
    favicon: { control: 'boolean' },
    iconSize: { control: { type: 'number', min: 16, max: 120, step: 2 } },
    icon: { control: false },
    children: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Default: Story = {
  render: (args) => <Logo {...args} />,
};

export const Favicon: Story = {
  args: {
    favicon: true,
  },
  parameters: {
    usage: {
      code: [
        "import { Logo } from '@nx/design-system';",
        '',
        '<Logo favicon />',
      ].join('\n'),
    },
  },
  render: (args) => <Logo {...args} />,
};

export const Darkmode: Story = {
  render: (args) => (
    <DesignSystemProvider mode="dark">
      <Logo {...args} />
    </DesignSystemProvider>
  ),
};
