import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import test from 'node:test';

test('workspace roots exist', () => {
  assert.equal(existsSync('apps'), true);
  assert.equal(existsSync('packages'), true);
});
