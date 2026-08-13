import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import DesignSystemProvider from '../../src/components/DesignSystemProvider/DesignSystemProvider';

describe('DesignSystemProvider', () => {
  it('renders children', () => {
    render(
      <DesignSystemProvider>
        <div>Child content</div>
      </DesignSystemProvider>
    );
    expect(screen.getByText('Child content')).toBeTruthy();
  });

  it('injects theme variable declarations', () => {
    render(
      <DesignSystemProvider mode="dark">
        <div>Dark mode</div>
      </DesignSystemProvider>
    );

    const headMarkup = document.head.innerHTML.toLowerCase();
    expect(headMarkup.includes('--nx-clay')).toBe(true);
    expect(headMarkup.includes('#f0f0f0')).toBe(true);
  });

  it('uses system dark mode by default when no mode prop is provided', () => {
    const originalMatchMedia = window.matchMedia;

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    try {
      render(
        <DesignSystemProvider>
          <div>System mode</div>
        </DesignSystemProvider>
      );

      const headMarkup = document.head.innerHTML.toLowerCase();
      expect(headMarkup.includes('#f0f0f0')).toBe(true);
    } finally {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: originalMatchMedia,
      });
    }
  });
});