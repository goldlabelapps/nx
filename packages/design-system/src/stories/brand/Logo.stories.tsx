import type { Meta, StoryObj } from '@storybook/react';
import { AppShell, DesignSystemProvider, Logo, PageSection } from '../../index';

const meta: Meta<typeof Logo> = {
  title: 'Brand/Logo',
  component: Logo,
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Default: Story = {
  render: () => <Logo />,
};

export const Favicon: Story = {
  render: () => <Logo>NX</Logo>,
};

export const Darkmode: Story = {
  render: () => (
    <DesignSystemProvider mode="dark">
      <AppShell>
        <PageSection>
          <Logo />
        </PageSection>
      </AppShell>
    </DesignSystemProvider>
  ),
};
