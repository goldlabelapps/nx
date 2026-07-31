import { setDesignSystem } from '@/app/NX/DesignSystem/actions/setDesignSystem';

describe('actions/setDesignSystem', () => {
  it('merges designSystem state and dispatches setUbereduxKey action', async () => {
    const dispatch = jest.fn();
    const getState = () => ({
      redux: {
        designSystem: {
          themeMode: 'light',
          themeSwitching: true,
        },
      },
    });

    await setDesignSystem('themeMode', 'dark')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'redux/setUbereduxKey',
        payload: {
          key: 'designSystem',
          value: {
            themeMode: 'dark',
            themeSwitching: true,
          },
        },
      }),
    );
  });

  it('dispatches error key when getState throws', async () => {
    const dispatch = jest.fn();
    const getState = () => {
      throw new Error('state failed');
    };

    await setDesignSystem('themeMode', 'dark')(dispatch, getState as unknown as () => any);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'redux/setUbereduxKey',
        payload: {
          key: 'error',
          value: 'state failed',
        },
      }),
    );
  });
});
