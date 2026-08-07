import { serverUseRelated } from '@/app/NX/lib/serverHooks/serverUseRelated';

describe('server/serverUseRelated', () => {
  it('returns deterministic fallback related pages shape', () => {
    const related = serverUseRelated(['nx', 'help']);

    expect(Array.isArray(related)).toBe(true);
    expect(related.length).toBe(2);
    expect(related[0]).toEqual(
      expect.objectContaining({
        title: expect.any(String),
        slug: expect.any(String),
      }),
    );
  });
});
