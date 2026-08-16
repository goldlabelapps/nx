import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card, DesktopOnly, MobileOnly } from '../../../index';

const meta: Meta<typeof DesktopOnly> = {
  title: 'Responsive/Viewport',
  component: DesktopOnly,
  args: {
    maxWidth: 999,
  },
  argTypes: {
    maxWidth: { control: { type: 'number', min: 320, max: 1600, step: 1 } },
    children: { control: false },
    fallback: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof DesktopOnly>;

export const Default: Story = {
  render: (args) => (
    <div style={{ minWidth: 320, maxWidth: 520, display: 'grid', gap: 16 }}>
      <DesktopOnly
        maxWidth={args.maxWidth}
        fallback={
          <Card>
            <strong>Mobile fallback</strong>
            <p style={{ margin: '8px 0 0' }}>This content is shown when viewport width is 999px or below.</p>
          </Card>
        }
      >
        <Card>
          <strong>Desktop content</strong>
          <p style={{ margin: '8px 0 0' }}>This content is shown when viewport width is above 999px.</p>
        </Card>
      </DesktopOnly>

      <MobileOnly
        maxWidth={args.maxWidth}
        fallback={
          <Card>
            <strong>Desktop fallback</strong>
            <p style={{ margin: '8px 0 0' }}>This block appears when viewport width is above 999px.</p>
          </Card>
        }
      >
        <Card>
          <strong>Mobile content</strong>
          <p style={{ margin: '8px 0 0' }}>This block appears when viewport width is 999px or below.</p>
        </Card>
      </MobileOnly>
    </div>
  ),
};
