import { getBaseurl } from '@/app/api/lib/getBaseurl';

describe('api/getBaseurl', () => {
  it('returns localhost API base URL in development', () => {
    const originalEnv = process.env;
    process.env = { ...originalEnv, NODE_ENV: 'development' };

    expect(getBaseurl()).toBe('http://localhost:1999/api');

    process.env = originalEnv;
  });

  it('returns production API base URL outside development', () => {
    const originalEnv = process.env;
    process.env = { ...originalEnv, NODE_ENV: 'production' };

    expect(getBaseurl()).toBe('https://goldlabel.pro/api');

    process.env = originalEnv;
  });
});
