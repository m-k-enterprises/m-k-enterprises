/**
 * Ensure the given value is a string. Logs a warning when the value is not.
 *
 * @param value - Value that may or may not be a string.
 * @returns The value converted to string when necessary.
 */
export function ensureString(value: unknown): string {
  if (typeof value !== 'string') {
    // eslint-disable-next-line no-console
    console.warn('🪲 expected string URL but received:', value);
  }
  return typeof value === 'string' ? value : String(value);
}
