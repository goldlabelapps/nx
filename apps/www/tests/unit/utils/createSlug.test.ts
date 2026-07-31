import { createSlug } from '@/app/NX/lib/vanilla-js/createSlug';

describe('utils/createSlug', () => {
  it('normalizes text into URL-friendly slug', () => {
    expect(createSlug('  Hello, World!  ')).toBe('hello-world');
  });

  it('trims edge dashes while preserving underscores', () => {
    expect(createSlug('---NX___Framework---')).toBe('nx___framework');
  });
});
