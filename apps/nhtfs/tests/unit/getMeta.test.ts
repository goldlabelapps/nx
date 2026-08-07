import { getMeta } from '@/app/NX/lib/getMeta';

describe('getMeta', () => {
  it('uses tenant config defaults when props are omitted', () => {
    const meta = getMeta({});

    expect(meta.title).toBeTruthy();
    expect(meta.description).toBeTruthy();
    expect(meta.openGraph.type).toBe('website');
    expect(Array.isArray(meta.openGraph.images)).toBe(true);
  });

  it('prefers provided props over tenant config defaults', () => {
    const meta = getMeta({
      title: 'Custom Title',
      description: 'Custom Description',
      image: '/nx/png/python.png',
      url: 'https://example.com/custom',
      siteName: 'Custom Site',
    });

    expect(meta.title).toBe('Custom Title');
    expect(meta.description).toBe('Custom Description');
    expect(meta.openGraph.siteName).toBe('Custom Site');
    expect(meta.openGraph.url).toBe('https://example.com/custom');
    expect(meta.twitter.images).toContain('/nx/png/python.png');
  });
});
