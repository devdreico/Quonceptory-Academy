function reportStorageError(action: string, key: string, error: unknown) {
  console.warn(`Unable to ${action} local storage key "${key}".`, error);
}

export function readStorage(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch (error) {
    reportStorageError('read', key, error);
    return null;
  }
}

export function writeStorage(key: string, value: string): boolean {
  try {
    window.localStorage.setItem(key, value);
    return true;
  } catch (error) {
    reportStorageError('write', key, error);
    return false;
  }
}

export function removeStorage(key: string): boolean {
  try {
    window.localStorage.removeItem(key);
    return true;
  } catch (error) {
    reportStorageError('remove', key, error);
    return false;
  }
}

export function readJsonStorage<T>(key: string, fallback: T, isValid?: (value: unknown) => value is T): T {
  const raw = readStorage(key);
  if (raw === null) return fallback;

  try {
    const value: unknown = JSON.parse(raw);
    if (isValid && !isValid(value)) {
      console.warn(`Ignoring invalid local storage data for key "${key}".`);
      return fallback;
    }
    return value as T;
  } catch (error) {
    console.warn(`Ignoring malformed local storage data for key "${key}".`, error);
    return fallback;
  }
}
