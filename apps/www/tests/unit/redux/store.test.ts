import { store, resetUberedux, setUbereduxKey } from '@/app/NX/Uberedux/store';

describe('redux/store setUbereduxKey + resetUberedux', () => {
  beforeEach(() => {
    store.dispatch(resetUberedux());
  });

  it('writes shallow keys under redux state', () => {
    store.dispatch(setUbereduxKey({ key: 'designSystem', value: { themeMode: 'light' } }));

    expect(store.getState().redux.designSystem.themeMode).toBe('light');
  });

  it('writes nested dotted paths and creates missing objects', () => {
    store.dispatch(setUbereduxKey({ key: 'designSystem.themeMode', value: 'dark' }));
    store.dispatch(setUbereduxKey({ key: 'flash.sceneOpen', value: true }));

    expect(store.getState().redux.designSystem.themeMode).toBe('dark');
    expect(store.getState().redux.flash.sceneOpen).toBe(true);
  });

  it('resets state back to empty object', () => {
    store.dispatch(setUbereduxKey({ key: 'error', value: 'boom' }));
    expect(store.getState().redux.error).toBe('boom');

    store.dispatch(resetUberedux());
    expect(store.getState().redux).toEqual({});
  });
});
