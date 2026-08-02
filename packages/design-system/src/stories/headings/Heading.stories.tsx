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
          <Heading {...args}>Label variant (default)</Heading>
          <Heading tone="secondary">Secondary tone</Heading>
          <Heading as="div">Block rendering</Heading>
          <Heading as="h1">H1 semantic heading</Heading>
          <Heading as="h2">H2 semantic heading</Heading>
          <Heading as="h3">H3 semantic heading</Heading>
          <Heading as="h4">H4 semantic heading</Heading>
          <Heading as="h5">H5 semantic heading</Heading>
          <Heading as="h6">H6 semantic heading</Heading>
          <Heading as="span" variant="h1">H1 style on span</Heading>
        </Stack>
      </PageSection>
    </AppShell>
  ),
};
