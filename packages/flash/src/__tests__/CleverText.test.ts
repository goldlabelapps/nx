import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import type { CleverTextProps, CleverTextOptions } from '../MovieClips/CleverText';

describe('CleverText & CleverTextShortcode type checks', () => {
  it('validates CleverTextProps and CleverTextOptions type signatures', () => {
    const options: CleverTextOptions = {
      id: 'test-clever-text',
      markdown: 'Hello world',
      speed: 25,
      cursor: '|',
      onFinish: () => {},
    };

    const props: CleverTextProps = {
      text: 'Hello world',
      options,
    };

    assert.strictEqual(props.text, 'Hello world');
    assert.strictEqual(props.options?.speed, 25);
  });
});
