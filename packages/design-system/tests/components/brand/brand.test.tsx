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

  it('renders a provided icon instead of the fallback svg', () => {
    const { container } = render(<Logo icon={<span data-testid="custom-icon">custom</span>} />);

    expect(screen.getByTestId('custom-icon')).toBeTruthy();
    expect(container.querySelector('svg[aria-label="NX Favicon"]')).toBeNull();
  });

  it('uses custom face and smile colors when provided', () => {
    const { container } = render(<Logo faceColor="#123456" smileColor="#abcdef" />);

    const favicon = container.querySelector('svg[aria-label="NX Favicon"]');
    const paths = favicon?.querySelectorAll('path');
    expect(paths[0]?.getAttribute('fill')).toBe('#123456');
    expect(paths[1]?.getAttribute('fill')).toBe('#abcdef');
  });
});