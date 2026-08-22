import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('admin app has expected runtime entrypoints', () => {
  assert.equal(existsSync(path.join(appRoot, 'app', 'layout.tsx')), true);
  assert.equal(existsSync(path.join(appRoot, 'next.config.ts')), true);
  assert.equal(existsSync(path.join(appRoot, 'public')), true);
});
