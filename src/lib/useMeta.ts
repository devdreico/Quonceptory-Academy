import { useEffect } from 'react';

export interface MetaOptions {
  description?: string;
  /** Ruta absoluta desde la raíz, p. ej. `/es/academia/fundamentos-ia`. */
  canonical?: string;
  /** `og:type`: website | article | course | event | profile. Por defecto `website`. */
  type?: string;
  image?: string;
  /** Marca la página como no indexable (login, panel, 404). */
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}

const SITE_URL = 'https://quonceptory.com';
const DEFAULT_IMAGE = `${SITE_URL}/logo.png`;
const JSON_LD_ID = 'q-jsonld';

function setMeta(selector: string, attr: string, key: string, content: string) {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = href;
}

function setJsonLd(data: MetaOptions['jsonLd']) {
  const existing = document.getElementById(JSON_LD_ID);
  if (existing) existing.remove();
  if (!data) return;
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = JSON_LD_ID;
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

export function useMeta(title: string, options?: string | MetaOptions) {
  const opts: MetaOptions = typeof options === 'string' ? { description: options } : (options ?? {});
  const { description, canonical, type = 'website', image = DEFAULT_IMAGE, noindex, jsonLd } = opts;
  const jsonLdKey = jsonLd ? JSON.stringify(jsonLd) : '';

  useEffect(() => {
    document.title = title;
    const url = canonical ? `${SITE_URL}${canonical}` : `${SITE_URL}${window.location.pathname}`;

    setMeta('meta[name="description"]', 'name', 'description', description ?? title);
    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description ?? title);
    setMeta('meta[property="og:type"]', 'property', 'og:type', type);
    setMeta('meta[property="og:url"]', 'property', 'og:url', url);
    setMeta('meta[property="og:image"]', 'property', 'og:image', image);
    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description ?? title);
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', image);
    setMeta('meta[name="robots"]', 'name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');
    setCanonical(url);
    setJsonLd(jsonLdKey ? (JSON.parse(jsonLdKey) as MetaOptions['jsonLd']) : undefined);

    return () => setJsonLd(undefined);
  }, [title, description, canonical, type, image, noindex, jsonLdKey]);
}
