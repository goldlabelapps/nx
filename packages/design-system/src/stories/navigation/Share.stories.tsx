import type { Meta, StoryObj } from '@storybook/react-vite';
import { Share } from '../../index';

const meta: Meta<typeof Share> = {
  title: 'Navigation/Share',
  component: Share,
  args: {
    size: 'medium',
    url: 'https://nx.dev/design-system/share',
    title: 'NX Design System',
    description: 'Reusable navigation and content primitives for NX projects.',
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['small', 'medium', 'large'] },
    url: { control: 'text' },
    title: { control: 'text' },
    description: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Share>;

export const Default: Story = {};

export const Compact: Story = {
  args: {
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
  },
};