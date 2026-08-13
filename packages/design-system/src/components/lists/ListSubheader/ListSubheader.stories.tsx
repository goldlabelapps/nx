import type { Meta, StoryObj } from '@storybook/react-vite';
import ListSubheader from './ListSubheader';

const meta = { title: 'Lists/List Subheader', component: ListSubheader } satisfies Meta<typeof ListSubheader>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { children: 'List heading' } };