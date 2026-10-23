import { Fragment } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  Code2,
  Database,
  Sparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig } from '@/config/site';
import { Badge } from '@/components/ui/Badge';
import { LinkButton } from '@/components/ui/Button';
import { Card, SpotlightCard } from '@/components/ui/Card';
import { Counter } from '@/components/ui/Counter';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Marquee } from '@/components/ui/Marquee';
import { PageHeader } from '@/components/layout/PageHeader';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/ui/Reveal';
import { useLocale } from '@/i18n';
import { events, posts, projects, stats, toolCategories, allTools, tracks } from '@/data';
import { formatDate, formatNumber } from '@/lib/utils';
import { useMeta } from '@/lib/useMeta';
import { EASE_OUT_EXPO } from '@/lib/animations';

const trackIcons = [BrainCircuit, Sparkles, Database, Code2];

const heroWord = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
} as const;

export function HomePage() {
  const { locale, t, tp } = useLocale();
  const reduced = useReducedMotion();
  useMeta(t('home.meta.title'), siteConfig.description[locale]);

  const upcoming = events
    .filter((event) => new Date(event.date).getTime() > Date.now())
    .sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
    .slice(0, 3);
  const featuredProjects = projects.filter((project) => project.featured).slice(0, 3);
  const featuredPosts = posts.filter((post) => post.featured).slice(0, 3);

  const line1Words = t('home.hero.line1').split(' ');

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="grid-bg absolute inset-0" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -top-40 left-1/2 size-[38rem] -translate-x-1/2 rounded-full bg-glow blur-3xl animate-float-slow"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute top-1/3 -right-32 size-72 rounded-full bg-glow blur-3xl animate-float"
          aria-hidden="true"
        />
        <div className="shell relative grid min-h-[78vh] items-center gap-14 py-24 lg:grid-cols-[1.15fr_0.85fr] lg:py-32">
          <div>
            <Reveal>
              <span className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-xs font-semibold text-ink-soft">
                <span className="size-1.5 rounded-full bg-accent-500 animate-pulse-dot" aria-hidden="true" />
                {t('home.hero.kicker')}
              </span>
            </Reveal>
            <motion.h1
              className="mt-8 max-w-4xl text-5xl font-extrabold leading-[1.04] tracking-[-0.045em] text-balance sm:text-6xl lg:text-7xl"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } } }}
            >
              {line1Words.map((word, index) => (
                <motion.span
                  key={`${word}-${index}`}
                  className="inline-block"
                  variants={reduced ? undefined : heroWord}
                  style={reduced ? { opacity: 1 } : undefined}
                >
                  {word}
                  {index < line1Words.length - 1 ? ' ' : ''}
                </motion.span>
              ))}{' '}
              <span className="bg-gradient-to-r from-ink via-ink to-muted bg-clip-text text-transparent">
                {t('home.hero.line2')}
              </span>
            </motion.h1>
            <Reveal delay={0.35}>
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-soft">
                {siteConfig.tagline[locale]}
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <MagneticButton>
                  <LinkButton to={`/${locale}/academia`} size="lg">
                    {t('home.hero.ctaStart')} <ArrowRight className="size-4" aria-hidden="true" />
                  </LinkButton>
                </MagneticButton>
                <LinkButton to={`/${locale}/herramientas`} variant="outline" size="lg">
                  {t('home.hero.ctaTools')}
                </LinkButton>
              </div>
              <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
                {[t('home.hero.trust1'), t('home.hero.trust2'), t('home.hero.trust3')].map((item) => (
                  <span key={item} className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-accent-500 animate-pulse-dot" aria-hidden="true" />
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal className="relative mx-auto w-full max-w-md" delay={0.2}>
            <SpotlightCard className="grain p-7 sm:p-9">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
                  {t('home.method.phasesLabel')}
                </span>
                <Sparkles className="size-5 text-accent-500" aria-hidden="true" />
              </div>
              <StaggerContainer className="mt-8 space-y-4" staggerChildren={0.1}>
                {[
                  { number: '01', title: locale === 'es' ? 'Delimitar el problema' : 'Define the problem' },
                  { number: '02', title: locale === 'es' ? 'Investigar con método' : 'Research methodically' },
                  { number: '03', title: locale === 'es' ? 'Construir la solución' : 'Build the solution' },
                  { number: '04', title: locale === 'es' ? 'Medir y escalar' : 'Measure and scale' },
                ].map((phase, index) => (
                  <StaggerItem key={phase.number}>
                    <div className="group flex items-center gap-4 rounded-2xl border border-line/70 bg-glass-bg px-4 py-3 backdrop-blur-md transition-all duration-300 hover:border-line-strong hover:bg-glass-strong">
                      <span className="font-mono text-xs text-accent-500">{phase.number}</span>
                      <span className="text-sm font-semibold">{phase.title}</span>
                      {index === 3 ? (
                        <ArrowUpRight
                          className="ml-auto size-4 text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          aria-hidden="true"
                        />
                      ) : null}
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
              <Link
                to={`/${locale}/academia`}
                className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-accent-500 transition-transform duration-300 hover:translate-x-0.5"
              >
                {t('home.hero.ctaMethod')} <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </SpotlightCard>
          </Reveal>
        </div>
        <div className="shell relative flex items-center gap-2 pb-7 text-xs font-bold uppercase tracking-widest text-muted">
          <ArrowDown className="size-4 animate-pulse-dot" aria-hidden="true" /> {t('common.scroll')}
        </div>
      </section>

      <section className="shell py-16">
        <p className="mb-8 text-center text-xs font-bold uppercase tracking-[0.18em] text-muted">
          {t('home.stats.kicker')}
        </p>
        <StaggerContainer className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.slice(0, 4).map((stat) => (
            <StaggerItem key={stat.id}>
              <div className="glass rounded-3xl px-5 py-8 text-center transition-all duration-500 hover:-translate-y-1 hover:glass-strong">
                <p className="text-3xl font-extrabold tracking-tight md:text-4xl">
                  <Counter value={stat.value} suffix={stat.suffix ?? ''} />
                </p>
                <p className="mt-2 text-sm text-muted">{tp(stat.label)}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      <section className="border-y border-line bg-glass-bg backdrop-blur-xl">
        <div className="shell flex flex-wrap items-center justify-between gap-4 py-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
            {t('home.marquee.label')}
          </p>
          <Link
            to={`/${locale}/herramientas`}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent-500 transition-transform duration-300 hover:translate-x-0.5"
          >
            {t('home.marquee.cta')} <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
        <div className="border-t border-line pb-8">
          <Marquee duration={48}>
            {toolCategories.map((category, index) => (
              <Fragment key={category.id}>
                {index > 0 ? (
                  <span className="size-1 shrink-0 rounded-full bg-accent-500/50" aria-hidden="true" />
                ) : null}
                <span className="glass shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold text-ink-soft">
                  {tp(category.label)}
                </span>
              </Fragment>
            ))}
            <span className="size-1 shrink-0 rounded-full bg-accent-500/50" aria-hidden="true" />
            <span className="shrink-0 rounded-full bg-accent-500 px-5 py-2.5 text-sm font-semibold text-on-accent">
              {formatNumber(allTools.length, locale)}+
            </span>
          </Marquee>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="shell py-20 md:py-28">
          <PageHeader
            kicker={t('home.method.phasesLabel')}
            title={t('home.method.title')}
            desc={t('home.method.desc')}
            className="border-0 bg-transparent p-0 pt-0 pb-10 md:pt-0"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tracks.slice(0, 4).map((track, index) => {
              const Icon = trackIcons[index];
              return (
                <SpotlightCard key={track.id} className="p-5">
                  <div className="flex size-11 items-center justify-center rounded-2xl border border-line bg-glass-bg backdrop-blur-md">
                    <Icon className="size-5 text-accent-500" aria-hidden="true" />
                  </div>
                  <p className="mt-5 text-xs font-bold uppercase tracking-widest text-muted">
                    {String(index + 1).padStart(2, '0')} / 04
                  </p>
                  <h3 className="mt-2 font-bold">{tp(track.title)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{tp(track.desc)}</p>
                </SpotlightCard>
              );
            })}
          </div>
        </div>
      </section>

      <section className="shell py-20 md:py-28">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-accent-500">
              {t('nav.academia')}
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-5xl">
              {t('home.tracks.title')}
            </h2>
            <p className="mt-4 max-w-2xl text-ink-soft">{t('home.tracks.desc')}</p>
          </div>
          <LinkButton to={`/${locale}/academia`} variant="outline">
            {t('home.tracks.viewAll')} <ArrowRight className="size-4" />
          </LinkButton>
        </div>
        <StaggerContainer className="grid gap-4 md:grid-cols-2">
          {tracks.slice(0, 4).map((track) => (
            <StaggerItem key={track.id}>
              <SpotlightCard className="h-full p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-bold">{tp(track.title)}</h3>
                  <Badge variant="outline">
                    {locale === 'es' ? `Fase ${track.phase}` : `Phase ${track.phase}`}
                  </Badge>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">{tp(track.desc)}</p>
                <p className="mt-5 text-xs font-semibold text-accent-500">
                  {t('home.tracks.hours', { count: track.hours })} ·{' '}
                  {t('home.tracks.topics', { count: track.topicsCount })}
                </p>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      <section className="border-y border-line bg-glass-bg backdrop-blur-xl">
        <div className="shell py-20 md:py-28">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-accent-500">
                {t('home.projects.metrics')}
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-5xl">
                {t('home.projects.title')}
              </h2>
              <p className="mt-4 max-w-2xl text-ink-soft">{t('home.projects.desc')}</p>
            </div>
            <LinkButton to={`/${locale}/proyectos`} variant="outline">
              {t('home.projects.viewAll')} <ArrowRight className="size-4" />
            </LinkButton>
          </div>
          <StaggerContainer className="grid gap-4 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <StaggerItem key={project.id}>
                <Card className="h-full p-6">
                  <Badge variant="accent">{t(`home.status.${project.status}`)}</Badge>
                  <h3 className="mt-4 text-lg font-bold">{tp(project.title)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{tp(project.desc)}</p>
                  <div className="mt-5 space-y-2">
                    {project.metrics.slice(0, 2).map((metric) => (
                      <p key={metric.es} className="text-sm font-semibold text-accent-500">
                        {tp(metric)}
                      </p>
                    ))}
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="shell py-20 md:py-28">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-accent-500">
              {t('home.events.title')}
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-5xl">
              {t('home.events.desc')}
            </h2>
          </div>
          <LinkButton to={`/${locale}/eventos`} variant="outline">
            {t('home.events.viewAll')} <ArrowRight className="size-4" />
          </LinkButton>
        </div>
        <StaggerContainer className="grid gap-4 md:grid-cols-3">
          {upcoming.map((event) => (
            <StaggerItem key={event.id}>
              <Card className="h-full p-5 transition-all duration-500 hover:-translate-y-1">
                <p className="text-xs font-bold uppercase tracking-widest text-accent-500">
                  {formatDate(event.date, locale)}
                </p>
                <h3 className="mt-3 font-bold">{tp(event.title)}</h3>
                <p className="mt-2 text-sm text-muted">{tp(event.location)}</p>
              </Card>
            </StaggerItem>
          ))}
          {upcoming.length === 0 ? (
            <p className="text-muted">
              {locale === 'es' ? 'Estamos preparando los próximos eventos.' : 'We are preparing the next events.'}
            </p>
          ) : null}
        </StaggerContainer>
      </section>

      <section className="border-y border-line bg-glass-bg backdrop-blur-xl">
        <div className="shell py-20 md:py-28">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-accent-500">
                {t('nav.blog')}
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-5xl">
                {t('home.blog.title')}
              </h2>
              <p className="mt-4 max-w-2xl text-ink-soft">{t('home.blog.desc')}</p>
            </div>
            <LinkButton to={`/${locale}/blog`} variant="outline">
              {t('home.blog.viewAll')} <ArrowRight className="size-4" />
            </LinkButton>
          </div>
          <StaggerContainer className="grid gap-4 md:grid-cols-3">
            {featuredPosts.map((post) => (
              <StaggerItem key={post.id}>
                <Link to={`/${locale}/blog/${post.slug}`} className="block h-full">
                  <Card className="h-full p-5">
                    <p className="text-xs font-bold uppercase tracking-widest text-accent-500">
                      {post.category} · {post.readMinutes} {t('common.minutes')}
                    </p>
                    <h3 className="mt-3 font-bold leading-snug">{tp(post.title)}</h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">
                      {tp(post.excerpt)}
                    </p>
                    <p className="mt-5 text-xs text-muted">{t('home.blog.by', { author: post.author })}</p>
                  </Card>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="shell py-20 md:py-28">
        <Reveal>
          <div className="shine-overlay grain glass relative overflow-hidden rounded-[2.5rem] p-8 md:p-14">
            <div
              className="pointer-events-none absolute -right-24 -bottom-32 size-80 rounded-full bg-glow blur-3xl animate-float-slow"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -top-24 -left-16 size-56 rounded-full bg-glow blur-3xl animate-float"
              aria-hidden="true"
            />
            <div className="relative max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-widest text-accent-500">
                {t('home.final.kicker')}
              </p>
              <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-balance md:text-6xl">
                {t('home.final.title')}
              </h2>
              <p className="mt-5 max-w-2xl text-ink-soft">{t('home.final.desc')}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <MagneticButton>
                  <LinkButton to={`/${locale}/contacto`} size="lg">
                    {t('home.final.ctaPrimary')}
                  </LinkButton>
                </MagneticButton>
                <LinkButton to={`/${locale}/academia`} size="lg" variant="outline">
                  {t('home.final.ctaSecondary')}
                </LinkButton>
              </div>
              <p className="mt-5 text-xs text-muted">{t('home.final.micro')}</p>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
