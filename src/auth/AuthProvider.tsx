import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

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

function readUser(): DemoUser | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as DemoUser) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(() => readUser());

  useEffect(() => {
    if (user) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else window.localStorage.removeItem(STORAGE_KEY);
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
