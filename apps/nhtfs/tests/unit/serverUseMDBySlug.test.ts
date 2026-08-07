import { serverUseMDBySlug } from '@/app/NX/lib/serverHooks/serverUseMDBySlug';

describe('serverUseMDBySlug', () => {
  it('finds root markdown by empty slug array', () => {
    const filePath = serverUseMDBySlug([], 'nx');

    expect(filePath).toBeTruthy();
    expect(filePath?.endsWith('public/nx/markdown/index.md')).toBe(true);
  });

  it('finds nested markdown by slug segments', () => {
    const filePath = serverUseMDBySlug(['books', 'spec-fic', 'neuromancer'], 'nx');

    expect(filePath).toBeTruthy();
    expect(filePath?.endsWith('public/nx/markdown/books/spec-fic/neuromancer.md')).toBe(true);
  });
});
