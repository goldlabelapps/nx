import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Heading from './Heading';

describe('heading component', () => {
  it('renders text and supports block output', () => {
    const { rerender } = render(<Heading>Editorial label</Heading>);
    expect(screen.getByText('Editorial label')).toBeTruthy();

    rerender(<Heading as="div">Block label</Heading>);
    expect(screen.getByText('Block label').tagName).toBe('DIV');
  });

  it('supports secondary tone alias', () => {
    render(<Heading tone="secondary">Secondary</Heading>);
    expect(screen.getByText('Secondary')).toBeTruthy();
  });
});