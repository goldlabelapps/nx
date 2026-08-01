import type { Preview } from '@storybook/react-vite';
import { DesignSystemProvider, type DesignSystemMode } from '../src';

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    options: {
      
    },
  },
  globalTypes: {
    mode: {
      name: 'Mode',
      description: 'Global design system color mode',
      defaultValue: 'light',
      toolbar: {
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
      },
    },
  },
  decorators: [
    (Story, context) => {
      const mode = (context.globals.mode ?? 'light') as DesignSystemMode;
      return (
        <DesignSystemProvider mode={mode}>
          <div
            style={{
              width: '100%',
              minHeight: '100vh',
              padding: '25px',
              boxSizing: 'border-box',
            }}
          >
            <div
              style={{
                width: '100%',
                maxWidth: '1280px',
                margin: '0 auto',
              }}
            >
              <Story />
            </div>
          </div>
        </DesignSystemProvider>
      );
    },
  ],
};

export default preview;
