import { resolveThemeMode } from '../../app/NX/DesignSystem/ThemeModeContext';

describe('resolveThemeMode', () => {
  const setMatchMedia = (matches: boolean) => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query: string) => ({
        matches: query.includes('dark') ? matches : false,
        media: query,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        addListener: jest.fn(),
        removeListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  };

  it('uses the browser preference when the configured mode is system', () => {
    setMatchMedia(true);
    expect(resolveThemeMode('system')).toBe('dark');
  });

  it('falls back to light when system preference is unavailable', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: undefined,
    });

    expect(resolveThemeMode('system')).toBe('light');
  });
});
