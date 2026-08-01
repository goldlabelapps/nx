import type { Preview } from '@storybook/react-vite';
import { DesignSystemProvider, type DesignSystemMode } from '../src';

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: ['README', 'Foundations', 'Forms', 'Site'],
      },
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
          <Story />
        </DesignSystemProvider>
      );
    },
  ],
};

export default preview;
