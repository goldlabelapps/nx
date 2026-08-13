import type { Meta, StoryObj } from '@storybook/react-vite';
import Alert from './Alert';

const meta = { title: 'Feedback/Alert', component: Alert } satisfies Meta<typeof Alert>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { title: 'Heads up', children: 'Shared updates are available.' } };
export const Dismissible: Story = { args: { title: 'Error', severity: 'error', dismissible: true, children: 'Something failed.' } };