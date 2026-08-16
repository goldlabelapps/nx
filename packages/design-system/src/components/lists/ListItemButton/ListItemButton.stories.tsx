import type { Meta, StoryObj } from '@storybook/react-vite';
import ListItemButton from './ListItemButton';

const meta = { title: 'Lists/List Item Button', component: ListItemButton } satisfies Meta<typeof ListItemButton>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { children: 'List item button' } };