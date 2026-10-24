import { ArrowRight, BookOpen, Clock3 } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { LinkButton } from '@/components/ui/Button';
import { PageHeader } from '@/components/layout/PageHeader';
import { useLocale } from '@/i18n';
import { programs, tracks } from '@/data';
import { useMeta } from '@/lib/useMeta';

export function AcademiaPage() {
  const { locale, t, tp } = useLocale();
  useMeta(t('academia.metaTitle'), {
    canonical: `/${locale}/academia`,
    type: 'course',
  });

  return (
    <>
      <PageHeader
        index="01"
        kicker={t('academia.kicker')}
        title={t('academia.title')}
        desc={t('academia.desc')}
      >
        <LinkButton to={`/${locale}/contacto`} size="lg">
          {t('academia.cta')} <ArrowRight className="size-4" />
        </LinkButton>
      </PageHeader>
      <section className="shell py-16 md:py-24">
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold tracking-tight">{t('academia.tracks.title')}</h2>
          <p className="text-ink-soft mt-3 max-w-2xl">{t('academia.tracks.desc')}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {tracks.map((track) => (
            <Card key={track.id} className="p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <Badge variant="accent">{t('academia.phase', { n: track.phase })}</Badge>
                <span className="text-muted flex items-center gap-1.5 text-xs">
                  <Clock3 className="size-3.5" />
                  {track.hours} h · {track.topicsCount} {t('academia.topics')}
                </span>
              </div>
              <h3 className="mt-4 text-xl font-bold">{tp(track.title)}</h3>
              <p className="text-muted mt-3 text-sm leading-relaxed">{tp(track.desc)}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {programs
                  .filter((program) => program.track === track.slug)
                  .slice(0, 2)
                  .map((program) => (
                    <span
                      key={program.id}
                      className="border-line text-ink-soft rounded-full border px-3 py-1.5 text-xs"
                    >
                      {tp(program.title)}
                    </span>
                  ))}
              </div>
            </Card>
          ))}
        </div>
      </section>
      <section className="border-line bg-surface/50 border-y">
        <div className="shell py-16 md:py-24">
          <h2 className="text-3xl font-extrabold tracking-tight">{t('academia.programs.title')}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {programs.slice(0, 12).map((program) => (
              <Card key={program.id} className="flex h-full flex-col p-5">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant={program.featured ? 'accent' : 'neutral'}>{program.level}</Badge>
                  <span className="text-muted text-xs">{tp(program.duration)}</span>
                </div>
                <h3 className="mt-4 text-lg font-bold">{tp(program.title)}</h3>
                <p className="text-muted mt-2 flex-1 text-sm leading-relaxed">{tp(program.desc)}</p>
                <div className="border-line text-muted mt-5 flex items-center justify-between border-t pt-4 text-xs">
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="size-3.5" />
                    {program.modules} {t('academia.modules')}
                  </span>
                  <strong className="text-ink">{tp(program.price)}</strong>
                </div>
                <LinkButton to={`/${locale}/contacto`} variant="outline" size="sm" className="mt-4 w-full">
                  {t('academia.requestInfo')}
                </LinkButton>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
