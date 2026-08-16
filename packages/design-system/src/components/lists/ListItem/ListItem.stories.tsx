import type { Meta, StoryObj } from '@storybook/react-vite';
import ListItem from './ListItem';

const meta = { title: 'Lists/List Item', component: ListItem } satisfies Meta<typeof ListItem>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { children: 'List item' } };