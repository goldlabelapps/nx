import type { Meta, StoryObj } from '@storybook/react-vite';
import { FeaturedImage } from '../../index';

const meta: Meta<typeof FeaturedImage> = {
  title: 'Images/Featured Image',
  component: FeaturedImage,
  args: {
    image: {
      src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      alt: 'A scenic landscape with layered hills',
      objectFit: 'cover',
    },
    height: 320,
  },
  argTypes: {
    image: { control: 'object' },
    width: { control: 'text' },
    height: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof FeaturedImage>;

export const Default: Story = {
  render: (args) => <FeaturedImage {...args} />,
};
