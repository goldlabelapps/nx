import { makeRes } from '@/app/api/lib/makeRes';

describe('api/makeRes', () => {
  it('returns meta-only response when data is omitted', () => {
    const res = makeRes({ severity: 'success', message: 'ok' });

    expect(res.meta).toBeDefined();
    expect(res.meta.severity).toBe('success');
    expect(res.meta.message).toBe('ok');
    expect(res.meta.baseURL).toContain('/api');
    expect('data' in res).toBe(false);
  });

  it('returns meta + data + other when data is provided', () => {
    const payload = { hello: 'world' };
    const other = { traceId: 'abc' };

    const res = makeRes({ severity: 'info', message: 'payload', data: payload, other });

    expect(res.data).toEqual(payload);
    expect(res.other).toEqual(other);
    expect(res.meta.severity).toBe('info');
  });

  it('includes other key as undefined when data exists but other is omitted', () => {
    const res = makeRes({ severity: 'info', message: 'payload', data: { ok: true } });

    expect('data' in res).toBe(true);
    expect('other' in res).toBe(true);
    expect(res.other).toBeUndefined();
  });
});
