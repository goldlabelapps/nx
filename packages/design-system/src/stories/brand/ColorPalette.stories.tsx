import type { Meta, StoryObj } from '@storybook/react';
import { AppShell, ColorPalette, PageSection } from '../../index';

const meta: Meta<typeof ColorPalette> = {
  title: 'Brand/Color Palette',
  id: 'design-system-color-palette',
  component: ColorPalette,
};

export default meta;
type Story = StoryObj<typeof ColorPalette>;

export const Overview: Story = {
  render: () => (
    <AppShell>
      <PageSection
        title="Theme colour reference"
        subtitle="Live token swatches for the active mode with copy-friendly values."
      >
        <ColorPalette />
      </PageSection>
    </AppShell>
  ),
};
