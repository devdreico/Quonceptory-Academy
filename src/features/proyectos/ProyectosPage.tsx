import { useMemo, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { PageHeader } from '@/components/layout/PageHeader';
import { projects } from '@/data';
import { useLocale } from '@/i18n';
import { useMeta } from '@/lib/useMeta';

type StatusFilter = 'all' | 'shipped' | 'active' | 'lab';

export function ProyectosPage() {
  const { locale, tp } = useLocale();
  const [filter, setFilter] = useState<StatusFilter>('all');
  const en = locale === 'en';
  useMeta(en ? 'Projects — Quonceptory Academy' : 'Proyectos — Quonceptory Academy');
  const labels: Record<StatusFilter, string> = { all: en ? 'All' : 'Todos', shipped: en ? 'In production' : 'En producción', active: en ? 'In progress' : 'En curso', lab: en ? 'Research lab' : 'Laboratorio' };
  const list = useMemo(() => filter === 'all' ? projects : projects.filter((project) => project.status === filter), [filter]);

  return (
    <>
      <PageHeader index="03" kicker={en ? 'WORK THAT SHIPS' : 'TRABAJO QUE LLEGA A PRODUCCIÓN'} title={en ? 'Applied AI, measured in outcomes.' : 'IA aplicada, medida en resultados.'} desc={en ? 'Real-world cases across healthcare, legal, finance, energy and more. Each project starts with a concrete problem and ends with a metric.' : 'Casos reales en salud, legal, finanzas, energía y más. Cada proyecto empieza con un problema concreto y termina con una métrica.'} />
      <section className="shell py-12 md:py-16">
        <div className="mb-8 flex flex-wrap gap-2">{(Object.keys(labels) as StatusFilter[]).map((status) => <button key={status} type="button" onClick={() => setFilter(status)} className={`rounded-full border px-4 py-2 text-sm font-semibold ${filter === status ? 'border-accent-500 bg-accent-500 text-on-accent' : 'border-line text-ink-soft hover:border-accent-500'}`}>{labels[status]}</button>)}</div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {list.map((project) => <Card key={project.id} className="flex h-full flex-col p-6"><div className="flex items-center justify-between gap-3"><Badge variant={project.status === 'shipped' ? 'accent' : 'neutral'}>{labels[project.status]}</Badge><span className="text-xs text-muted">{project.year}</span></div><h2 className="mt-5 text-xl font-bold">{tp(project.title)}</h2><p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{tp(project.desc)}</p><p className="mt-5 text-[11px] font-bold uppercase tracking-widest text-muted">{en ? 'Outcome' : 'Resultados'}</p><ul className="mt-2 space-y-2">{project.metrics.map((metric) => <li key={metric.es} className="flex gap-2 text-sm font-semibold"><ArrowUpRight className="mt-0.5 size-4 shrink-0 text-accent-500" />{tp(metric)}</li>)}</ul><div className="mt-5 flex flex-wrap gap-1.5 border-t border-line pt-4">{project.stack.map((item) => <span key={item} className="rounded-full bg-surface-2 px-2.5 py-1 text-[11px] text-ink-soft">{item}</span>)}</div></Card>)}
        </div>
      </section>
    </>
  );
}
