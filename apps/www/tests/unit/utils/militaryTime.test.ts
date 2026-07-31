import { militaryTime } from '@/app/NX/lib/vanilla-js/militaryTime';

describe('utils/militaryTime', () => {
  it('formats epoch into HH:mm string', () => {
    const result = militaryTime(0);
    expect(result).toMatch(/^\d{2}:\d{2}$/);
  });

  it('returns stable time string for a known date object value', () => {
    const epoch = new Date(2026, 1, 18, 11, 23, 45).getTime();
    const result = militaryTime(epoch);
    expect(result).toBe('11:23');
  });
});
