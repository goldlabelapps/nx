import fs from 'fs';
import path from 'path';
import { normalizeTenant } from './normalizeTenant';

export function getMarkdownRootCandidates(project?: string): string[] {
    const normalizedProject = normalizeTenant(project);
    const cwd = process.cwd();

    return Array.from(new Set([
        path.resolve(cwd, '..', 'www', 'public', normalizedProject, 'markdown'),
        path.resolve(cwd, 'public', normalizedProject, 'markdown'),
        path.resolve(cwd, '..', '..', 'apps', 'www', 'public', normalizedProject, 'markdown'),
    ]));
}

export function resolveMarkdownRoot(project?: string): string {
    return getMarkdownRootCandidates(project).find((candidate) => fs.existsSync(candidate)) ?? getMarkdownRootCandidates(project)[0];
}
