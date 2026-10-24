import { afterEach, describe, expect, it, vi } from 'vitest';
import { readJsonStorage, readStorage, removeStorage, writeStorage } from './storage';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('local storage helpers', () => {
  it('reads and writes values when storage is available', () => {
    expect(writeStorage('test-key', 'value')).toBe(true);
    expect(readStorage('test-key')).toBe('value');
    expect(removeStorage('test-key')).toBe(true);
    expect(readStorage('test-key')).toBeNull();
  });

  it('reports storage access failures and returns a safe result', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new DOMException('Storage is blocked');
    });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('Storage is blocked');
    });
    vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
      throw new DOMException('Storage is blocked');
    });
    const warning = vi.spyOn(console, 'warn').mockImplementation(() => {});

    expect(readStorage('test-key')).toBeNull();
    expect(writeStorage('test-key', 'value')).toBe(false);
    expect(removeStorage('test-key')).toBe(false);
    expect(warning).toHaveBeenCalledTimes(3);
  });

  it('uses the fallback for malformed or invalid persisted JSON', () => {
    window.localStorage.setItem('test-key', '{');
    const warning = vi.spyOn(console, 'warn').mockImplementation(() => {});
    expect(readJsonStorage('test-key', [])).toEqual([]);

    window.localStorage.setItem('test-key', '{"name":""}');
    expect(
      readJsonStorage<{ name: string }>(
        'test-key',
        { name: 'fallback' },
        (value): value is { name: string } => {
          return (
            typeof value === 'object' &&
            value !== null &&
            'name' in value &&
            typeof value.name === 'string' &&
            value.name.length > 0
          );
        },
      ),
    ).toEqual({ name: 'fallback' });
    expect(warning).toHaveBeenCalledTimes(2);
  });
});
