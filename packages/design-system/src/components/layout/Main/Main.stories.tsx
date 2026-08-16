import type { Meta, StoryObj } from '@storybook/react-vite';
import { SiteMain } from '../../../index';

const meta: Meta<typeof SiteMain> = {
  title: 'Layout/Main',
  component: SiteMain,
  args: {
    featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    children: 'These components are shared and theme-driven for app-level consistency.',
  },
  argTypes: {
    featuredImage: { control: 'text' },
    children: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof SiteMain>;

export const WithImage: Story = {
  render: (args) => (
    <main className="site-main" id="main">
      <SiteMain {...args}>
        <h2>Ship consistent product surfaces</h2>
        <p>{args.children}</p>
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
