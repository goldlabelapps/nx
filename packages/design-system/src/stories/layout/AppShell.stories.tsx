import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '@mui/material';
import { AppShell, PageSection, SectionTitle } from '../../index';

const meta: Meta<typeof AppShell> = {
  title: 'Layout/App Shell',
  component: AppShell,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof AppShell>;

export const Overview: Story = {
  render: () => (
    <AppShell>
      <PageSection title="Layout primitives" subtitle="Base shell, section spacing, and title hierarchy.">
        <Box className="nx-surface" sx={{ p: 3, display: 'grid', gap: 2 }}>
          <SectionTitle title="Consistent rhythm" subtitle="Use shared spacing primitives to keep pages aligned." />
        </Box>
      </PageSection>
    </AppShell>
  ),
};
