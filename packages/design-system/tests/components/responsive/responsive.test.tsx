import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@mui/material', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@mui/material')>();
  return {
    ...actual,
    useMediaQuery: vi.fn(),
  };
});

import { useMediaQuery } from '@mui/material';
import { DesktopOnly, MobileOnly } from '../../../src/components/responsive/Viewport';

const mockedUseMediaQuery = vi.mocked(useMediaQuery);

describe('responsive visibility helpers', () => {
  it('shows desktop content after hydration when viewport is desktop', async () => {
    mockedUseMediaQuery.mockReturnValue(false);

    render(
      <DesktopOnly fallback={<div>Fallback</div>}>
        <div>Desktop content</div>
      </DesktopOnly>
    );

    await waitFor(() => {
      expect(screen.getByText('Desktop content')).toBeTruthy();
    });
  });

  it('shows fallback in DesktopOnly when viewport is mobile', async () => {
    mockedUseMediaQuery.mockReturnValue(true);

    render(
      <DesktopOnly fallback={<div>Fallback</div>}>
        <div>Desktop content</div>
      </DesktopOnly>
    );

    await waitFor(() => {
      expect(screen.getByText('Fallback')).toBeTruthy();
    });
  });

  it('shows mobile content in MobileOnly when viewport is mobile', async () => {
    mockedUseMediaQuery.mockReturnValue(true);

    render(
      <MobileOnly fallback={<div>Desktop fallback</div>}>
        <div>Mobile content</div>
      </MobileOnly>
    );

    await waitFor(() => {
      expect(screen.getByText('Mobile content')).toBeTruthy();
    });
  });
});