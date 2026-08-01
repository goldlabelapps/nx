import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from '@mui/material';
import { AppShell, Heading, PageSection } from '../../index';

const meta: Meta<typeof Heading> = {
  title: 'Headings/Heading',
  component: Heading,
  args: {
    children: 'Editorial label',
  },
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const Overview: Story = {
  render: (args) => (
    <AppShell>
      <PageSection title="Heading styles" subtitle="Compact heading labels for section context and hierarchy.">
        <Stack spacing={2}>
          <Heading {...args} />
          <Heading tone="secondary">Secondary tone</Heading>
          <Heading as="div">Block rendering</Heading>
        </Stack>
      </PageSection>
    </AppShell>
  ),
};
