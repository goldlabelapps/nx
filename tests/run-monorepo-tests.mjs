import { spawnSync } from 'node:child_process';

const run = (command, args) => {
  const result = spawnSync(command, args, {
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
};

run('pnpm', ['--filter', './apps/*', '--filter', './packages/*', '-r', '--if-present', 'test']);
run('node', ['--test', './tests/*.test.mjs']);
