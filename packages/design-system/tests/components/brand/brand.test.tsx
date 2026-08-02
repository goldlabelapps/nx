import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Logo from '../../../src/components/brand/Logo';

describe('brand components', () => {
  it('renders logo default and custom content', () => {
    const { rerender } = render(<Logo />);
    expect(screen.getByText('NX°')).toBeTruthy();
    const favicon = document.querySelector('svg[aria-label="NX Favicon"]');
    expect(favicon).toBeTruthy();
    expect(favicon?.getAttribute('width')).toBe('36');
    expect(favicon?.getAttribute('height')).toBe('36');

    rerender(<Logo>NX</Logo>);
    expect(screen.getByText('NX')).toBeTruthy();

    rerender(<Logo favicon />);
    expect(screen.queryByText('NX°')).toBeNull();
    expect(screen.queryByText('NX')).toBeNull();
  });
});