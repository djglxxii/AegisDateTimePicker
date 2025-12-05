/**
 * Date/Time utility functions for AegisDateTimePicker
 * All operations use local timezone
 */

/**
 * Pad a number with leading zeros
 * @param {number} n - Number to pad
 * @param {number} length - Target length
 * @returns {string}
 */
export function pad(n, length = 2) {
  return String(n).padStart(length, '0');
}

/**
 * Parse a canonical ISO-like datetime string (YYYY-MM-DDTHH:mm)
 * @param {string} str - ISO-like string
 * @returns {Date|null}
 */
export function parseCanonical(str) {
  if (!str) return null;
  const match = str.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/);
  if (!match) return null;
  const [, year, month, day, hour, minute] = match.map(Number);
  const date = new Date(year, month - 1, day, hour, minute, 0, 0);
  // Validate the date components match (handles overflow)
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }
  return date;
}

/**
 * Format a Date to canonical ISO-like string (YYYY-MM-DDTHH:mm)
 * @param {Date} date
 * @returns {string}
 */
export function toCanonical(date) {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) return '';
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hour = pad(date.getHours());
  const minute = pad(date.getMinutes());
  return `${year}-${month}-${day}T${hour}:${minute}`;
}

/**
 * Get date-only portion (YYYY-MM-DD)
 * @param {Date} date
 * @returns {string}
 */
export function toDateString(date) {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) return '';
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/**
 * Get time-only portion (HH:mm)
 * @param {Date} date
 * @returns {string}
 */
export function toTimeString(date) {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) return '';
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

/**
 * Format a Date according to a date format string
 * Supports: YYYY, MM, DD
 * @param {Date} date
 * @param {string} format
 * @returns {string}
 */
export function formatDate(date, format) {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) return '';
  return format
    .replace('YYYY', String(date.getFullYear()))
    .replace('MM', pad(date.getMonth() + 1))
    .replace('DD', pad(date.getDate()));
}

/**
 * Format a Date according to a time format string
 * Supports: HH (24h), hh (12h), mm, A (AM/PM)
 * @param {Date} date
 * @param {string} format
 * @returns {string}
 */
export function formatTime(date, format) {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) return '';
  const hours24 = date.getHours();
  const hours12 = hours24 % 12 || 12;
  const ampm = hours24 < 12 ? 'AM' : 'PM';
  return format
    .replace('HH', pad(hours24))
    .replace('hh', pad(hours12))
    .replace('mm', pad(date.getMinutes()))
    .replace('A', ampm);
}

/**
 * Parse a date string according to a format
 * @param {string} str - Input string
 * @param {string} format - Format like MM/DD/YYYY
 * @returns {{year: number, month: number, day: number}|null}
 */
export function parseDate(str, format) {
  if (!str || !format) return null;
  
  // Build a regex from the format
  let regex = format
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // Escape special chars first
    .replace('YYYY', '(\\d{4})')
    .replace('MM', '(\\d{1,2})')
    .replace('DD', '(\\d{1,2})');
  
  // Find positions of tokens in original format
  const tokens = [];
  let pos = 0;
  const tokenOrder = [];
  
  // Find each token's position
  const formatCopy = format;
  ['YYYY', 'MM', 'DD'].forEach(token => {
    const idx = formatCopy.indexOf(token);
    if (idx !== -1) {
      tokenOrder.push({ token, idx });
    }
  });
  
  // Sort by position
  tokenOrder.sort((a, b) => a.idx - b.idx);
  
  const match = str.match(new RegExp(`^${regex}$`));
  if (!match) return null;
  
  let year, month, day;
  tokenOrder.forEach((t, i) => {
    const val = parseInt(match[i + 1], 10);
    if (t.token === 'YYYY') year = val;
    else if (t.token === 'MM') month = val;
    else if (t.token === 'DD') day = val;
  });
  
  if (year === undefined || month === undefined || day === undefined) return null;
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  
  // Validate the date
  const testDate = new Date(year, month - 1, day);
  if (
    testDate.getFullYear() !== year ||
    testDate.getMonth() !== month - 1 ||
    testDate.getDate() !== day
  ) {
    return null;
  }
  
  return { year, month, day };
}

/**
 * Parse a time string according to a format
 * @param {string} str - Input string
 * @param {string} format - Format like HH:mm or hh:mm A
 * @returns {{hours: number, minutes: number}|null}
 */
export function parseTime(str, format) {
  if (!str || !format) return null;
  
  const is12h = format.includes('hh');
  const hasAmPm = format.includes('A');
  
  // Build regex
  let regex = format
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    .replace('HH', '(\\d{1,2})')
    .replace('hh', '(\\d{1,2})')
    .replace('mm', '(\\d{1,2})')
    .replace('A', '(AM|PM|am|pm)');
  
  const match = str.match(new RegExp(`^${regex}$`, 'i'));
  if (!match) return null;
  
  // Determine token order
  const tokenOrder = [];
  ['HH', 'hh', 'mm', 'A'].forEach(token => {
    const idx = format.indexOf(token);
    if (idx !== -1) {
      tokenOrder.push({ token, idx });
    }
  });
  tokenOrder.sort((a, b) => a.idx - b.idx);
  
  let hours = 0, minutes = 0, ampm = '';
  tokenOrder.forEach((t, i) => {
    const val = match[i + 1];
    if (t.token === 'HH' || t.token === 'hh') hours = parseInt(val, 10);
    else if (t.token === 'mm') minutes = parseInt(val, 10);
    else if (t.token === 'A') ampm = val.toUpperCase();
  });
  
  // Validate ranges
  if (is12h) {
    if (hours < 1 || hours > 12) return null;
  } else {
    if (hours < 0 || hours > 23) return null;
  }
  if (minutes < 0 || minutes > 59) return null;
  
  // Convert 12h to 24h
  if (is12h && hasAmPm) {
    if (ampm === 'AM') {
      if (hours === 12) hours = 0;
    } else if (ampm === 'PM') {
      if (hours !== 12) hours += 12;
    }
  }
  
  return { hours, minutes };
}

/**
 * Get today's date at midnight local time
 * @returns {Date}
 */
export function getToday() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
}

/**
 * Get yesterday's date at midnight local time
 * @returns {Date}
 */
export function getYesterday() {
  const today = getToday();
  today.setDate(today.getDate() - 1);
  return today;
}

/**
 * Get the date one month from today, clamped to valid day
 * @returns {Date}
 */
export function getNextMonth() {
  const today = getToday();
  const targetMonth = today.getMonth() + 1;
  const targetYear = today.getFullYear() + Math.floor(targetMonth / 12);
  const actualMonth = targetMonth % 12;
  
  // Get last day of target month
  const lastDay = new Date(targetYear, actualMonth + 1, 0).getDate();
  const day = Math.min(today.getDate(), lastDay);
  
  return new Date(targetYear, actualMonth, day, 0, 0, 0, 0);
}

/**
 * Get the date one year from today
 * @returns {Date}
 */
export function getNextYear() {
  const today = getToday();
  const targetYear = today.getFullYear() + 1;
  const targetMonth = today.getMonth();
  
  // Handle Feb 29 -> Feb 28 in non-leap year
  const lastDay = new Date(targetYear, targetMonth + 1, 0).getDate();
  const day = Math.min(today.getDate(), lastDay);
  
  return new Date(targetYear, targetMonth, day, 0, 0, 0, 0);
}

/**
 * Get number of days in a month
 * @param {number} year
 * @param {number} month - 0-indexed
 * @returns {number}
 */
export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * Get the day of week for first day of month (0 = Sunday)
 * @param {number} year
 * @param {number} month - 0-indexed
 * @returns {number}
 */
export function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

/**
 * Check if two dates are the same day
 * @param {Date} a
 * @param {Date} b
 * @returns {boolean}
 */
export function isSameDay(a, b) {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/**
 * Compare two dates (ignoring time)
 * @param {Date} a
 * @param {Date} b
 * @returns {number} -1 if a < b, 0 if equal, 1 if a > b
 */
export function compareDates(a, b) {
  const aDate = new Date(a.getFullYear(), a.getMonth(), a.getDate());
  const bDate = new Date(b.getFullYear(), b.getMonth(), b.getDate());
  if (aDate < bDate) return -1;
  if (aDate > bDate) return 1;
  return 0;
}

/**
 * Clone a Date object
 * @param {Date} date
 * @returns {Date}
 */
export function cloneDate(date) {
  return new Date(date.getTime());
}

/**
 * Set only the date portion of a Date, preserving time
 * @param {Date} target - Date to modify (cloned)
 * @param {Date} source - Date to get year/month/day from
 * @returns {Date}
 */
export function setDatePortion(target, source) {
  const result = cloneDate(target);
  result.setFullYear(source.getFullYear(), source.getMonth(), source.getDate());
  return result;
}

/**
 * Set only the time portion of a Date, preserving date
 * @param {Date} target - Date to modify (cloned)
 * @param {number} hours
 * @param {number} minutes
 * @returns {Date}
 */
export function setTimePortion(target, hours, minutes) {
  const result = cloneDate(target);
  result.setHours(hours, minutes, 0, 0);
  return result;
}

/**
 * Check if a date is within a range
 * @param {Date} date
 * @param {Date|null} min
 * @param {Date|null} max
 * @returns {boolean}
 */
export function isInRange(date, min, max) {
  if (!date) return false;
  if (min && date < min) return false;
  if (max && date > max) return false;
  return true;
}

/**
 * Month names for display
 */
export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

/**
 * Short weekday names
 */
export const WEEKDAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
