import type { Meta, StoryObj } from '@storybook/react-vite';
import SectionTitle from './SectionTitle';

const meta = { title: 'Layout/Section Title', component: SectionTitle } satisfies Meta<typeof SectionTitle>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { title: 'Section title', subtitle: 'Supporting detail' } };