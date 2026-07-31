import { makeIdentity } from '@/app/NX/lib/vanilla-js/makeIdentity';

describe('utils/makeIdentity', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns the first identity when random is 0', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0);

    const identity = makeIdentity();

    expect(identity.name).toBe('Biker');
    expect(identity.avatar).toBe('/shared/svg/characters/biker.svg');
  });

  it('returns a valid identity shape for high random values', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.9999);

    const identity = makeIdentity();

    expect(identity.name).toBeTruthy();
    expect(identity.avatar.startsWith('/shared/svg/characters/')).toBe(true);
    expect(identity.avatar.endsWith('.svg')).toBe(true);
  });
});
