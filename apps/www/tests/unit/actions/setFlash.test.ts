import { setFlash } from '@/app/NX/Flash/lib/actions/setFlash';

describe('actions/setFlash', () => {
  it('merges flash state and dispatches setUbereduxKey action', async () => {
    const dispatch = jest.fn();
    const getState = () => ({
      redux: {
        flash: {
          sceneOpen: false,
          sceneName: 'intro',
        },
      },
    });

    await setFlash('sceneOpen', true)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'redux/setUbereduxKey',
        payload: {
          key: 'flash',
          value: {
            sceneOpen: true,
            sceneName: 'intro',
          },
        },
      }),
    );
  });

  it('dispatches error key when state accessor throws', async () => {
    const dispatch = jest.fn();
    const getState = () => {
      throw new Error('flash failed');
    };

    await setFlash('sceneOpen', true)(dispatch as any, getState as any);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'redux/setUbereduxKey',
        payload: {
          key: 'error',
          value: 'flash failed',
        },
      }),
    );
  });
});
