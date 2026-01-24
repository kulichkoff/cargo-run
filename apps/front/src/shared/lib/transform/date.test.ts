import { dateToCalendar } from './date';
import { describe, it, expect } from 'vitest';

describe('dateToCalendar', () => {
  it('should convert a date to a calendar format', () => {
    const date = new Date('2026-01-24');
    expect(dateToCalendar(date)).toBe('24-01-2026');
  });

  it('should convert a date to a calendar format with leading zeros', () => {
    const date = new Date('2026-01-01');
    expect(dateToCalendar(date)).toBe('01-01-2026');
  });
});
