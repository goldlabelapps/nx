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

  it('returns deterministic fallback list when tags are missing or empty', () => {
    expect(serverUseRelated()).toHaveLength(2);
    expect(serverUseRelated([])).toHaveLength(2);
    expect(serverUseRelated(['', 'nx', ''])).toHaveLength(2);
  });
});
