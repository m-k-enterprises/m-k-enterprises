import { ensureString } from './utils';

test('returns a string and warns when value is not a string', () => {
  const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  const result = ensureString(123 as unknown as string);
  expect(typeof result).toBe('string');
  expect(spy).toHaveBeenCalled();
  spy.mockRestore();
});

