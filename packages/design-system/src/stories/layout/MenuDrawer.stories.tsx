import type { Meta, StoryObj } from '@storybook/react';
import { Box, Typography } from '@mui/material';
import { MenuDrawer, SiteNav, type T_NavNode } from '../../index';

const sampleNav: T_NavNode[] = [
  { title: 'Home', slug: '/' },
  {
    title: 'Guides',
    slug: '/guides',
    children: [
      { title: 'Getting Started', slug: '/guides/getting-started' },
      { title: 'Components', slug: '/guides/components' },
    ],
  },
  { title: 'API', slug: '/api' },
];

const usageSnippet = [
  "import { MenuDrawer, SiteNav } from '@nx/design-system';",
  '',
  'const navItems = [',
  "  { title: 'Home', slug: '/' },",
  "  { title: 'API', slug: '/api' },",
  '];',
  '',
  '<MenuDrawer navItems={<SiteNav items={navItems} />} />',
].join('\n');

const meta: Meta<typeof MenuDrawer> = {
  title: 'Layout/Menu Drawer',
  component: MenuDrawer,
};

export default meta;
type Story = StoryObj<typeof MenuDrawer>;

export const Default: Story = {
  render: () => (
    <Box sx={{ display: 'grid', gap: 2 }}>
      <Box sx={{ border: '1px solid rgba(30, 28, 52, 0.14)', borderRadius: '3px', p: 1.5, bgcolor: '#f8f7f3' }}>
        <Typography variant="caption" sx={{ display: 'block', mb: 1, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'text.secondary' }}>
          Simplest usage
        </Typography>
        <Box
          component="pre"
          sx={{
            m: 0,
            p: 1.5,
            borderRadius: '3px',
            overflowX: 'auto',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            lineHeight: 1.5,
            bgcolor: '#f0eee8',
            border: '1px solid rgba(30, 28, 52, 0.14)',
          }}
        >
          <code>{usageSnippet}</code>
        </Box>
      </Box>
      <MenuDrawer navItems={<SiteNav items={sampleNav} />} />
    </Box>
  ),
};
