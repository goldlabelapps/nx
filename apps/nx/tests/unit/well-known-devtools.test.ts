jest.mock('next/server', () => ({
  NextResponse: {
    json: (body: unknown) => ({
      status: 200,
      json: async () => body,
    }),
  },
}));

import { GET } from '@/app/.well-known/appspecific/com.chrome.devtools.json/route';

describe('devtools well-known route', () => {
  it('returns a successful JSON response for Chrome DevTools probes', async () => {
    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({});
  });
});
