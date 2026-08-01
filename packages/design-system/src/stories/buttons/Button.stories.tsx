import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { AppShell, Button, PageSection } from '../../index';

const meta: Meta<typeof Button> = {
  title: 'Buttons/Button',
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Set: Story = {
  render: () => (
    <AppShell>
      <PageSection title="Button set" subtitle="Primary actions, quieter secondary actions, and destructive affordances in three sizes.">
        <Stack spacing={3} sx={{ maxWidth: 760 }}>
          <Stack direction="row" spacing={1.5} useFlexGap flexWrap="wrap">
            <Button tone="primary" variant="solid">Publish changes</Button>
            <Button tone="neutral" variant="outline">Preview page</Button>
            <Button tone="danger" variant="ghost">Delete draft</Button>
            <Button tone="neutral" variant="text">Quiet text action</Button>
          </Stack>
          <Stack direction="row" spacing={1.5} useFlexGap flexWrap="wrap" sx={{ alignItems: 'center' }}>
            <Button size="sm">Small action</Button>
            <Button size="md" tone="neutral">Default action</Button>
            <Button size="lg" variant="outline">Large action</Button>
          </Stack>
          <Button fullWidth tone="neutral" variant="solid">Full-width confirm action</Button>
          <Stack direction="row" spacing={1.5} useFlexGap flexWrap="wrap">
            <Button variant="text" startIcon={<SaveOutlinedIcon />}>Save draft</Button>
            <Button variant="outline" endIcon={<SendOutlinedIcon />}>Send invite</Button>
            <Button tone="primary" endIcon={<ArrowForwardOutlinedIcon />}>Continue</Button>
          </Stack>
        </Stack>
      </PageSection>
    </AppShell>
  ),
};