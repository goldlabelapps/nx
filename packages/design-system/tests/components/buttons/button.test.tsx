import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { describe, expect, it } from 'vitest';
import Button from '../../../src/components/buttons/Button/Button';
import IconButton from '../../../src/components/buttons/IconButton/IconButton';
import { createAppTheme } from '../../../src/styles/theme';

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

  it('uses the app theme color for the icon button', () => {
    render(
      <ThemeProvider theme={createAppTheme('light')}>
        <IconButton icon={<span>☰</span>} ariaLabel="Open navigation" />
      </ThemeProvider>
    );

    const button = screen.getByRole('button', { name: 'Open navigation' });
    expect(getComputedStyle(button).color).toBe('rgb(90, 90, 90)');
  });
});