import { makeTime } from '@/app/api/lib/makeTime';

describe('api/makeTime', () => {
  it('returns a human-readable date string with day/month/year and seconds', () => {
    const text = makeTime(Date.now());
    expect(text).toMatch(/^[A-Z][a-z]{2}\s\d{1,2}(st|nd|rd|th)\s[A-Z][a-z]{2}\s\d{4},\s\d{1,2}:\d{2}(am|pm)\sand\s\d+s$/);
  });

  it('renders ordinal suffix for 1st/2nd/3rd correctly', () => {
    const d1 = new Date(2026, 0, 1, 10, 0, 1).getTime();
    const d2 = new Date(2026, 0, 2, 10, 0, 2).getTime();
    const d3 = new Date(2026, 0, 3, 10, 0, 3).getTime();

    expect(makeTime(d1)).toContain('1st');
    expect(makeTime(d2)).toContain('2nd');
    expect(makeTime(d3)).toContain('3rd');
  });

  it('uses th suffix for teen dates like 11th/12th/13th', () => {
    const d11 = new Date(2026, 0, 11, 10, 0, 1).getTime();
    const d12 = new Date(2026, 0, 12, 10, 0, 2).getTime();
    const d13 = new Date(2026, 0, 13, 10, 0, 3).getTime();

    expect(makeTime(d11)).toContain('11th');
    expect(makeTime(d12)).toContain('12th');
    expect(makeTime(d13)).toContain('13th');
  });

  it('formats midnight as 12:xxam and noon as 12:xxpm', () => {
    const midnight = new Date(2026, 0, 4, 0, 5, 1).getTime();
    const noon = new Date(2026, 0, 4, 12, 5, 1).getTime();

    expect(makeTime(midnight)).toContain(', 12:05am');
    expect(makeTime(noon)).toContain(', 12:05pm');
  });
});
