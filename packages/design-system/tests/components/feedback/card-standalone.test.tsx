import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Card from '../../../src/components/feedback/Card/Card';

describe('feedback/Card standalone', () => {
  it('renders with default paper styling and children', () => {
    const { container } = render(<Card>Standalone card</Card>);

    expect(screen.getByText('Standalone card')).toBeTruthy();

    const card = container.firstElementChild as HTMLElement;
    expect(getComputedStyle(card).paddingTop).toBe('24px');
  });

  it('supports hoverLift transitions and alternate variants', () => {
    const { container, rerender } = render(
      <Card variant="glass" hoverLift>
        Hover card
      </Card>
    );

    const card = container.firstElementChild as HTMLElement;
    fireEvent.mouseEnter(card);
    expect(getComputedStyle(card).transform).not.toBe('none');

    fireEvent.mouseLeave(card);

    rerender(
      <Card variant="tile" padding="sm">
        Tile card
      </Card>
    );

    expect(screen.getByText('Tile card')).toBeTruthy();
    expect(getComputedStyle(container.firstElementChild as HTMLElement).paddingTop).toBe('16px');

    rerender(
      <Card variant="ink" padding="lg">
        Ink card
      </Card>
    );

    expect(screen.getByText('Ink card')).toBeTruthy();
    expect(getComputedStyle(container.firstElementChild as HTMLElement).paddingTop).toBe('32px');
  });
});
