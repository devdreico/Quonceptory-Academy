/**
 * Genera public/sitemap.xml a partir de los datos del sitio.
 * Se ejecuta antes de `vite build` (script `sitemap`), de modo que Vite
 * copia el resultado a dist/sitemap.xml.
 *
 * Ejecución con el soporte nativo de TypeScript de Node (>=22.18):
 *   node scripts/gen-sitemap.mts
 * Por eso los imports llevan extensión .ts y solo se importan módulos
 * cuyas dependencias son type-only (se eliminan en tiempo de ejecución).
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { posts } from '../src/data/posts.ts';
import { programs } from '../src/data/programs.ts';
import { tracks } from '../src/data/tracks.ts';
import { topics } from '../src/data/topics.ts';
import { projects } from '../src/data/projects.ts';
import { events } from '../src/data/events.ts';

const SITE_URL = 'https://quonceptory.com';
const LOCALES = ['es', 'en'] as const;

/**
 * Páginas con ruta propia. Se activan a `true` en cuanto que la ruta
 * existe en `src/app/router.tsx` (el sitemap nunca debe adelantar URLs 404).
 */
const PAGES = {
  programDetail: false, // /:locale/academia/:slug
  trackDetail: false, // /:locale/track/:slug
  topicDetail: false, // /:locale/tema/:slug
  projectDetail: false, // /:locale/proyectos/:slug
  eventDetail: false, // /:locale/eventos/:slug
  webinarRoom: false, // /:locale/eventos/:slug/sala
  support: false, // /:locale/apoya
} as const;

type Entry = { path: string; lastmod?: string; changefreq?: string; priority?: string };

const staticRoutes: Array<Omit<Entry, 'path'>> = [
  { changefreq: 'daily', priority: '1.0' },
  { changefreq: 'weekly', priority: '0.9' },
  { changefreq: 'weekly', priority: '0.8' },
  { changefreq: 'monthly', priority: '0.6' },
  { changefreq: 'weekly', priority: '0.7' },
  { changefreq: 'weekly', priority: '0.7' },
  { changefreq: 'weekly', priority: '0.7' },
  { changefreq: 'daily', priority: '0.9' },
  { changefreq: 'daily', priority: '0.8' },
  { changefreq: 'monthly', priority: '0.5' },
];

const staticPaths = [
  '',
  'ciencia',
  'academia',
  'metodo',
  'herramientas',
  'proyectos',
  'comunidad',
  'eventos',
  'blog',
  'contacto',
];

function xmlEscape(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildEntries(): Entry[] {
  const entries: Entry[] = [];

  staticPaths.forEach((path, index) => {
    const meta = staticRoutes[index] ?? {};
    for (const locale of LOCALES) {
      entries.push({ path: path ? `${locale}/${path}` : locale, ...meta });
    }
  });

  const today = new Date().toISOString().slice(0, 10);

  if (PAGES.programDetail) {
    for (const program of programs) {
      for (const locale of LOCALES) {
        entries.push({
          path: `${locale}/academia/${program.slug}`,
          lastmod: today,
          changefreq: 'weekly',
          priority: '0.8',
        });
      }
    }
  }

  if (PAGES.trackDetail) {
    for (const track of tracks) {
      for (const locale of LOCALES) {
        entries.push({
          path: `${locale}/track/${track.slug}`,
          lastmod: today,
          changefreq: 'weekly',
          priority: '0.7',
        });
      }
    }
  }

  if (PAGES.topicDetail) {
    for (const topic of topics) {
      for (const locale of LOCALES) {
        entries.push({
          path: `${locale}/tema/${topic.slug}`,
          lastmod: today,
          changefreq: 'monthly',
          priority: '0.5',
        });
      }
    }
  }

  for (const post of posts) {
    for (const locale of LOCALES) {
      entries.push({
        path: `${locale}/blog/${post.slug}`,
        lastmod: post.date,
        changefreq: 'yearly',
        priority: '0.6',
      });
    }
  }

  if (PAGES.projectDetail) {
    for (const project of projects) {
      for (const locale of LOCALES) {
        entries.push({
          path: `${locale}/proyectos/${project.slug}`,
          lastmod: `${project.year}-01-01`,
          changefreq: 'monthly',
          priority: '0.5',
        });
      }
    }
  }

  if (PAGES.eventDetail) {
    for (const event of events) {
      if (new Date(event.date).getTime() < Date.now()) continue;
      for (const locale of LOCALES) {
        entries.push({
          path: `${locale}/eventos/${event.slug}`,
          lastmod: today,
          changefreq: 'daily',
          priority: '0.7',
        });
      }
      if (PAGES.webinarRoom) {
        for (const locale of LOCALES) {
          entries.push({
            path: `${locale}/eventos/${event.slug}/sala`,
            lastmod: today,
            changefreq: 'daily',
            priority: '0.6',
          });
        }
      }
    }
  }

  if (PAGES.support) {
    for (const locale of LOCALES) {
      entries.push({ path: `${locale}/apoya`, changefreq: 'monthly', priority: '0.4' });
    }
  }

  return entries;
}

function toXml(entries: Entry[]): string {
  const urls = entries
    .map((entry) => {
      const loc = `${SITE_URL}/${entry.path}`;
      const lastmod = entry.lastmod ? `\n    <lastmod>${entry.lastmod}</lastmod>` : '';
      const changefreq = entry.changefreq ? `\n    <changefreq>${entry.changefreq}</changefreq>` : '';
      const priority = entry.priority ? `\n    <priority>${entry.priority}</priority>` : '';
      return `  <url>\n    <loc>${xmlEscape(loc)}</loc>${lastmod}${changefreq}${priority}\n  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

const here = dirname(fileURLToPath(import.meta.url));
const outFile = resolve(here, '../public/sitemap.xml');
const entries = buildEntries();
mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, toXml(entries), 'utf8');
console.log(`sitemap.xml: ${entries.length} URLs escritas en ${outFile}`);
