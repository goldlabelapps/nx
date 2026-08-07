import fs from 'fs';
import path from 'path';

export function getMarkdownRootCandidates(): string[] {
    const cwd = process.cwd();

    return Array.from(new Set([
        path.resolve(cwd, 'public', 'nx', 'markdown'),
        path.resolve(cwd, '..', 'www', 'public', 'nx', 'markdown'),
    ]));
}

export function resolveMarkdownRoot(): string {
    return getMarkdownRootCandidates().find((candidate) => fs.existsSync(candidate)) ?? getMarkdownRootCandidates()[0];
}
