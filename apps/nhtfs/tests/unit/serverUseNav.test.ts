import { serverUseNav } from '@/app/NX/lib/serverHooks/serverUseNav';

describe('serverUseNav', () => {
  it('builds a navigation tree from nx tenant markdown', async () => {
    const originalTenant = process.env.NEXT_PUBLIC_TENANT;
    process.env.NEXT_PUBLIC_TENANT = 'nx';

    const nav = await serverUseNav();

    expect(nav.length).toBeGreaterThan(0);
    const homeItem = nav.find((item) => item.path === '/');
    expect(homeItem).toBeDefined();
    expect(homeItem?.title).toBe('Home');

    const booksItem = nav.find((item) => item.path === '/books');
    expect(booksItem).toBeDefined();
    expect(booksItem?.children?.some((child) => child.path === '/books')).toBe(false);

    expect(nav.some((item) => item.path === '/characters')).toBe(true);

    process.env.NEXT_PUBLIC_TENANT = originalTenant;
  });
});
