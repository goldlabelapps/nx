import type { Meta, StoryObj } from '@storybook/react';
import { SiteFooter } from '../../index';

const meta: Meta<typeof SiteFooter> = {
  title: 'Layout/Footer',
  component: SiteFooter,
};

export default meta;
type Story = StoryObj<typeof SiteFooter>;

export const Default: Story = {
  render: () => <SiteFooter />,
};
