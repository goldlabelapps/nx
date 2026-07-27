import * as React from 'react';
import { render, screen } from '@testing-library/react';

const initMock = jest.fn();
const destroyMock = jest.fn();

jest.mock('../../app/NX/DesignSystem', () => {
  const ReactLocal = require('react');
  return {
    __esModule: true,
    DesignSystem: ({ children }: { children: React.ReactNode }) =>
      ReactLocal.createElement('div', { 'data-testid': 'design-system' }, children),
    Icon: ({ icon }: { icon: string }) =>
      ReactLocal.createElement('span', { 'data-testid': `icon-${icon}` }),
  };
});

jest.mock('../../app/NX/Flash', () => {
  const ReactLocal = require('react');
  return {
    __esModule: true,
    Flash: ({ children, id }: { children: React.ReactNode; id: string }) =>
      ReactLocal.createElement('div', { 'data-testid': id }, children),
    MovieClip: ({ children, id }: { children: React.ReactNode; id: string }) =>
      ReactLocal.createElement('div', { 'data-testid': id }, children),
  };
});

jest.mock('../../public/shared/flash/NXLogo', () => {
  const ReactLocal = require('react');
  return {
    __esModule: true,
    NXLogo: ReactLocal.forwardRef(
      ({ svgSrc }: { svgSrc: string }, ref: React.Ref<HTMLImageElement>) =>
        ReactLocal.createElement('img', {
          ref,
          'data-testid': 'nx-logo',
          'data-svg-src': svgSrc,
          alt: 'NX Logo',
        }),
    ),
    NXLogoAS: jest.fn().mockImplementation(() => ({
      init: initMock,
      destroy: destroyMock,
    })),
  };
});

import { ShareVirus } from '@/public/shared/flash/ShareVirus';

describe('ShareVirus logic', () => {
  const originalTenant = process.env.NEXT_PUBLIC_TENANT;

  beforeEach(() => {
    initMock.mockClear();
    destroyMock.mockClear();
  });

  afterAll(() => {
    process.env.NEXT_PUBLIC_TENANT = originalTenant;
  });

  it('uses nx tenant logo by default', () => {
    process.env.NEXT_PUBLIC_TENANT = '';
    render(<ShareVirus />);

    expect(screen.getByTestId('nx-logo')).toHaveAttribute('data-svg-src', '/nx/svg/NXLogo.svg');
  });

  it('uses 404 logo variant when is404 is true', () => {
    render(<ShareVirus config={{ tenant: 'nx' }} is404 />);

    expect(screen.getByTestId('nx-logo')).toHaveAttribute('data-svg-src', '/nx/svg/NXLogo404.svg');
  });

  it('uses tenant-specific logo path when tenant is provided', () => {
    render(<ShareVirus config={{ tenant: 'nhtfs' }} />);

    expect(screen.getByTestId('nx-logo')).toHaveAttribute('data-svg-src', '/nhtfs/svg/NXLogo.svg');
  });

  it('does not initialize legacy animation lifecycle hooks', () => {
    const { unmount } = render(<ShareVirus config={{ tenant: 'nx' }} />);

    expect(initMock).not.toHaveBeenCalled();

    unmount();
    expect(destroyMock).not.toHaveBeenCalled();
  });
});
