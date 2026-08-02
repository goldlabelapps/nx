import { describe, expect, it } from 'vitest';
import { createAppTheme } from '../src/styles/theme';

describe('createAppTheme', () => {
  it('creates a light theme by default', () => {
    const theme = createAppTheme();
    expect(theme.palette.mode).toBe('light');
    expect(theme.palette.primary.main).toBe('#5A5A5A');
  });

  it('creates a dark theme with expected palette values', () => {
    const theme = createAppTheme('dark');
    expect(theme.palette.mode).toBe('dark');
    expect(theme.palette.primary.main).toBe('#F3F3F3');
    expect(theme.palette.background.default).toBe('#111111');
  });

  it('uses supplied primary and secondary colors when provided', () => {
    const theme = createAppTheme('light', {
      primary: '#123456',
      secondary: '#abcdef',
    });

    expect(theme.palette.primary.main).toBe('#123456');
    expect(theme.palette.secondary.main).toBe('#abcdef');
  });
});