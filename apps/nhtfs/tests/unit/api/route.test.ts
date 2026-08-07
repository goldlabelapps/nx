jest.mock('next/server', () => ({
  NextResponse: {
    json: (body: unknown) => ({
      status: 200,
      json: async () => body,
    }),
  },
}));

import { GET } from '@/app/api/route';

describe('api/route GET', () => {
  it('returns JSON payload with welcome message and endpoint data', async () => {
    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.meta.message).toBe('Welcome to NXAPI');
    expect(body.meta.severity).toBe('success');
    expect(Array.isArray(body.data.endpoints)).toBe(true);
    expect(body.data.endpoints.length).toBeGreaterThan(0);
  });
});
