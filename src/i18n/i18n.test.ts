import { describe, expect, it } from 'vitest';
import { detectLocale } from './index';
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
import type { LocaleNs } from './types';

const namespaces: Array<[string, LocaleNs]> = [
  ['common', commonNs],
  ['home', homeNs],
  ['ciencia', cienciaNs],
  ['academia', academiaNs],
  ['catalogo', catalogoNs],
  ['metodo', metodoNs],
  ['proyectos', proyectosNs],
  ['comunidad', comunidadNs],
  ['eventos', eventosNs],
  ['blog', blogNs],
  ['contacto', contactoNs],
  ['auth', authNs],
  ['app', appNs],
  ['notfound', notfoundNs],
];

describe('i18n dictionaries', () => {
  it('defines exactly the same keys in es and en', () => {
    for (const [name, ns] of namespaces) {
      const esKeys = Object.keys(ns.es).sort();
      const enKeys = Object.keys(ns.en).sort();
      expect(enKeys, `namespace "${name}" is missing en keys`).toEqual(esKeys);
    }
  });

  it('never lets a namespace shadow another namespace key', () => {
    const seen = new Map<string, string>();
    for (const [name, ns] of namespaces) {
      for (const key of Object.keys(ns.es)) {
        const owner = seen.get(key);
        if (owner && owner !== name) {
          throw new Error(`duplicate i18n key "${key}" defined in both "${owner}" and "${name}"`);
        }
        seen.set(key, name);
      }
    }
  });

  it('has no empty values', () => {
    for (const [name, ns] of namespaces) {
      for (const [key, value] of Object.entries(ns.es)) {
        expect(value.trim(), `${name}.${key} is empty`).not.toBe('');
      }
      for (const [key, value] of Object.entries(ns.en)) {
        expect(value.trim(), `${name}.${key} (en) is empty`).not.toBe('');
      }
    }
  });
});

describe('detectLocale', () => {
  it('prefers the locale in the current route over the saved preference', () => {
    window.localStorage.setItem('q-locale', 'en');
    window.history.replaceState({}, '', '/es/blog');

    expect(detectLocale()).toBe('es');

    window.history.replaceState({}, '', '/');
  });

  it('uses the saved preference when the route has no locale', () => {
    window.localStorage.setItem('q-locale', 'en');
    window.history.replaceState({}, '', '/');

    expect(detectLocale()).toBe('en');
  });
});
