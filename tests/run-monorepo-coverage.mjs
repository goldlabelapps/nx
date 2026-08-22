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

const run = (command, args) =>
  new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: 'inherit',
      shell: process.platform === 'win32',
      env: {
        ...process.env,
        FORCE_COLOR: supportsColor ? '1' : '0',
      },
    });

    child.on('error', (error) => reject(error));
    child.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`${command} ${args.join(' ')} exited with code ${code ?? 1}`));
        return;
      }
      resolve();
    });
  });

const repoRoot = process.cwd();
const coverageRoot = path.join(repoRoot, 'coverage');

function resetCoverageDir() {
  fs.rmSync(coverageRoot, { recursive: true, force: true });
  fs.mkdirSync(coverageRoot, { recursive: true });
}

function readSummary(summaryPath) {
  if (!fs.existsSync(summaryPath)) {
    return null;
  }

  return JSON.parse(fs.readFileSync(summaryPath, 'utf8'));
}

function mergeTotals(target, sourceTotal) {
  for (const key of ['lines', 'statements', 'functions', 'branches']) {
    target[key].total += sourceTotal[key]?.total ?? 0;
    target[key].covered += sourceTotal[key]?.covered ?? 0;
    target[key].skipped += sourceTotal[key]?.skipped ?? 0;
  }
}

function summarizeTotals(totals) {
  const result = {};
  for (const key of ['lines', 'statements', 'functions', 'branches']) {
    const total = totals[key].total;
    const covered = totals[key].covered;
    result[key] = {
      total,
      covered,
      skipped: totals[key].skipped,
      pct: total === 0 ? 100 : Number(((covered / total) * 100).toFixed(1)),
    };
  }
  return result;
}

function gatherLowCoverageFiles(summary, sourceName, threshold = 100) {
  const files = [];

  for (const [filePath, metrics] of Object.entries(summary)) {
    if (filePath === 'total') continue;

    const linePct = Number(metrics?.lines?.pct ?? 0);
    if (linePct < threshold) {
      files.push({
        source: sourceName,
        filePath,
        linesPct: linePct,
        branchesPct: Number(metrics?.branches?.pct ?? 0),
        functionsPct: Number(metrics?.functions?.pct ?? 0),
      });
    }
  }

  return files;
}

const runs = [
  {
    name: 'apps-www-jest',
    command: 'pnpm',
    args: [
      '--dir',
      'apps/www',
      'exec',
      'jest',
      '--runInBand',
      '--passWithNoTests',
      '--coverage',
      '--coverageReporters=json-summary',
      '--coverageReporters=text',
      '--coverageDirectory=../../coverage/apps-www-jest',
    ],
    summaryPath: path.join(coverageRoot, 'apps-www-jest', 'coverage-summary.json'),
  },
  {
    name: 'packages-design-system-vitest',
    command: 'pnpm',
    args: [
      '--dir',
      'packages/design-system',
      'exec',
      'vitest',
      'run',
      '--coverage',
      '--coverage.reporter=json-summary',
      '--coverage.reporter=text',
      '--coverage.reportsDirectory=../../coverage/packages-design-system-vitest',
    ],
    summaryPath: path.join(coverageRoot, 'packages-design-system-vitest', 'coverage-summary.json'),
  },
  {
    name: 'packages-firebase-node',
    command: 'pnpm',
    args: [
      'exec',
      'c8',
      '--reporter=json-summary',
      '--reporter=text',
      '--report-dir',
      'coverage/packages-firebase-node',
      'node',
      '--test',
      'packages/firebase/tests/**/*.test.js',
    ],
    summaryPath: path.join(coverageRoot, 'packages-firebase-node', 'coverage-summary.json'),
  },
  {
    name: 'packages-uberedux-tsx',
    command: 'pnpm',
    args: [
      'exec',
      'c8',
      '--reporter=json-summary',
      '--reporter=text',
      '--report-dir',
      'coverage/packages-uberedux-tsx',
      'tsx',
      '--test',
      'packages/uberedux/tests/**/*.test.ts',
    ],
    summaryPath: path.join(coverageRoot, 'packages-uberedux-tsx', 'coverage-summary.json'),
  },
  {
    name: 'packages-markdown-tsx',
    command: 'pnpm',
    args: [
      'exec',
      'c8',
      '--reporter=json-summary',
      '--reporter=text',
      '--report-dir',
      'coverage/packages-markdown-tsx',
      'tsx',
      '--test',
      'packages/markdown/tests/**/*.test.ts',
    ],
    summaryPath: path.join(coverageRoot, 'packages-markdown-tsx', 'coverage-summary.json'),
  },
  {
    name: 'apps-cms-node',
    command: 'pnpm',
    args: [
      'exec',
      'c8',
      '--reporter=json-summary',
      '--reporter=text',
      '--report-dir',
      'coverage/apps-cms-node',
      'node',
      '--test',
      'apps/cms/tests/**/*.test.mjs',
    ],
    summaryPath: path.join(coverageRoot, 'apps-cms-node', 'coverage-summary.json'),
  },
  {
    name: 'root-tests-node',
    command: 'pnpm',
    args: [
      'exec',
      'c8',
      '--reporter=json-summary',
      '--reporter=text',
      '--report-dir',
      'coverage/root-tests-node',
      'node',
      '--test',
      'tests/*.test.mjs',
    ],
    summaryPath: path.join(coverageRoot, 'root-tests-node', 'coverage-summary.json'),
  },
];

resetCoverageDir();

for (const runConfig of runs) {
  console.log(`\n${paint(color.bold, paint(color.cyan, `Running coverage: ${runConfig.name}`))}`);
  await run(runConfig.command, runConfig.args);
}

const aggregateTotals = {
  lines: { total: 0, covered: 0, skipped: 0 },
  statements: { total: 0, covered: 0, skipped: 0 },
  functions: { total: 0, covered: 0, skipped: 0 },
  branches: { total: 0, covered: 0, skipped: 0 },
};

const coverageSources = [];
let underCoveredFiles = [];

for (const runConfig of runs) {
  const summary = readSummary(runConfig.summaryPath);
  if (!summary?.total) continue;

  mergeTotals(aggregateTotals, summary.total);
  coverageSources.push({
    name: runConfig.name,
    summaryPath: runConfig.summaryPath,
    totals: summary.total,
  });

  underCoveredFiles = underCoveredFiles.concat(gatherLowCoverageFiles(summary, runConfig.name, 100));
}

underCoveredFiles.sort((a, b) => a.linesPct - b.linesPct || a.filePath.localeCompare(b.filePath));

const aggregate = summarizeTotals(aggregateTotals);
const aggregatePath = path.join(coverageRoot, 'coverage-aggregate.json');

fs.writeFileSync(
  aggregatePath,
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      totals: aggregate,
      sourceCount: coverageSources.length,
      sources: coverageSources,
      underCoveredFiles,
    },
    null,
    2,
  ),
);

const colorPct = (pct) => {
  if (pct >= 90) return paint(color.green, `${pct.toFixed(1)}%`);
  if (pct >= 70) return paint(color.yellow, `${pct.toFixed(1)}%`);
  return paint(color.red, `${pct.toFixed(1)}%`);
};

console.log(`\n${paint(color.bold, paint(color.cyan, '=== Monorepo Coverage Overview ==='))}`);
console.log(`${paint(color.blue, 'Sources merged:')} ${paint(color.bold, String(coverageSources.length))}`);
console.log(`${paint(color.blue, 'Lines:')} ${colorPct(aggregate.lines.pct)} (${aggregate.lines.covered}/${aggregate.lines.total})`);
console.log(`${paint(color.blue, 'Statements:')} ${colorPct(aggregate.statements.pct)} (${aggregate.statements.covered}/${aggregate.statements.total})`);
console.log(`${paint(color.blue, 'Functions:')} ${colorPct(aggregate.functions.pct)} (${aggregate.functions.covered}/${aggregate.functions.total})`);
console.log(`${paint(color.blue, 'Branches:')} ${colorPct(aggregate.branches.pct)} (${aggregate.branches.covered}/${aggregate.branches.total})`);
console.log(`${paint(color.blue, 'Files below 100% line coverage:')} ${paint(color.bold, String(underCoveredFiles.length))}`);

if (underCoveredFiles.length > 0) {
  console.log(`\n${paint(color.bold, paint(color.magenta, 'Lowest-covered files:'))}`);
  for (const file of underCoveredFiles.slice(0, 20)) {
    console.log(`- ${file.linesPct.toFixed(1)}% lines | ${file.filePath} (${file.source})`);
  }
}

console.log(`\n${paint(color.blue, 'Aggregate report:')} ${aggregatePath}`);
