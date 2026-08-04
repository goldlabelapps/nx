import { fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import MenuDrawer from '../../../src/components/layout/MenuDrawer';

describe('menu drawer', () => {
  it('opens and closes the navigation drawer', async () => {
    render(
      <MenuDrawer
        actions={<button type="button">Action</button>}
        navItems={<div>Docs navigation</div>}
      />
    );

    const toggle = screen.getByRole('button', { name: 'Toggle navigation menu' });
    expect(toggle.getAttribute('aria-expanded')).toBe('false');

    fireEvent.click(toggle);

    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(await screen.findByRole('navigation', { name: 'Primary navigation' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Close navigation menu' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Action' })).toBeTruthy();
    expect(screen.getByText('Docs navigation')).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'Close navigation menu' }));

    await waitForElementToBeRemoved(() => screen.queryByRole('navigation', { name: 'Primary navigation' }));
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
  });
});