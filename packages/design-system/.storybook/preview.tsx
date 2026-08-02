import type { Preview } from '@storybook/react-vite';
import { DesignSystemProvider, type DesignSystemMode } from '../src';

type UsageSnippetConfig = {
  importPath?: string;
  code?: string;
};

function getConfiguredUsageSnippet(componentName: string, usage?: UsageSnippetConfig) {
  if (usage?.code) {
    return usage.code;
  }

  const importPath = usage?.importPath ?? '@nx/design-system';

  return [
    `import { ${componentName} } from '${importPath}';`,
    '',
    `<${componentName} />`,
  ].join('\n');
}

function resolveComponentName(context: { component?: unknown; title?: string }) {
  const component = context.component as { name?: string } | undefined;

  if (component?.name) {
    return component.name;
  }

  const titleSegment = context.title?.split('/').pop() ?? 'Component';

  return titleSegment.replace(/[^a-zA-Z0-9]+/g, ' ').split(' ').filter(Boolean).map((part) => part[0].toUpperCase() + part.slice(1)).join('');
}

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
      const componentName = resolveComponentName(context);
      const usage = (context.parameters.usage ?? {}) as UsageSnippetConfig;
      const usageSnippet = getConfiguredUsageSnippet(componentName, usage);

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
              <div
                style={{
                  marginBottom: '16px',
                }}>
                
                <pre
                  style={{
                    margin: 0,
                    padding: '12px',
                    borderRadius: '3px',
                    overflowX: 'auto',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    lineHeight: 1.5,
                    backgroundColor: '#f0eee8',
                    border: '1px solid rgba(30, 28, 52, 0.14)',
                  }}
                >
                  <code>{usageSnippet}</code>
                </pre>
              </div>
              <Story />
            </div>
          </div>
        </DesignSystemProvider>
      );
    },
  ],
};

export default preview;
