import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Logo from './Logo';
import ColorPalette from './ColorPalette';

describe('brand components', () => {
  it('renders logo default and custom content', () => {
    const { rerender } = render(<Logo />);
    expect(screen.getByText('NX°')).toBeTruthy();

    rerender(<Logo>NX</Logo>);
    expect(screen.getByText('NX')).toBeTruthy();
  });

  it('renders color palette sections and token labels', () => {
    render(<ColorPalette />);
    expect(screen.getByText('Theme colours')).toBeTruthy();
    expect(screen.getByText('Brand and secondary')).toBeTruthy();
    expect(screen.getAllByText('Primary').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Secondary').length).toBeGreaterThan(0);
  });
});