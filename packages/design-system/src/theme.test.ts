import { describe, expect, it } from 'vitest';
import { createAppTheme } from './theme';

describe('createAppTheme', () => {
  it('creates a light theme by default', () => {
    const theme = createAppTheme();
    expect(theme.palette.mode).toBe('light');
    expect(theme.palette.primary.main).toBe('#4A46B8');
  });

  it('creates a dark theme with expected palette values', () => {
    const theme = createAppTheme('dark');
    expect(theme.palette.mode).toBe('dark');
    expect(theme.palette.primary.main).toBe('#E6E4FF');
    expect(theme.palette.background.default).toBe('#171622');
  });
});