import { serverUseMDBySlug } from '@/app/NX/lib/serverHooks/serverUseMDBySlug';

describe('serverUseMDBySlug', () => {
  it('finds root markdown by empty slug array', () => {
    const filePath = serverUseMDBySlug([], 'nx');

    expect(filePath).toBeTruthy();
    expect(filePath?.endsWith('public/nx/markdown/index.md')).toBe(true);
  });

  it('finds nested markdown by slug segments', () => {
    const filePath = serverUseMDBySlug(['features', 'design-system'], 'nx');

    expect(filePath).toBeTruthy();
    expect(filePath?.endsWith('public/nx/markdown/features/design-system.md')).toBe(true);
  });
});
