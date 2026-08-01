import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Alert, Card, Field } from '../../../src/components/feedback/Feedback';

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
    render(<Card variant="ink">Card content</Card>);
    expect(screen.getByText('Card content')).toBeTruthy();
  });

  it('renders field label, hint, and error', () => {
    const { rerender } = render(<Field label="Email" hint="Use work email" />);
    expect(screen.getByText('Email')).toBeTruthy();
    expect(screen.getByText('Use work email')).toBeTruthy();

    rerender(<Field label="Project" error="Required" />);
    expect(screen.getByText('Required')).toBeTruthy();
  });
});