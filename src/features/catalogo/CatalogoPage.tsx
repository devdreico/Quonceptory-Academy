import { useMemo, useState } from 'react';
import { ArrowUpRight, Search, SlidersHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Field';
import { PageHeader } from '@/components/layout/PageHeader';
import { allTools, toolCategories, toolLevelLabels, toolTypeLabels } from '@/data';
import { useLocale } from '@/i18n';
import { useMeta } from '@/lib/useMeta';

const PAGE_SIZE = 24;

export function CatalogoPage() {
  const { locale, tp, t } = useLocale();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [visible, setVisible] = useState(PAGE_SIZE);
  const en = locale === 'en';
  useMeta(en ? 'AI tools — Quonceptory Academy' : 'Herramientas de IA — Quonceptory Academy');
  const filtered = useMemo(() => {
    const term = query.trim().toLocaleLowerCase(locale);
    return allTools.filter((tool) => {
      const matchesCategory = category === 'all' || tool.category === category;
      const searchable = [tool.name, tp(tool.desc), ...tool.tags].join(' ').toLocaleLowerCase(locale);
      return matchesCategory && (!term || searchable.includes(term));
    });
  }, [category, locale, query, tp]);

  return (
    <>
      <PageHeader index="02" kicker={en ? 'TOOLS, NOT HYPE' : 'HERRAMIENTAS, NO HUMO'} title={en ? 'A practical map of the AI ecosystem.' : 'Un mapa práctico del ecosistema de IA.'} desc={en ? `${allTools.length} tools organized by category, pricing and experience level. Search and filter to find the right fit.` : `${allTools.length} herramientas organizadas por categoría, precio y nivel. Busca y filtra para encontrar la opción adecuada.`} />
      <section className="shell py-12 md:py-16">
        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto]">
          <label className="relative block"><span className="sr-only">{en ? 'Search tools' : 'Buscar herramientas'}</span><Search className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted" aria-hidden="true" /><Input value={query} onChange={(event) => { setQuery(event.target.value); setVisible(PAGE_SIZE); }} placeholder={en ? 'Search by name, use or tag…' : 'Buscar por nombre, uso o etiqueta…'} className="pl-11" /></label>
          <div className="flex items-center gap-2 text-sm text-muted"><SlidersHorizontal className="size-4" aria-hidden="true" /><span>{filtered.length} {t('common.results')}</span></div>
        </div>
        <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
          <button type="button" onClick={() => { setCategory('all'); setVisible(PAGE_SIZE); }} className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${category === 'all' ? 'border-accent-500 bg-accent-500 text-white' : 'border-line text-ink-soft hover:border-accent-500'}`}>{en ? 'All' : 'Todas'} <span className="ml-1 text-xs opacity-75">{allTools.length}</span></button>
          {toolCategories.map((item) => <button key={item.id} type="button" onClick={() => { setCategory(item.id); setVisible(PAGE_SIZE); }} className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${category === item.id ? 'border-accent-500 bg-accent-500 text-white' : 'border-line text-ink-soft hover:border-accent-500'}`}>{tp(item.label)} <span className="ml-1 text-xs opacity-75">{item.count}</span></button>)}
        </div>
        {filtered.length ? <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{filtered.slice(0, visible).map((tool) => <Card key={tool.id} className="flex h-full flex-col p-5"><div className="flex flex-wrap gap-2"><Badge variant="accent">{tp(toolCategories.find((item) => item.id === tool.category)?.label ?? { es: tool.category, en: tool.category })}</Badge>{tool.featured ? <Badge variant="neutral">{t('common.featured')}</Badge> : null}</div><h2 className="mt-4 text-lg font-bold">{tool.name}</h2><p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{tp(tool.desc)}</p><div className="mt-4 flex flex-wrap gap-1.5">{tool.tags.slice(0, 3).map((tag) => <span key={tag} className="rounded-full bg-surface-2 px-2.5 py-1 text-[11px] text-ink-soft">{tag}</span>)}</div><div className="mt-5 flex items-center justify-between border-t border-line pt-4"><div className="flex gap-2 text-xs text-muted"><span>{tp(toolTypeLabels[tool.type])}</span><span>·</span><span>{tp(toolLevelLabels[tool.level])}</span></div>{tool.url ? <a href={tool.url} target="_blank" rel="noreferrer" aria-label={`${en ? 'Open' : 'Abrir'} ${tool.name}`} className="text-accent-500 hover:text-accent-400"><ArrowUpRight className="size-4" /></a> : null}</div></Card>)}</div> : <div className="py-20 text-center"><p className="text-lg font-bold">{t('common.noResults')}</p><p className="mt-2 text-sm text-muted">{en ? 'Try another search or select a different category.' : 'Prueba otra búsqueda o selecciona otra categoría.'}</p></div>}
        {visible < filtered.length ? <div className="mt-10 text-center"><button type="button" className="rounded-full border border-line-strong px-6 py-3 text-sm font-semibold hover:border-accent-500" onClick={() => setVisible((count) => count + PAGE_SIZE)}>{t('common.loadMore')}</button></div> : null}
      </section>
    </>
  );
}
