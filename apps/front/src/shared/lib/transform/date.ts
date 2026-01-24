/**
 * Convert a date to a calendar format (DD-MM-YYYY)
 * @param date - The date to convert
 * @returns The calendar format of the date
 */
export function dateToCalendar(date: Date): string {
  return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
}
