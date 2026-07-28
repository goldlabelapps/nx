import type { Meta, StoryObj } from '@storybook/react';
import { Alert, Card, Field } from './FormControls';

const meta: Meta<typeof Card> = {
  title: 'Design System/Form Controls',
  component: Card,
  parameters: {
    layout: 'centered'
  }
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Gallery: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '16px', minWidth: 320 }}>
      <Card variant="paper">
        <Alert title="Heads up" severity="info">
          Shared UI primitives are now available from the NX° design system package.
        </Alert>
      </Card>
      <Card variant="glass">
        <Field label="Email" hint="Use your work address" />
      </Card>
      <Card variant="tile">
        <Field label="Project" error="Choose a workspace" />
      </Card>
    </div>
  )
};
