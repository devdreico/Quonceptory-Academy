import { describe, expect, it } from 'vitest';
import { formatDate, formatNumber, interpolate, slugify } from './utils';

describe('interpolate', () => {
  it('replaces placeholders with provided values', () => {
    expect(interpolate('Hola {name}, llevas {days} días', { name: 'Ana', days: 3 })).toBe(
      'Hola Ana, llevas 3 días',
    );
  });

  it('keeps unknown placeholders untouched', () => {
    expect(interpolate('Hola {name}', {})).toBe('Hola {name}');
  });

  it('returns the template when no vars are given', () => {
    expect(interpolate('Sin variables')).toBe('Sin variables');
  });
});

describe('slugify', () => {
  it('lowercases and strips accents and symbols', () => {
    expect(slugify('¡Fundamentos de IA & Ética!')).toBe('fundamentos-de-ia-etica');
    expect(slugify('Deep Learning 101')).toBe('deep-learning-101');
  });

  it('never produces leading or trailing dashes', () => {
    expect(slugify('  --hola--mundo--  ')).toBe('hola-mundo');
  });
});

describe('formatNumber', () => {
  it('formats with the locale grouping separator', () => {
    expect(formatNumber(20000, 'en')).toBe('20,000');
    expect(formatNumber(20000, 'es')).toBe('20.000');
  });
});

describe('formatDate', () => {
  it('returns a readable date for both locales', () => {
    const iso = '2026-10-24';
    expect(formatDate(iso, 'en')).toMatch(/2026/);
    expect(formatDate(iso, 'es')).toMatch(/2026/);
  });
});
