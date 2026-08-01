import type { Meta, StoryObj } from '@storybook/react';
import { SiteSidebar } from '../../index';

const meta: Meta<typeof SiteSidebar> = {
  title: 'Layout/Sidebar',
  component: SiteSidebar,
};

export default meta;
type Story = StoryObj<typeof SiteSidebar>;

export const Default: Story = {
  render: () => (
    <main className="site-main" id="main">
      <SiteSidebar title="Release" text="v1.0.0 pilot: grouped navigation and layout components." />
    </main>
  ),
};
