import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Swatch from '../../../src/components/surfaces/Swatch/Swatch';
import SwatchGroup from '../../../src/components/surfaces/SwatchGroup/SwatchGroup';

describe('surface swatches', () => {
  it('renders a swatch and falls back to transparent when value is blank', () => {
    const { container, rerender } = render(<Swatch label="Primary" value="#123456" />);

    expect(screen.getByText('Primary')).toBeTruthy();
    expect(screen.getByText('#123456')).toBeTruthy();

    rerender(<Swatch label="Unset" value="   " />);
    expect(screen.getByText('Unset')).toBeTruthy();

    const valueCaption = container.querySelector('span') as HTMLElement;
    expect(valueCaption.textContent).toBe('   ');

    const colorBox = container.querySelector('[aria-hidden="true"]') as HTMLElement;
    expect(colorBox).toBeTruthy();
    expect(getComputedStyle(colorBox).backgroundColor).toMatch(/transparent|rgba\(0, 0, 0, 0\)/);
  });

  it('renders a swatch group from a list of items', () => {
    render(
      <SwatchGroup
        items={[
          { label: 'Primary', value: '#111111' },
          { label: 'Secondary', value: '#222222' },
        ]}
      />
    );

    expect(screen.getByText('Primary')).toBeTruthy();
    expect(screen.getByText('Secondary')).toBeTruthy();
  });
});
