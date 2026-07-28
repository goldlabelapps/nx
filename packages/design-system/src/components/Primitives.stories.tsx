import type { Meta, StoryObj } from '@storybook/react';
import { AppShell, PageSection, SectionTitle, Eyebrow, BrandMark } from './Primitives';

const meta: Meta<typeof AppShell> = {
  title: 'Design System/Primitives',
  component: AppShell,
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;
type Story = StoryObj<typeof AppShell>;

export const Overview: Story = {
  render: () => (
    <AppShell>
      <PageSection title="NX° Design System" subtitle="A calmer, token-first foundation for shared UI.">
        <div className="nx-surface" style={{ padding: '24px', display: 'grid', gap: '16px' }}>
          <BrandMark name="NX°" />
          <Eyebrow>Editorial foundations</Eyebrow>
          <SectionTitle title="Thoughtful defaults" subtitle="Built to carry the stronger theme language from the original system into the NX package." />
        </div>
      </PageSection>
    </AppShell>
  )
};
