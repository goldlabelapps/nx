import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const moduleDir = path.dirname(fileURLToPath(import.meta.url));

function getWorkspaceRoot(): string {
    const candidates = [
        process.cwd(),
        path.resolve(process.cwd(), 'apps', 'nhtfs'),
        path.resolve(moduleDir, '../../..'),
        path.resolve(moduleDir, '../../../..'),
    ];

    return candidates.find((candidate) => fs.existsSync(path.join(candidate, 'apps', 'nhtfs', 'public', 'nx', 'markdown'))) ?? candidates[0];
}

export function resolveNhtfsAppPath(...segments: string[]): string {
    const workspaceRoot = getWorkspaceRoot();
    const appRoot = path.join(workspaceRoot, 'apps', 'nhtfs');
    const candidates = [
        path.join(appRoot, ...segments),
        path.join(workspaceRoot, ...segments),
        path.join(workspaceRoot, 'apps', 'nhtfs', ...segments),
    ];

    return candidates.find((candidate) => fs.existsSync(candidate)) ?? candidates[0] ?? path.join(appRoot, ...segments);
}

export function getMarkdownRootCandidates(): string[] {
    return [
        resolveNhtfsAppPath('public', 'nx', 'markdown'),
        resolveNhtfsAppPath('apps', 'nhtfs', 'public', 'nx', 'markdown'),
    ];
}

export function resolveMarkdownRoot(): string {
    return getMarkdownRootCandidates().find((candidate) => fs.existsSync(candidate)) ?? getMarkdownRootCandidates()[0];
}
