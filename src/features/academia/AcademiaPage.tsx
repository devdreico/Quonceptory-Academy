import { ArrowRight, BookOpen, Clock3 } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { LinkButton } from '@/components/ui/Button';
import { PageHeader } from '@/components/layout/PageHeader';
import { useLocale } from '@/i18n';
import { programs, tracks } from '@/data';
import { useMeta } from '@/lib/useMeta';

export function AcademiaPage() {
  const { locale, tp } = useLocale();
  const en = locale === 'en';
  useMeta(en ? 'Academy — Quonceptory Academy' : 'Academia — Quonceptory Academy');

  return (
    <>
      <PageHeader index="01" kicker={en ? 'LEARN WITH A METHOD' : 'APRENDE CON MÉTODO'} title={en ? 'A curriculum built to solve real problems.' : 'Un plan de estudios diseñado para resolver problemas reales.'} desc={en ? 'Build foundations, choose a technical path and take a working solution to production. Learn by doing, with measurable outcomes.' : 'Construye una base, elige una ruta técnica y lleva una solución funcional a producción. Aprende haciendo, con resultados medibles.'}>
        <LinkButton to={`/${locale}/contacto`} size="lg">{en ? 'Talk to admissions' : 'Hablar con admisiones'} <ArrowRight className="size-4" /></LinkButton>
      </PageHeader>
      <section className="shell py-16 md:py-24">
        <div className="mb-8"><h2 className="text-3xl font-extrabold tracking-tight">{en ? 'Learning tracks' : 'Rutas de aprendizaje'}</h2><p className="mt-3 max-w-2xl text-ink-soft">{en ? 'Ten focused paths from AI fundamentals to applied research.' : 'Diez rutas especializadas, desde fundamentos de IA hasta investigación aplicada.'}</p></div>
        <div className="grid gap-4 md:grid-cols-2">
          {tracks.map((track) => <Card key={track.id} className="p-6"><div className="flex flex-wrap items-center justify-between gap-3"><Badge variant="accent">{en ? `Phase ${track.phase}` : `Fase ${track.phase}`}</Badge><span className="flex items-center gap-1.5 text-xs text-muted"><Clock3 className="size-3.5" />{track.hours} h · {track.topicsCount} {en ? 'topics' : 'temas'}</span></div><h3 className="mt-4 text-xl font-bold">{tp(track.title)}</h3><p className="mt-3 text-sm leading-relaxed text-muted">{tp(track.desc)}</p><div className="mt-5 flex flex-wrap gap-2">{programs.filter((program) => program.track === track.slug).slice(0, 2).map((program) => <span key={program.id} className="rounded-full border border-line px-3 py-1.5 text-xs text-ink-soft">{tp(program.title)}</span>)}</div></Card>)}
        </div>
      </section>
      <section className="border-y border-line bg-surface/50">
        <div className="shell py-16 md:py-24">
          <h2 className="text-3xl font-extrabold tracking-tight">{en ? 'Programs' : 'Programas'}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {programs.slice(0, 12).map((program) => <Card key={program.id} className="flex h-full flex-col p-5"><div className="flex items-center justify-between gap-2"><Badge variant={program.featured ? 'accent' : 'neutral'}>{program.level}</Badge><span className="text-xs text-muted">{tp(program.duration)}</span></div><h3 className="mt-4 text-lg font-bold">{tp(program.title)}</h3><p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{tp(program.desc)}</p><div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-xs text-muted"><span className="flex items-center gap-1.5"><BookOpen className="size-3.5" />{program.modules} {en ? 'modules' : 'módulos'}</span><strong className="text-ink">{tp(program.price)}</strong></div><LinkButton to={`/${locale}/contacto`} variant="outline" size="sm" className="mt-4 w-full">{en ? 'Request information' : 'Solicitar información'}</LinkButton></Card>)}
          </div>
        </div>
      </section>
    </>
  );
}
