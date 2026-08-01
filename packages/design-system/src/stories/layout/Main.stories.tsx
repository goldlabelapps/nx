import type { Meta, StoryObj } from '@storybook/react';
import { SiteMain } from '../../index';

const meta: Meta<typeof SiteMain> = {
  title: 'Layout/Main',
  component: SiteMain,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof SiteMain>;

export const WithImage: Story = {
  render: () => (
    <main className="site-main" id="main">
      <SiteMain featuredImage="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80">
        <h2>Ship consistent product surfaces</h2>
        <p>These components are shared and theme-driven for app-level consistency.</p>
      </SiteMain>
    </main>
  ),
};

export const WithoutImage: Story = {
  render: () => (
    <main className="site-main" id="main">
      <SiteMain>
        <h2>Content-first layout</h2>
        <p>Use the main panel without an image when content should lead.</p>
      </SiteMain>
    </main>
  ),
};
