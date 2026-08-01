import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from '@mui/material';
import { Alert, AppShell, PageSection } from '../../index';

const meta: Meta<typeof Alert> = {
  title: 'Feedback/Alert',
  component: Alert,
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const States: Story = {
  render: () => (
    <AppShell>
      <PageSection title="Alert states" subtitle="Inline messaging for neutral, success, warning, and error conditions.">
        <Stack spacing={2.5} sx={{ maxWidth: 760 }}>
          <Alert title="Info" severity="info">Token updates are now available in the shared package.</Alert>
          <Alert title="Success" severity="success">Visual checks passed for light and dark theme modes.</Alert>
          <Alert title="Warning" severity="warning">Review contrast for custom backgrounds before shipping.</Alert>
          <Alert title="Error" severity="error" dismissible>Unable to load remote schema for this preview session.</Alert>
        </Stack>
      </PageSection>
    </AppShell>
  ),
};
