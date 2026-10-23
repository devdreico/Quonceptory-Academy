import { ArrowDown, ArrowRight, ArrowUpRight, BrainCircuit, Code2, Database, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig } from '@/config/site';
import { Badge } from '@/components/ui/Badge';
import { LinkButton } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { PageHeader } from '@/components/layout/PageHeader';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/ui/Reveal';
import { useLocale } from '@/i18n';
import { events, posts, projects, stats, tracks } from '@/data';
import { formatDate, formatNumber } from '@/lib/utils';
import { useMeta } from '@/lib/useMeta';

const trackIcons = [BrainCircuit, Sparkles, Database, Code2];

export function HomePage() {
  const { locale, t, tp } = useLocale();
  useMeta(t('home.meta.title'), siteConfig.description[locale]);

  const upcoming = events
    .filter((event) => new Date(event.date).getTime() > Date.now())
    .sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
    .slice(0, 3);
  const featuredProjects = projects.filter((project) => project.featured).slice(0, 3);
  const featuredPosts = posts.filter((post) => post.featured).slice(0, 3);

  return (
    <>
      <section className="grid-bg relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute -top-40 left-1/2 size-[34rem] -translate-x-1/2 rounded-full bg-glow blur-3xl" aria-hidden="true" />
        <div className="shell relative grid min-h-[76vh] items-center gap-12 py-24 lg:grid-cols-[1.2fr_0.8fr] lg:py-32">
          <Reveal>
            <Badge variant="accent">{t('home.hero.kicker')}</Badge>
            <h1 className="mt-8 max-w-4xl text-5xl font-extrabold leading-[1.04] tracking-[-0.045em] text-balance sm:text-6xl lg:text-7xl">
              {t('home.hero.line1')} <span className="text-accent-500">{t('home.hero.line2')}</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-soft">{siteConfig.tagline[locale]}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <LinkButton to={`/${locale}/academia`} size="lg">
                {t('home.hero.ctaStart')} <ArrowRight className="size-4" aria-hidden="true" />
              </LinkButton>
              <LinkButton to={`/${locale}/herramientas`} variant="outline" size="lg">{t('home.hero.ctaTools')}</LinkButton>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
              {[t('home.hero.trust1'), t('home.hero.trust2'), t('home.hero.trust3')].map((item) => (
                <span key={item} className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-accent-500" />{item}</span>
              ))}
            </div>
          </Reveal>
          <Reveal className="relative mx-auto w-full max-w-md">
            <Card className="grain relative overflow-hidden p-7 sm:p-9">
              <div className="absolute -right-16 -bottom-20 size-56 rounded-full bg-glow-strong blur-3xl" aria-hidden="true" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-muted">{t('home.method.phasesLabel')}</span>
                  <Sparkles className="size-5 text-accent-500" aria-hidden="true" />
                </div>
                <div className="mt-8 space-y-4">
                  {[
                    { number: '01', title: locale === 'es' ? 'Delimitar el problema' : 'Define the problem' },
                    { number: '02', title: locale === 'es' ? 'Investigar con método' : 'Research methodically' },
                    { number: '03', title: locale === 'es' ? 'Construir la solución' : 'Build the solution' },
                    { number: '04', title: locale === 'es' ? 'Medir y escalar' : 'Measure and scale' },
                  ].map((phase, index) => (
                    <div key={phase.number} className="flex items-center gap-4 border-t border-line pt-4">
                      <span className="font-mono text-xs text-accent-500">{phase.number}</span>
                      <span className="font-semibold">{phase.title}</span>
                      {index === 3 ? <ArrowUpRight className="ml-auto size-4 text-muted" aria-hidden="true" /> : null}
                    </div>
                  ))}
                </div>
                <Link to={`/${locale}/academia`} className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-accent-500">
                  {t('home.hero.ctaMethod')} <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </Card>
          </Reveal>
        </div>
        <div className="shell flex items-center gap-2 pb-7 text-xs font-bold uppercase tracking-widest text-muted">
          <ArrowDown className="size-4" aria-hidden="true" /> {t('common.scroll')}
        </div>
      </section>

      <section className="shell py-14">
        <p className="mb-7 text-center text-xs font-bold uppercase tracking-[0.18em] text-muted">{t('home.stats.kicker')}</p>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.slice(0, 4).map((stat) => (
            <div key={stat.id} className="text-center">
              <p className="text-3xl font-extrabold tracking-tight md:text-4xl">{formatNumber(stat.value, locale)}{stat.suffix ?? ''}</p>
              <p className="mt-2 text-sm text-muted">{tp(stat.label)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-surface/50">
        <div className="shell py-20 md:py-28">
          <PageHeader kicker={t('home.method.phasesLabel')} title={t('home.method.title')} desc={t('home.method.desc')} className="border-0 bg-transparent p-0 pt-0 pb-10 md:pt-0" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tracks.slice(0, 4).map((track, index) => {
              const Icon = trackIcons[index];
              return (
                <Card key={track.id} className="p-5">
                  <Icon className="size-6 text-accent-500" aria-hidden="true" />
                  <p className="mt-5 text-xs font-bold uppercase tracking-widest text-muted">{String(index + 1).padStart(2, '0')} / 04</p>
                  <h3 className="mt-2 font-bold">{tp(track.title)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{tp(track.desc)}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="shell py-20 md:py-28">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div><p className="text-xs font-bold uppercase tracking-widest text-accent-500">{t('nav.academia')}</p><h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-5xl">{t('home.tracks.title')}</h2><p className="mt-4 max-w-2xl text-ink-soft">{t('home.tracks.desc')}</p></div>
          <LinkButton to={`/${locale}/academia`} variant="outline">{t('home.tracks.viewAll')} <ArrowRight className="size-4" /></LinkButton>
        </div>
        <StaggerContainer className="grid gap-4 md:grid-cols-2">
          {tracks.slice(0, 4).map((track) => (
            <StaggerItem key={track.id}>
              <Card className="h-full p-6 transition-colors hover:border-accent-500/50">
                <div className="flex items-start justify-between gap-4"><h3 className="text-xl font-bold">{tp(track.title)}</h3><Badge variant="outline">{locale === 'es' ? `Fase ${track.phase}` : `Phase ${track.phase}`}</Badge></div>
                <p className="mt-3 text-sm leading-relaxed text-muted">{tp(track.desc)}</p>
                <p className="mt-5 text-xs font-semibold text-accent-500">{t('home.tracks.hours', { count: track.hours })} · {t('home.tracks.topics', { count: track.topicsCount })}</p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      <section className="border-y border-line bg-surface/50">
        <div className="shell py-20 md:py-28">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
            <div><p className="text-xs font-bold uppercase tracking-widest text-accent-500">{t('home.projects.metrics')}</p><h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-5xl">{t('home.projects.title')}</h2><p className="mt-4 max-w-2xl text-ink-soft">{t('home.projects.desc')}</p></div>
            <LinkButton to={`/${locale}/proyectos`} variant="outline">{t('home.projects.viewAll')} <ArrowRight className="size-4" /></LinkButton>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <Card key={project.id} className="p-6">
                <Badge variant="accent">{t(`home.status.${project.status}`)}</Badge>
                <h3 className="mt-4 text-lg font-bold">{tp(project.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{tp(project.desc)}</p>
                <div className="mt-5 space-y-2">{project.metrics.slice(0, 2).map((metric) => <p key={metric.es} className="text-sm font-semibold text-accent-500">{tp(metric)}</p>)}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="shell py-20 md:py-28">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div><p className="text-xs font-bold uppercase tracking-widest text-accent-500">{t('home.events.title')}</p><h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-5xl">{t('home.events.desc')}</h2></div>
          <LinkButton to={`/${locale}/eventos`} variant="outline">{t('home.events.viewAll')} <ArrowRight className="size-4" /></LinkButton>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {upcoming.map((event) => <Card key={event.id} className="p-5"><p className="text-xs font-bold uppercase tracking-widest text-accent-500">{formatDate(event.date, locale)}</p><h3 className="mt-3 font-bold">{tp(event.title)}</h3><p className="mt-2 text-sm text-muted">{tp(event.location)}</p></Card>)}
          {upcoming.length === 0 ? <p className="text-muted">{locale === 'es' ? 'Estamos preparando los próximos eventos.' : 'We are preparing the next events.'}</p> : null}
        </div>
      </section>

      <section className="border-y border-line bg-surface/50">
        <div className="shell py-20 md:py-28">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
            <div><p className="text-xs font-bold uppercase tracking-widest text-accent-500">{t('nav.blog')}</p><h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-5xl">{t('home.blog.title')}</h2><p className="mt-4 max-w-2xl text-ink-soft">{t('home.blog.desc')}</p></div>
            <LinkButton to={`/${locale}/blog`} variant="outline">{t('home.blog.viewAll')} <ArrowRight className="size-4" /></LinkButton>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {featuredPosts.map((post) => <Link key={post.id} to={`/${locale}/blog/${post.slug}`} className="rounded-2xl border border-line bg-bg p-5 transition-colors hover:border-accent-500/50"><p className="text-xs font-bold uppercase tracking-widest text-accent-500">{post.category} · {post.readMinutes} {t('common.minutes')}</p><h3 className="mt-3 font-bold leading-snug">{tp(post.title)}</h3><p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{tp(post.excerpt)}</p><p className="mt-5 text-xs text-muted">{t('home.blog.by', { author: post.author })}</p></Link>)}
          </div>
        </div>
      </section>

      <section className="shell py-20 md:py-28">
        <Reveal className="grain relative overflow-hidden rounded-3xl border border-line bg-surface p-8 md:p-14">
          <div className="pointer-events-none absolute -right-24 -bottom-32 size-80 rounded-full bg-glow blur-3xl" aria-hidden="true" />
          <div className="relative max-w-3xl"><p className="text-xs font-bold uppercase tracking-widest text-accent-500">{t('home.final.kicker')}</p><h2 className="mt-4 text-4xl font-extrabold tracking-tight text-balance md:text-6xl">{t('home.final.title')}</h2><p className="mt-5 max-w-2xl text-ink-soft">{t('home.final.desc')}</p><div className="mt-8 flex flex-wrap gap-3"><LinkButton to={`/${locale}/contacto`} size="lg">{t('home.final.ctaPrimary')}</LinkButton><LinkButton to={`/${locale}/academia`} size="lg" variant="outline">{t('home.final.ctaSecondary')}</LinkButton></div><p className="mt-5 text-xs text-muted">{t('home.final.micro')}</p></div>
        </Reveal>
      </section>
    </>
  );
}
