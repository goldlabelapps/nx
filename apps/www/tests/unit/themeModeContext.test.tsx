import { resolveThemeMode } from '../../app/NX/DesignSystem/ThemeModeContext';

describe('resolveThemeMode', () => {
  it('falls back to light when the configured mode is system', () => {
    expect(resolveThemeMode('system')).toBe('light');
  });

  it('falls back to light when system preference is unavailable', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: undefined,
    });

    expect(resolveThemeMode('system')).toBe('light');
  });
});
