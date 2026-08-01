import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from '@mui/material';
import { AppShell, Field, PageSection } from '../../index';

const meta: Meta<typeof Field> = {
  title: 'Feedback/Field',
  component: Field,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Field>;

export const States: Story = {
  render: () => (
    <AppShell>
      <PageSection title="Field states" subtitle="Label, helper, and error examples for form controls.">
        <Stack spacing={2.5} sx={{ maxWidth: 420 }}>
          <Field label="Email" hint="Use your work address" />
          <Field label="Project" error="Choose a workspace" />
          <Field label="Invite code" hint="Optional" />
        </Stack>
      </PageSection>
    </AppShell>
  ),
};
