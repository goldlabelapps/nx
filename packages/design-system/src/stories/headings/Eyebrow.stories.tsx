import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from '@mui/material';
import { AppShell, Eyebrow, PageSection } from '../../index';

const meta: Meta<typeof Eyebrow> = {
  title: 'Headings/Eyebrow',
  component: Eyebrow,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    children: 'Editorial label',
  },
};

export default meta;
type Story = StoryObj<typeof Eyebrow>;

export const Overview: Story = {
  render: (args) => (
    <AppShell>
      <PageSection title="Eyebrow styles" subtitle="Compact heading labels for section context and hierarchy.">
        <Stack spacing={2}>
          <Eyebrow {...args} />
          <Eyebrow tone="secondary">Secondary tone</Eyebrow>
          <Eyebrow as="div">Block rendering</Eyebrow>
        </Stack>
      </PageSection>
    </AppShell>
  ),
};
