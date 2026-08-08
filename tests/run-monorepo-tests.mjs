import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const supportsColor = Boolean(process.stdout.isTTY) && !('NO_COLOR' in process.env) && process.env.TERM !== 'dumb';

const color = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  cyan: '\x1b[36m',
  blue: '\x1b[34m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  magenta: '\x1b[35m',
};

const paint = (code, text) => (supportsColor ? `${code}${text}${color.reset}` : text);

const colorByPercent = (percentString) => {
  const value = Number(percentString);
  if (value >= 90) return color.green;
  if (value >= 70) return color.yellow;
  return color.red;
};

const run = (command, args) =>
  new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: ['inherit', 'pipe', 'pipe'],
      shell: process.platform === 'win32',
    });

    let stdout = '';
    let stderr = '';

    child.stdout?.on('data', (chunk) => {
      const text = chunk.toString();
      stdout += text;
      process.stdout.write(text);
    });

    child.stderr?.on('data', (chunk) => {
      const text = chunk.toString();
      stderr += text;
      process.stderr.write(text);
    });

    child.on('error', (error) => {
      reject(error);
    });

    child.on('close', (code) => {
      if (code !== 0) {
        const error = new Error(`${command} ${args.join(' ')} exited with code ${code ?? 1}`);
        error.exitCode = code ?? 1;
        reject(error);
        return;
      }

      resolve(`${stdout}\n${stderr}`);
    });
  });

const clearTerminal = () => {
  if (!process.stdout.isTTY) return;
  process.stdout.write('\x1b[2J\x1b[3J\x1b[H');
};

const stripAnsi = (text) => text.replace(/\u001b\[[0-9;]*m/g, '');

const sumMatches = (text, regex) => {
  let sum = 0;
  for (const match of text.matchAll(regex)) {
    sum += Number(match[1] ?? 0);
  }
  return sum;
};

const getWorkspacePackageJsons = (relativeDir) => {
  const dir = path.join(process.cwd(), relativeDir);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(relativeDir, entry.name, 'package.json'))
    .filter((pkgPath) => fs.existsSync(path.join(process.cwd(), pkgPath)));
};

const hasTestScript = (packageJsonPath) => {
  const manifest = JSON.parse(fs.readFileSync(path.join(process.cwd(), packageJsonPath), 'utf8'));
  const testScript = manifest?.scripts?.test;
  return typeof testScript === 'string' && testScript.trim() !== '';
};

const appPackageJsons = getWorkspacePackageJsons('apps');
const packagePackageJsons = getWorkspacePackageJsons('packages');
const workspacePackageJsons = [...appPackageJsons, ...packagePackageJsons];

const testedApps = appPackageJsons.filter(hasTestScript).length;
const testedPackages = packagePackageJsons.filter(hasTestScript).length;
const testedWorkspaces = workspacePackageJsons.filter(hasTestScript).length;

let recursiveOutput = '';
let rootOutput = '';

try {
  recursiveOutput = await run('pnpm', ['--filter', './apps/*', '--filter', './packages/*', '-r', '--if-present', 'test']);
  rootOutput = await run('node', ['--test', './tests/*.test.mjs']);
} catch (error) {
  const code = typeof error?.exitCode === 'number' ? error.exitCode : 1;
  process.exit(code);
}

const combinedOutput = stripAnsi(`${recursiveOutput}\n${rootOutput}`);
const formatNumber = (value) => new Intl.NumberFormat('en-GB').format(value);

const sumTwoMatches = (text, regex) => {
  let passed = 0;
  let total = 0;

  for (const match of text.matchAll(regex)) {
    passed += Number(match[1] ?? 0);
    total += Number(match[2] ?? 0);
  }

  return { passed, total };
};

const jest = sumTwoMatches(combinedOutput, /Tests:\s+(\d+)\s+passed,\s+(\d+)\s+total/g);
const vitest = sumTwoMatches(combinedOutput, /Tests\s+(\d+)\s+passed\s+\((\d+)\)/g);
const node = {
  passed: sumMatches(combinedOutput, /(?:ℹ|i)\s*pass\s+(\d+)/gi),
  total: sumMatches(combinedOutput, /(?:ℹ|i)\s*tests\s+(\d+)/gi),
};

const totalPassed = jest.passed + vitest.passed + node.passed;
const totalTests = jest.total + vitest.total + node.total;

const workspaceCoverage =
  workspacePackageJsons.length === 0
    ? '0.0'
    : ((testedWorkspaces / workspacePackageJsons.length) * 100).toFixed(1);
const appCoverage = appPackageJsons.length === 0 ? '0.0' : ((testedApps / appPackageJsons.length) * 100).toFixed(1);
const packageCoverage =
  packagePackageJsons.length === 0 ? '0.0' : ((testedPackages / packagePackageJsons.length) * 100).toFixed(1);

clearTerminal();

console.log(`\n${paint(color.bold, paint(color.cyan, '=== NX° test suite ==='))}`);
console.log('');
console.log(
  `${paint(color.blue, 'Total tests passed:')} ${paint(color.bold, paint(color.magenta, formatNumber(totalPassed)))}`
);
console.log(
  `${paint(color.blue, 'Total tests executed:')} ${paint(color.bold, formatNumber(totalTests))}`
);
console.log(
  `${paint(color.blue, 'By test type:')} ${paint(color.bold, 'Jest')} ${formatNumber(jest.passed)}/${formatNumber(jest.total)} | ${paint(color.bold, 'Vitest')} ${formatNumber(vitest.passed)}/${formatNumber(vitest.total)} | ${paint(color.bold, 'Node/TSX')} ${formatNumber(node.passed)}/${formatNumber(node.total)}`
);
console.log(
  `${paint(color.blue, 'Workspace coverage:')} ${paint(color.bold, `${testedWorkspaces}/${workspacePackageJsons.length}`)} workspaces with test scripts (${paint(colorByPercent(workspaceCoverage), `${workspaceCoverage}%`)})`
);
console.log(
  `${paint(color.blue, 'App coverage:')} ${paint(color.bold, `${testedApps}/${appPackageJsons.length}`)} (${paint(colorByPercent(appCoverage), `${appCoverage}%`)}) | ${paint(color.blue, 'Package coverage:')} ${paint(color.bold, `${testedPackages}/${packagePackageJsons.length}`)} (${paint(colorByPercent(packageCoverage), `${packageCoverage}%`)})`
);
console.log('');
console.log(paint(color.bold, paint(color.green, '✅ RESULT: full monorepo test suite passed.')));
console.log('');
