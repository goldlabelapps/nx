import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Logo from '../../../src/components/brand/Logo';

describe('brand components', () => {
  it('renders logo default and custom content', () => {
    const { rerender } = render(<Logo />);
    expect(screen.getByText('NX°')).toBeTruthy();

    rerender(<Logo>NX</Logo>);
    expect(screen.getByText('NX')).toBeTruthy();
  });
});