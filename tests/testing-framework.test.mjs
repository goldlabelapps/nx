import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const repoRoot = process.cwd();

function readJson(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  return JSON.parse(readFileSync(absolutePath, 'utf8'));
}

test('critical workspaces define a test script', () => {
  const requiredTestWorkspaces = [
    'apps/nx/package.json',
    'packages/cli/package.json',
    'packages/saas/package.json',
    'packages/uberedux/package.json',
  ];

  for (const packageJsonPath of requiredTestWorkspaces) {
    const manifest = readJson(packageJsonPath);
    const testScript = manifest?.scripts?.test;
    assert.equal(
      typeof testScript,
      'string',
      `${packageJsonPath} must define scripts.test`
    );
    assert.notEqual(
      testScript.trim(),
      '',
      `${packageJsonPath} must define a non-empty scripts.test`
    );
  }
});

test('workspace package tests avoid app-local binary paths', () => {
  const workspacePackages = [
    'packages/uberedux/package.json',
  ];

  for (const packageJsonPath of workspacePackages) {
    const manifest = readJson(packageJsonPath);
    const testScript = manifest?.scripts?.test ?? '';

    assert.doesNotMatch(
      testScript,
      /apps\/www\/node_modules\/\.bin/,
      `${packageJsonPath} should not depend on app-local node_modules binaries`
    );
    assert.match(
      testScript,
      /\btsx\b/,
      `${packageJsonPath} should run tests through tsx`
    );
  }
});
