import { Fragment, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, BrainCircuit, Code2, Database, Sparkles } from 'lucide-react';
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

const HERO_SLIDE_MS = 7000;

const HERO_SLIDES = [
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Black_hole_-_Messier_87_crop_max_res.jpg/1280px-Black_hole_-_Messier_87_crop_max_res.jpg',
    position: 'center',
  },
  {
    src: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=2000&q=80',
    position: 'center',
  },
  {
    src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2000&q=80',
    position: 'center',
  },
  {
    src: 'https://images.unsplash.com/photo-1614642264762-d0a3b8bf3700?auto=format&fit=crop&w=2000&q=80',
    position: 'center',
  },
  {
    src: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&w=2000&q=80',
    position: 'center',
  },
  {
    src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=2000&q=80',
    position: 'center',
  },
] as const;

const heroWord = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: EASE_OUT_EXPO },
  },
} as const;

export function HomePage() {
  const { locale, t, tp } = useLocale();
  const reduced = useReducedMotion();
  useMeta(t('home.meta.title'), siteConfig.description[locale]);

  const heroRef = useRef<HTMLElement>(null);
  const [slide, setSlide] = useState(0);
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 700], [0, 140]);
  const quoteOpacity = useTransform(scrollY, [0, 420], [1, 0]);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setSlide((current) => (current + 1) % HERO_SLIDES.length);
    }, HERO_SLIDE_MS);
    return () => window.clearInterval(id);
  }, [reduced]);

  const upcoming = events
    .filter((event) => new Date(event.date).getTime() > Date.now())
    .sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
    .slice(0, 3);
  const featuredProjects = projects.filter((project) => project.featured).slice(0, 3);
  const featuredPosts = posts.filter((post) => post.featured).slice(0, 3);

  const quoteWords = t('home.hero.quote').split(' ');

  return (
    <>
      <section
        ref={heroRef}
        className="relative h-[calc(100svh-4rem)] min-h-[540px] overflow-hidden md:h-[calc(100svh-4.5rem)]"
      >
        <motion.div style={reduced ? undefined : { y: parallaxY }} className="absolute inset-0">
          {HERO_SLIDES.map((item, index) => (
            <motion.div
              key={item.src}
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: index === slide ? 1 : 0 }}
              transition={{ duration: reduced ? 0 : 1.8, ease: 'easeInOut' }}
              aria-hidden={index === slide ? undefined : true}
            >
              <img
                src={item.src}
                alt=""
                draggable={false}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
                className={reduced ? 'h-full w-full object-cover' : 'h-full w-full object-cover animate-kenburns'}
                style={{ objectPosition: item.position, animationDirection: index % 2 ? 'alternate-reverse' : 'alternate' }}
              />
            </motion.div>
          ))}
        </motion.div>

        <div
          className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/60"
          aria-hidden="true"
        />

        <motion.div
          style={reduced ? undefined : { opacity: quoteOpacity }}
          className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white"
        >
          <motion.blockquote
            className="max-w-5xl"
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.09, delayChildren: 0.35 }}
          >
            <p className="text-4xl font-extrabold leading-[1.12] tracking-[-0.03em] text-balance drop-shadow-[0_4px_32px_rgb(0_0_0/0.65)] sm:text-5xl md:text-6xl lg:text-7xl">
              {quoteWords.map((word, index) => (
                <motion.span
                  key={`${word}-${index}`}
                  className="inline-block"
                  variants={reduced ? undefined : heroWord}
                  style={reduced ? { opacity: 1 } : undefined}
                >
                  {word}
                  {index < quoteWords.length - 1 ? ' ' : ''}
                </motion.span>
              ))}
            </p>
            <motion.footer
              className="mt-8"
              initial={reduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: reduced ? 0 : 1.15, ease: EASE_OUT_EXPO }}
            >
              <span
                className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-white/75 drop-shadow-[0_2px_12px_rgb(0_0_0/0.6)] sm:text-sm"
              >
                <span className="h-px w-8 bg-white/50" aria-hidden="true" />
                {t('home.hero.quoteBy')}
                <span className="h-px w-8 bg-white/50" aria-hidden="true" />
              </span>
            </motion.footer>
          </motion.blockquote>
        </motion.div>
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
