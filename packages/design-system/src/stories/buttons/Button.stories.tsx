import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stack } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { AppShell, Button, PageSection } from '../../index';

const meta: Meta<typeof Button> = {
  title: 'Buttons/Button',
  component: Button,
  args: {
    children: 'Button label',
    tone: 'primary',
    variant: 'solid',
    size: 'md',
    disabled: false,
    fullWidth: false,
  },
  argTypes: {
    tone: { control: 'inline-radio', options: ['primary', 'neutral', 'danger'] },
    variant: { control: 'inline-radio', options: ['solid', 'outline', 'ghost', 'text'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    children: { control: 'text' },
    startIcon: { control: false },
    endIcon: { control: false },
    onClick: { action: 'clicked' },
    sx: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Playground: Story = {
  render: (args) => (
    <AppShell>
      <PageSection title="Button playground" subtitle="Adjust props to preview tone, variant, size, and layout behavior.">
        <div style={{ maxWidth: 420 }}>
          <Button {...args} />
        </div>
      </PageSection>
    </AppShell>
  ),
};

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