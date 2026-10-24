import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { readJsonStorage, removeStorage, writeStorage } from '@/lib/storage';

export interface DemoUser {
  name: string;
  email: string;
  joinedAt: string;
  track: string;
}

interface AuthContextValue {
  user: DemoUser | null;
  login: (input: { name: string; email: string; track?: string }) => void;
  logout: () => void;
}

const STORAGE_KEY = 'q-auth';

const AuthContext = createContext<AuthContextValue | null>(null);

function isDemoUser(value: unknown): value is DemoUser {
  if (typeof value !== 'object' || value === null) return false;
  const user = value as Record<string, unknown>;
  return (
    typeof user.name === 'string' &&
    user.name.trim().length > 0 &&
    typeof user.email === 'string' &&
    user.email.trim().length > 0 &&
    typeof user.joinedAt === 'string' &&
    typeof user.track === 'string'
  );
}

function readUser(): DemoUser | null {
  return readJsonStorage<DemoUser | null>(
    STORAGE_KEY,
    null,
    (value): value is DemoUser | null => value === null || isDemoUser(value),
  );
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(() => readUser());

  useEffect(() => {
    if (user) writeStorage(STORAGE_KEY, JSON.stringify(user));
    else removeStorage(STORAGE_KEY);
  }, [user]);

  const login = useCallback((input: { name: string; email: string; track?: string }) => {
    setUser({
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      joinedAt: new Date().toISOString(),
      track: input.track ?? 'fundamentos-ia',
    });
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
