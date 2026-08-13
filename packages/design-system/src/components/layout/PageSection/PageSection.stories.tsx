import type { Meta, StoryObj } from '@storybook/react-vite';
import PageSection from './PageSection';

const meta = { title: 'Layout/Page Section', component: PageSection } satisfies Meta<typeof PageSection>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { title: 'Page section', children: 'Section content' } };