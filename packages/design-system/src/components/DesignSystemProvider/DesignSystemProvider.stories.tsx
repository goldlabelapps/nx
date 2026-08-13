import type { Meta, StoryObj } from '@storybook/react-vite';
import DesignSystemProvider from './DesignSystemProvider';

const meta = { title: 'Provider/Design System Provider', component: DesignSystemProvider } satisfies Meta<typeof DesignSystemProvider>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { children: 'Provider content' } };