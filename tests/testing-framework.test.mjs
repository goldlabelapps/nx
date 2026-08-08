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
    'apps/www/package.json',
    'apps/nhtfs/package.json',
    'packages/design-system/package.json',
    'packages/firebase/package.json',
    'packages/flash/package.json',
    'packages/shortcodes/package.json',
    'packages/uberedux/package.json',
    'packages/virus/package.json',
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

test('www and nhtfs jest scripts keep runInBand and passWithNoTests as separate flags', () => {
  const appPackageJsonPaths = ['apps/www/package.json', 'apps/nhtfs/package.json'];

  for (const packageJsonPath of appPackageJsonPaths) {
    const manifest = readJson(packageJsonPath);
    const testScript = manifest?.scripts?.test ?? '';

    assert.match(testScript, /\bjest\b/, `${packageJsonPath} should run jest`);
    assert.match(
      testScript,
      /--runInBand(\s|$)/,
      `${packageJsonPath} should include --runInBand`
    );
    assert.match(
      testScript,
      /--passWithNoTests(\s|$)/,
      `${packageJsonPath} should include --passWithNoTests`
    );
    assert.doesNotMatch(
      testScript,
      /--runInBand--passWithNoTests/,
      `${packageJsonPath} must keep jest flags separated by whitespace`
    );
  }
});

test('workspace package tests avoid app-local binary paths', () => {
  const workspacePackages = [
    'packages/flash/package.json',
    'packages/uberedux/package.json',
    'packages/virus/package.json',
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
