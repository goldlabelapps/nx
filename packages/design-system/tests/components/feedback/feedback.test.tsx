import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Alert from '../../../src/components/feedback/Alert/Alert';
import Card from '../../../src/components/feedback/Card/Card';
import Field from '../../../src/components/feedback/Field/Field';

describe('feedback components', () => {
  it('renders alert variants with optional dismiss', () => {
    const { rerender } = render(
      <Alert title="Heads up" severity="info">
        Shared updates are available.
      </Alert>
    );
    expect(screen.getByText('Heads up')).toBeTruthy();
    expect(screen.queryByText('Dismiss')).toBeNull();

    rerender(
      <Alert title="Error" severity="error" dismissible>
        Something failed.
      </Alert>
    );
    expect(screen.getByText('Dismiss')).toBeTruthy();
  });

  it('renders card content', () => {
    const { container } = render(<Card variant="ink" padding="lg">Card content</Card>);

    expect(screen.getByText('Card content')).toBeTruthy();

    const card = container.firstElementChild as HTMLElement;
    expect(getComputedStyle(card).backgroundColor).toBe('rgb(156, 39, 176)');
    expect(getComputedStyle(card).paddingTop).toBe('32px');
  });

  it('renders field label, hint, and error', () => {
    const { rerender } = render(<Field label="Email" hint="Use work email" />);
    expect(screen.getByText('Email')).toBeTruthy();
    expect(screen.getByText('Use work email')).toBeTruthy();

    rerender(<Field label="Project" error="Required" />);
    expect(screen.getByText('Required')).toBeTruthy();
  });
});