import type { Meta, StoryObj } from '@storybook/react-vite';
import ListItemText from './ListItemText';

const meta = { title: 'Lists/List Item Text', component: ListItemText } satisfies Meta<typeof ListItemText>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { primary: 'List item text' } };