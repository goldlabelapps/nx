import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { buildContentNavTreeFromMarkdownRoot } from '../src/server';

const writeFile = (filePath: string, content: string) => {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
};

test('buildContentNavTreeFromMarkdownRoot reads markdown metadata and child pages', () => {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'nx-content-test-'));

  try {
    writeFile(
      path.join(tempRoot, 'index.md'),
      [
        '---',
        'title: Home',
        'slug: /',
        'order: 1',
        '---',
        '',
        '# Home',
      ].join('\n'),
    );

    writeFile(
      path.join(tempRoot, 'features', 'index.md'),
      [
        '---',
        'title: Features',
        'slug: /features',
        'order: 2',
        '---',
      ].join('\n'),
    );

    writeFile(
      path.join(tempRoot, 'features', 'design-system.md'),
      [
        '---',
        'title: Design System',
        'slug: /features/design-system',
        'order: 1',
        '---',
      ].join('\n'),
    );

    const tree = buildContentNavTreeFromMarkdownRoot(tempRoot);

    assert.equal(tree[0]?.title, 'Home');
    assert.equal(tree[0]?.path, '/');
    assert.equal(tree[1]?.title, 'Features');
    assert.equal(tree[1]?.children?.[0]?.title, 'Design System');
    assert.equal(tree[1]?.children?.[0]?.path, '/features/design-system');
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
});
