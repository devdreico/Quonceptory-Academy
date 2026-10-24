import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { BiString, Locale } from '@/data/types';
import { interpolate } from '@/lib/utils';
import { readStorage, writeStorage } from '@/lib/storage';

import { commonNs } from './namespaces/common';
import { homeNs } from './namespaces/home';
import { cienciaNs } from './namespaces/ciencia';
import { academiaNs } from './namespaces/academia';
import { catalogoNs } from './namespaces/catalogo';
import { metodoNs } from './namespaces/metodo';
import { proyectosNs } from './namespaces/proyectos';
import { comunidadNs } from './namespaces/comunidad';
import { eventosNs } from './namespaces/eventos';
import { blogNs } from './namespaces/blog';
import { contactoNs } from './namespaces/contacto';
import { authNs } from './namespaces/auth';
import { appNs } from './namespaces/app';
import { notfoundNs } from './namespaces/notfound';
import type { LocaleDict } from './types';

const LOCALES: Locale[] = ['es', 'en'];
const STORAGE_KEY = 'q-locale';

const dictionaries: Record<Locale, LocaleDict> = {
  es: Object.assign(
    {},
    commonNs.es,
    homeNs.es,
    cienciaNs.es,
    academiaNs.es,
    catalogoNs.es,
    metodoNs.es,
    proyectosNs.es,
    comunidadNs.es,
    eventosNs.es,
    blogNs.es,
    contactoNs.es,
    authNs.es,
    appNs.es,
    notfoundNs.es,
  ),
  en: Object.assign(
    {},
    commonNs.en,
    homeNs.en,
    cienciaNs.en,
    academiaNs.en,
    catalogoNs.en,
    metodoNs.en,
    proyectosNs.en,
    comunidadNs.en,
    eventosNs.en,
    blogNs.en,
    contactoNs.en,
    authNs.en,
    appNs.en,
    notfoundNs.en,
  ),
};

export function isLocale(value: string | null | undefined): value is Locale {
  return value === 'es' || value === 'en';
}

export function detectLocale(): Locale {
  if (typeof window === 'undefined') return 'es';
  const pathLocale = window.location.pathname.split('/')[1];
  if (isLocale(pathLocale)) return pathLocale;
  const stored = readStorage(STORAGE_KEY);
  if (isLocale(stored)) return stored;
  const nav = window.navigator.language.slice(0, 2).toLowerCase();
  return nav === 'en' ? 'en' : 'es';
}

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
  tp: (value: BiString) => string;
  otherLocalePath: (pathname: string) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
    writeStorage(STORAGE_KEY, locale);
  }, [locale]);

  const setLocale = useCallback((next: Locale) => setLocaleState(next), []);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      const template = dictionaries[locale][key] ?? dictionaries.es[key] ?? key;
      return interpolate(template, vars);
    },
    [locale],
  );

  const tp = useCallback((value: BiString) => value[locale], [locale]);

  const otherLocalePath = useCallback(
    (pathname: string) => {
      const other: Locale = locale === 'es' ? 'en' : 'es';
      const segments = pathname.split('/');
      if (isLocale(segments[1])) {
        segments[1] = other;
        return segments.join('/') || `/${other}`;
      }
      return `/${other}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
    },
    [locale],
  );

  const value = useMemo(
    () => ({ locale, setLocale, t, tp, otherLocalePath }),
    [locale, setLocale, t, tp, otherLocalePath],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider');
  return ctx;
}

export function useT() {
  return useLocale().t;
}

export function useTp() {
  return useLocale().tp;
}

export { LOCALES };
