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
  const { locale, tp, t } = useLocale();
  const [filter, setFilter] = useState<StatusFilter>('all');
  useMeta(t('proyectos.meta.title'), {
    canonical: `/${locale}/proyectos`,
  });
  const labels: Record<StatusFilter, string> = {
    all: t('proyectos.status.all'),
    shipped: t('proyectos.status.shipped'),
    active: t('proyectos.status.active'),
    lab: t('proyectos.status.lab'),
  };
  const list = useMemo(
    () => (filter === 'all' ? projects : projects.filter((project) => project.status === filter)),
    [filter],
  );

  return (
    <>
      <PageHeader
        index="03"
        kicker={t('proyectos.kicker')}
        title={t('proyectos.title')}
        desc={t('proyectos.desc')}
      />
      <section className="shell py-12 md:py-16">
        <div className="mb-8 flex flex-wrap gap-2">
          {(Object.keys(labels) as StatusFilter[]).map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setFilter(status)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold ${filter === status ? 'border-accent-500 bg-accent-500 text-on-accent' : 'border-line text-ink-soft hover:border-accent-500'}`}
            >
              {labels[status]}
            </button>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {list.map((project) => (
            <Card key={project.id} className="flex h-full flex-col p-6">
              <div className="flex items-center justify-between gap-3">
                <Badge variant={project.status === 'shipped' ? 'accent' : 'neutral'}>
                  {labels[project.status]}
                </Badge>
                <span className="text-muted text-xs">{project.year}</span>
              </div>
              <h2 className="mt-5 text-xl font-bold">{tp(project.title)}</h2>
              <p className="text-muted mt-3 flex-1 text-sm leading-relaxed">{tp(project.desc)}</p>
              <p className="text-muted mt-5 text-[11px] font-bold tracking-widest uppercase">
                {t('proyectos.outcome')}
              </p>
              <ul className="mt-2 space-y-2">
                {project.metrics.map((metric) => (
                  <li key={metric.es} className="flex gap-2 text-sm font-semibold">
                    <ArrowUpRight className="text-accent-500 mt-0.5 size-4 shrink-0" />
                    {tp(metric)}
                  </li>
                ))}
              </ul>
              <div className="border-line mt-5 flex flex-wrap gap-1.5 border-t pt-4">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="bg-surface-2 text-ink-soft rounded-full px-2.5 py-1 text-[11px]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
