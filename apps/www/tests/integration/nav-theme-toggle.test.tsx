import * as React from 'react';
import { Provider } from 'react-redux';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { store, resetUberedux, setUbereduxKey } from '@/app/NX/Uberedux/store';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

jest.mock('../../app/NX/DesignSystem', () => {
  const ReactLocal = require('react');
  const { useSelector } = require('react-redux');
  const { setUbereduxKey: setKey } = require('../../app/NX/Uberedux/store');

  const iconTestIds: Record<string, string> = {
    menu: 'MenuIcon',
    darkmode: 'DarkModeOutlinedIcon',
    lightmode: 'LightModeOutlinedIcon',
    share: 'ShareIcon',
  };

  return {
    __esModule: true,
    Icon: ({ icon }: { icon: string }) =>
      ReactLocal.createElement('span', {
        'data-testid': iconTestIds[icon] || `${icon}-icon`,
      }),
    TreeNav: () => ReactLocal.createElement('div', { 'data-testid': 'tree-nav' }),
    useDesignSystem: () => useSelector((state: any) => state?.redux?.designSystem || {}),
    setDesignSystem:
      (key: string, value: unknown) =>
      (dispatch: any, getState: () => any) => {
        const current = getState()?.redux?.designSystem || {};
        dispatch(setKey({ key: 'designSystem', value: { ...current, [key]: value } }));
      },
    navigateTo: () => () => undefined,
  };
});

import Nav from '@/app/NX/DesignSystem/components/Nav';

describe('Nav mobile theme toggle', () => {
  beforeEach(() => {
    store.dispatch(resetUberedux());
    store.dispatch(
      setUbereduxKey({
        key: 'designSystem',
        value: {
          themeMode: 'light',
          themeSwitching: true,
        },
      }),
    );
  });

  it('switches from light mode to dark mode through drawer toggle', async () => {
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <Nav navItems={[]} mode="mobile" />
      </Provider>,
    );

    await user.click(screen.getByLabelText('Open Menu'));

    const darkIcon = await screen.findByTestId('DarkModeOutlinedIcon');
    const toggleButton = darkIcon.closest('button');
    expect(toggleButton).toBeTruthy();

    await user.click(toggleButton as HTMLButtonElement);

    await waitFor(() => {
      expect(store.getState().redux.designSystem.themeMode).toBe('dark');
    });
  });
});
