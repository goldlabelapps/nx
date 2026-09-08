import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { getActionScript, registerActionScript } from '../ActionScript/index';
import type { FlashProps, BuiltinMovie } from '../types';

describe('Flash package type safety & registry', () => {
  it('correctly resolves built-in action scripts', () => {
    assert.ok(getActionScript('pingpong'));
    assert.ok(getActionScript('logo'));
    assert.ok(getActionScript('loading'));
    assert.ok(getActionScript('sprite'));
    assert.ok(getActionScript('sprite-demo'));
    assert.strictEqual(getActionScript('nonexistent-movie'), undefined);
  });

  it('allows registering and retrieving custom ActionScripts', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dummyFactory = () => ({} as any);
    registerActionScript('custom-animation', dummyFactory);
    assert.strictEqual(getActionScript('custom-animation'), dummyFactory);
  });

  it('enforces strict FlashProps types', () => {
    const validProps: FlashProps = {
      movie: 'logo' as BuiltinMovie,
      width: 300,
      height: 200,
      color: '#000',
      loop: true,
      autoPlay: false,
      debug: true,
    };
    assert.strictEqual(validProps.movie, 'logo');

    const customMovieProps: FlashProps = {
      movie: 'my-custom-movie',
    };
    assert.strictEqual(customMovieProps.movie, 'my-custom-movie');
  });
});
