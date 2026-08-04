import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import IconButton from '../../../src/components/buttons/IconButton';

describe('icon button primitive', () => {
  it('renders a disabled button with the expected size', () => {
    render(
      <IconButton
        icon={<span aria-hidden="true">+</span>}
        ariaLabel="Create item"
        disabled
        size="lg"
      />
    );

    const button = screen.getByRole('button', { name: 'Create item' }) as HTMLButtonElement;
    expect(button.disabled).toBe(true);
    expect(getComputedStyle(button).width).toBe('48px');
    expect(getComputedStyle(button).height).toBe('48px');
  });

  it('renders an anchor when href is provided', () => {
    render(
      <IconButton
        icon={<span aria-hidden="true">→</span>}
        ariaLabel="Open docs"
        href="/docs"
        variant="outline"
        tone="neutral"
      />
    );

    const link = screen.getByRole('link', { name: 'Open docs' });
    expect(link.getAttribute('href')).toBe('/docs');
  });
});