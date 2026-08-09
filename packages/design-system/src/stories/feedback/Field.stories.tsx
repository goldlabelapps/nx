import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stack } from '@mui/material';
import { AppShell, Field, PageSection } from '../../index';

const meta: Meta<typeof Field> = {
  title: 'Feedback/Field',
  component: Field,
  args: {
    label: 'Email',
    hint: 'Use your work address',
    error: '',
  },
  argTypes: {
    label: { control: 'text' },
    hint: { control: 'text' },
    error: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Field>;

export const Playground: Story = {
  render: (args) => (
    <AppShell>
      <PageSection title="Field playground" subtitle="Edit label, hint, and error copy to validate form messaging.">
        <div style={{ maxWidth: 420 }}>
          <Field {...args} />
        </div>
      </PageSection>
    </AppShell>
  ),
};

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
