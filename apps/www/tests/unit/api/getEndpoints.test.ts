import { getEndpoints } from '@/app/api/lib/getEndpoints';

describe('api/getEndpoints', () => {
  it('returns endpoint collection with markdown endpoint metadata', () => {
    const result = getEndpoints() as { endpoints: Array<{ name: string; path: string; endpoints: Array<{ endpoint: string }> }> };

    expect(Array.isArray(result.endpoints)).toBe(true);
    expect(result.endpoints[0].name).toBe('Markdown');
    expect(result.endpoints[0].path).toContain('/api/markdown');
    expect(result.endpoints[0].endpoints[0].endpoint).toContain('/api/api/markdown?slug=%2Ffeatures');
  });

  it('returns a named endpoint when name matches exactly', () => {
    const markdown = getEndpoints('Markdown') as { name: string };
    expect(markdown.name).toBe('Markdown');
  });

  it('returns null when named endpoint does not exist', () => {
    const missing = getEndpoints('DoesNotExist');
    expect(missing).toBeNull();
  });

  it('is case-sensitive when resolving endpoint names', () => {
    const missing = getEndpoints('markdown');
    expect(missing).toBeNull();
  });

  it('returns endpoint metadata for named lookup', () => {
    const markdown = getEndpoints('Markdown') as {
      description: string;
      endpoints: Array<{ method: string; name: string }>;
    };

    expect(markdown.description).toContain('markdown');
    expect(markdown.endpoints[0].method).toBe('GET');
    expect(markdown.endpoints[0].name).toBe('Get Markdown by Slug');
  });
});
