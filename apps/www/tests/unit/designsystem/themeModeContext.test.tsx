import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';

const mockReadPersistedThemeModeFromStorage = jest.fn();
const mockSetPersistedThemeMode = jest.fn((mode: 'light' | 'dark') => ({ type: 'theme/setPersistedThemeMode', payload: mode }));
const mockStoreDispatch = jest.fn();
const mockStoreGetState = jest.fn(() => ({}));
const mockPersistorSubscribe = jest.fn(() => jest.fn());
const mockPersistorGetState = jest.fn(() => ({ bootstrapped: false }));
const mockSelectPersistedThemeMode = jest.fn(() => null);

jest.mock('@nx/design-system', () => ({
  DesignSystemProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('@nx/uberedux', () => ({
  readPersistedThemeModeFromStorage: () => mockReadPersistedThemeModeFromStorage(),
  selectPersistedThemeMode: (...args: unknown[]) => mockSelectPersistedThemeMode(...args),
  setPersistedThemeMode: (mode: 'light' | 'dark') => mockSetPersistedThemeMode(mode),
  themePreferencePersistor: {
    subscribe: (...args: unknown[]) => mockPersistorSubscribe(...args),
    getState: (...args: unknown[]) => mockPersistorGetState(...args),
  },
  themePreferenceStore: {
    dispatch: (...args: unknown[]) => mockStoreDispatch(...args),
    getState: (...args: unknown[]) => mockStoreGetState(...args),
  },
}));

import { ThemeModeProvider, resolveThemeMode, useThemeMode } from '@/app/NX/DesignSystem/ThemeModeContext';

function Probe() {
  const { mode } = useThemeMode();
  return <span data-testid="mode">{mode}</span>;
}

describe('ThemeModeContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockReadPersistedThemeModeFromStorage.mockReturnValue(null);
    mockSelectPersistedThemeMode.mockReturnValue(null);
  });

  it('resolveThemeMode handles explicit and fallback modes', () => {
    expect(resolveThemeMode('dark')).toBe('dark');
    expect(resolveThemeMode('light')).toBe('light');
    expect(resolveThemeMode('system')).toBe('light');
    expect(resolveThemeMode(undefined)).toBe('light');
  });

  it('throws when useThemeMode is called outside provider', () => {
    expect(() => render(<Probe />)).toThrow('useThemeMode must be used within a ThemeModeProvider');
  });

  it('applies persisted mode and dispatches persisted theme updates', async () => {
    mockReadPersistedThemeModeFromStorage.mockReturnValue('dark');

    render(
      <ThemeModeProvider initialMode="light">
        <Probe />
      </ThemeModeProvider>
    );

    expect(await screen.findByTestId('mode')).toHaveTextContent('dark');

    await waitFor(() => {
      expect(mockStoreDispatch).toHaveBeenCalled();
    });

    expect(mockSetPersistedThemeMode).toHaveBeenCalledWith('dark');
    expect(mockPersistorSubscribe).toHaveBeenCalledTimes(1);
  });

  it('resolves system mode using matchMedia when no persisted mode exists', async () => {
    const originalMatchMedia = window.matchMedia;
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      configurable: true,
      value: jest.fn().mockReturnValue({
        matches: true,
        media: '(prefers-color-scheme: dark)',
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }),
    });

    try {
      render(
        <ThemeModeProvider initialMode="system">
          <Probe />
        </ThemeModeProvider>
      );

      expect(await screen.findByTestId('mode')).toHaveTextContent('dark');
    } finally {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        configurable: true,
        value: originalMatchMedia,
      });
    }
  });
});
