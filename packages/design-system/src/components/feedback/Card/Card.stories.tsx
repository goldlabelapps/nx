import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, Stack, Typography } from '@mui/material';
import { AppShell, Card, PageSection } from '../../../index';

function StoryFrame({ children }: { children: React.ReactNode }) {
  return <Box sx={{ p: 3.125 }}>{children}</Box>;
}

const meta: Meta<typeof Card> = {
  title: 'Feedback/Card',
  component: Card,
  args: {
    children: 'Default card content',
    variant: 'paper',
    padding: 'md',
    hoverLift: false,
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['paper', 'glass', 'tile', 'ink'] },
    padding: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    hoverLift: { control: 'boolean' },
    children: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

function Copy({ title, text }: { title: string; text: string }) {
  return (
    <Stack spacing={1}>
      <Typography variant="h6" sx={{ fontWeight: 400 }}>{title}</Typography>
      <Typography variant="body2" color="text.secondary">{text}</Typography>
    </Stack>
  );
}

export const Variants: Story = {
  render: () => (
    <StoryFrame>
      <AppShell>
        <PageSection title="Card variants" subtitle="Panel treatments for different emphasis levels.">
          <Stack spacing={2.5} sx={{ maxWidth: 760 }}>
            <Card variant="paper"><Copy title="Paper" text="Default container for content surfaces." /></Card>
            <Card variant="glass" hoverLift><Copy title="Glass" text="Translucent panel for elevated contextual layers." /></Card>
            <Card variant="tile"><Copy title="Tile" text="Compact utility surface for dense views." /></Card>
            <Card variant="ink"><Copy title="Ink" text="High-contrast inverse card for emphasis." /></Card>
          </Stack>
        </PageSection>
      </AppShell>
    </StoryFrame>
  ),
};

export const Playground: Story = {
  render: (args) => (
    <StoryFrame>
      <AppShell>
        <PageSection title="Card playground" subtitle="Tune variant, padding, and interaction state.">
          <div style={{ maxWidth: 540 }}>
            <Card {...args} />
          </div>
        </PageSection>
      </AppShell>
    </StoryFrame>
  ),
};
