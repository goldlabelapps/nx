import { getBaseurl, getEndpoints, makeRes, makeTime } from '@/app/api';
import { getBaseurl as getBaseurlLib } from '@/app/api/lib/getBaseurl';
import { getEndpoints as getEndpointsLib } from '@/app/api/lib/getEndpoints';
import { makeRes as makeResLib } from '@/app/api/lib/makeRes';
import { makeTime as makeTimeLib } from '@/app/api/lib/makeTime';

describe('api/index exports', () => {
  it('re-exports API helpers from their source modules', () => {
    expect(getBaseurl).toBe(getBaseurlLib);
    expect(getEndpoints).toBe(getEndpointsLib);
    expect(makeRes).toBe(makeResLib);
    expect(makeTime).toBe(makeTimeLib);
  });
});
