import type { Meta, StoryObj } from '@storybook/react-vite';
import Field from './Field';

const meta = { title: 'Feedback/Field', component: Field } satisfies Meta<typeof Field>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { label: 'Email', hint: 'Use work email' } };
export const Error: Story = { args: { label: 'Project', error: 'Required' } };