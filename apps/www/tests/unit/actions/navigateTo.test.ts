jest.mock('@/app/NX/DesignSystem', () => ({
  __esModule: true,
  setDesignSystem:
    (key: string, value: unknown) =>
    (dispatch: (action: unknown) => void) => {
      dispatch({ type: 'mock/setDesignSystem', payload: { key, value } });
    },
}));

import { navigateTo } from '@/app/NX/DesignSystem/actions/navigateTo';

describe('actions/navigateTo', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/current?page=1#hash');
    jest.restoreAllMocks();
  });

  it('opens a new tab when target is _blank and does not push router', async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    const router = { push: jest.fn() } as any;
    const openSpy = jest.spyOn(window, 'open').mockImplementation(() => null);

    await navigateTo(router, '/shared', '_blank')(dispatch as any, getState as any);

    expect(openSpy).toHaveBeenCalledWith('/shared', '_blank');
    expect(router.push).not.toHaveBeenCalled();
  });

  it('does not navigate when URL matches current page (normalized trailing slash)', async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    const router = { push: jest.fn() } as any;

    await navigateTo(router, '/current?page=1#hash/')(dispatch as any, getState as any);

    expect(router.push).not.toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalled();
  });

  it('pushes router for normal internal navigation', async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    const router = { push: jest.fn() } as any;

    await navigateTo(router, '/help')(dispatch as any, getState as any);

    expect(router.push).toHaveBeenCalledWith('/help');
  });
});
