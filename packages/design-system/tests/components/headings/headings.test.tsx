import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Heading from '../../../src/components/headings/Heading';

describe('heading component', () => {
  it('renders text and supports block and semantic heading output', () => {
    const { rerender } = render(<Heading>Editorial label</Heading>);
    expect(screen.getByText('Editorial label')).toBeTruthy();

    rerender(<Heading as="div">Block label</Heading>);
    expect(screen.getByText('Block label').tagName).toBe('DIV');

    rerender(<Heading as="h1">Page title</Heading>);
    expect(screen.getByText('Page title').tagName).toBe('H1');
  });

  it('supports secondary tone alias', () => {
    render(<Heading tone="secondary">Secondary</Heading>);
    expect(screen.getByText('Secondary')).toBeTruthy();
  });

  it('supports explicit heading variant without changing element type', () => {
    render(<Heading as="span" variant="h2">Display title</Heading>);
    expect(screen.getByText('Display title').tagName).toBe('SPAN');
  });
});