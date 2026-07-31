import { getTenant } from '@/app/NX/lib/getTenant';

describe('getTenant', () => {
  it('defaults to nx tenant when no tenant is provided', () => {
    const result = getTenant();

    expect(result.tenant).toBe('nx');
    expect(result.markdownDir.endsWith('/public/nx/markdown')).toBe(true);
    expect(result.config?.tenant).toBe('nx');
  });

  it('resolves nx tenant explicitly', () => {
    const result = getTenant('nx');

    expect(result.tenant).toBe('nx');
    expect(result.config?.siteName).toBeTruthy();
  });

  it('maps legacy free tenant to nx', () => {
    const result = getTenant('free');

    expect(result.tenant).toBe('nx');
    expect(result.markdownDir.endsWith('/public/nx/markdown')).toBe(true);
    expect(result.config?.tenant).toBe('nx');
  });
});
