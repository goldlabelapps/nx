import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Button from '../../../src/components/buttons/Button';

describe('button primitive', () => {
  it('renders button text with default styles', () => {
    render(<Button>Save changes</Button>);

    expect(screen.getByRole('button', { name: 'Save changes' })).toBeTruthy();
  });

  it('supports disabled state and alternate variants', () => {
    render(
      <Button variant="outline" tone="danger" disabled>
        Delete project
      </Button>
    );

    expect((screen.getByRole('button', { name: 'Delete project' }) as HTMLButtonElement).disabled).toBe(true);
  });
});