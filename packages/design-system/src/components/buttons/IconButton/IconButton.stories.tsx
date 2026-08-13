import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stack } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { AppShell, IconButton, PageSection } from '../../../index';

const meta: Meta<typeof IconButton> = {
  title: 'Buttons/IconButton',
  component: IconButton,
  args: {
    ariaLabel: 'Search',
    tone: 'primary',
    variant: 'solid',
    size: 'md',
    disabled: false,
  },
  argTypes: {
    tone: { control: 'inline-radio', options: ['primary', 'neutral', 'danger'] },
    variant: { control: 'inline-radio', options: ['solid', 'outline', 'ghost', 'text'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    color: { control: 'select', options: ['inherit', 'default', 'primary', 'secondary', 'success', 'error', 'info', 'warning'] },
    disabled: { control: 'boolean' },
    ariaLabel: { control: 'text' },
    icon: { control: false },
    onClick: { action: 'clicked' },
    sx: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Playground: Story = {
  render: (args) => (
    <AppShell>
      <PageSection title="IconButton playground" subtitle="Adjust props for compact icon actions.">
        <IconButton {...args} icon={<SearchOutlinedIcon />} />
      </PageSection>
    </AppShell>
  ),
};

export const Set: Story = {
  render: () => (
    <AppShell>
      <PageSection title="IconButton set" subtitle="Compact icon-only actions for toolbars and utility controls.">
        <Stack spacing={3} sx={{ maxWidth: 760 }}>
          <Stack direction="row" spacing={1.5} useFlexGap flexWrap="wrap" sx={{ alignItems: 'center' }}>
            <IconButton ariaLabel="Search" icon={<SearchOutlinedIcon />} />
            <IconButton ariaLabel="Edit item" variant="outline" tone="neutral" icon={<EditOutlinedIcon />} />
            <IconButton ariaLabel="Settings" variant="text" tone="primary" icon={<SettingsOutlinedIcon />} />
            <IconButton ariaLabel="Delete item" variant="solid" tone="danger" icon={<DeleteOutlineIcon />} />
          </Stack>
          <Stack direction="row" spacing={1.5} useFlexGap flexWrap="wrap" sx={{ alignItems: 'center' }}>
            <IconButton ariaLabel="Small search" size="sm" variant="text" icon={<SearchOutlinedIcon />} />
            <IconButton ariaLabel="Medium search" size="md" variant="outline" icon={<SearchOutlinedIcon />} />
            <IconButton ariaLabel="Large search" size="lg" variant="solid" icon={<SearchOutlinedIcon />} />
          </Stack>
          <Stack direction="row" spacing={1.5} useFlexGap flexWrap="wrap" sx={{ alignItems: 'center' }}>
            <IconButton ariaLabel="Disabled edit" disabled variant="outline" icon={<EditOutlinedIcon />} />
            <IconButton ariaLabel="Disabled delete" disabled tone="danger" variant="solid" icon={<DeleteOutlineIcon />} />
          </Stack>
        </Stack>
      </PageSection>
    </AppShell>
  ),
};
