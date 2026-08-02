import type { Meta, StoryObj } from '@storybook/react';
import { DesignSystemProvider, Logo } from '../../index';

const meta: Meta<typeof Logo> = {
  title: 'Brand/Logo',
  component: Logo,
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Default: Story = {
  render: () => <Logo />,
};

export const Favicon: Story = {
  parameters: {
    usage: {
      code: [
        "import { Logo } from '@nx/design-system';",
        '',
        '<Logo favicon />',
      ].join('\n'),
    },
  },
  render: () => <Logo favicon />,
};

export const Darkmode: Story = {
  render: () => (
    <DesignSystemProvider mode="dark">
      <Logo />
    </DesignSystemProvider>
  ),
};
