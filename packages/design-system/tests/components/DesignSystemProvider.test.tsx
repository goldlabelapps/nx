import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import DesignSystemProvider from '../../src/components/DesignSystemProvider';

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
});