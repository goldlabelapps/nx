import assert from 'node:assert/strict';
import test from 'node:test';
import { setFlash } from '../src/lib/actions/setFlash';

test('setFlash merges the flash slice into redux state', async () => {
  const dispatched: any[] = [];

  await setFlash('visible', true)(
    (action) => {
      dispatched.push(action);
      return action;
    },
    () => ({
      redux: {
        flash: {
          theme: 'dark',
        },
      },
    }),
  );

  assert.deepEqual(dispatched[0], {
    type: 'redux/setUbereduxKey',
    payload: {
      key: 'flash',
      value: {
        theme: 'dark',
        visible: true,
      },
    },
  });
});

test('setFlash records an error when state access fails', async () => {
  const dispatched: any[] = [];

  await setFlash('visible', true)(
    (action) => {
      dispatched.push(action);
      return action;
    },
    () => {
      throw new Error('boom');
    },
  );

  assert.deepEqual(dispatched[0], {
    type: 'redux/setUbereduxKey',
    payload: {
      key: 'error',
      value: 'boom',
    },
  });
});