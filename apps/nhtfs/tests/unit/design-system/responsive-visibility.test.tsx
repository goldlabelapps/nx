import { render, screen } from '@testing-library/react';
import { DesktopOnly, MobileOnly } from '@nx/design-system';

type MatchMediaEntry = {
  query: string;
  matches: boolean;
};

function setupMatchMedia(entries: MatchMediaEntry[]) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => {
      const entry = entries.find((item) => item.query === query);
      const matches = Boolean(entry?.matches);
      return {
        matches,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      };
    },
  });
}

describe('design-system responsive visibility wrappers', () => {
  it('renders desktop content above mobile breakpoint', () => {
    setupMatchMedia([{ query: '(max-width:999px)', matches: false }]);

    render(
      <DesktopOnly>
        <div>Desktop Content</div>
      </DesktopOnly>,
    );

    expect(screen.getByText('Desktop Content')).toBeInTheDocument();
  });

  it('hides desktop content and renders mobile content at mobile breakpoint', () => {
    setupMatchMedia([{ query: '(max-width:999px)', matches: true }]);

    render(
      <>
        <DesktopOnly>
          <div>Desktop Content</div>
        </DesktopOnly>
        <MobileOnly>
          <div>Mobile Content</div>
        </MobileOnly>
      </>,
    );

    expect(screen.queryByText('Desktop Content')).not.toBeInTheDocument();
    expect(screen.getByText('Mobile Content')).toBeInTheDocument();
  });
});
