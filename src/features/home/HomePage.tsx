import { Fragment, useEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
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
import { SocialIcon } from '@/components/ui/SocialIcon';
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
  useMeta(t('home.meta.title'), {
    description: siteConfig.description[locale],
    canonical: `/${locale}`,
  });

  const heroRef = useRef<HTMLElement>(null);
  const storyRef = useRef<HTMLElement>(null);
  const [slide, setSlide] = useState(0);
  const [activePhase, setActivePhase] = useState(0);
  const { scrollY } = useScroll();
  const { scrollYProgress: storyProgress } = useScroll({
    target: storyRef,
    offset: ['start start', 'end end'],
  });
  const parallaxY = useTransform(scrollY, [0, 700], [0, 140]);
  const quoteOpacity = useTransform(scrollY, [0, 420], [1, 0]);

  useMotionValueEvent(storyProgress, 'change', (progress) => {
    setActivePhase(Math.min(3, Math.floor(progress * 4)));
  });

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
                className={
                  reduced ? 'h-full w-full object-cover' : 'animate-kenburns h-full w-full object-cover'
                }
                style={{
                  objectPosition: item.position,
                  animationDirection: index % 2 ? 'alternate-reverse' : 'alternate',
                }}
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
            <p className="text-4xl leading-[1.12] font-extrabold tracking-[-0.03em] text-balance drop-shadow-[0_4px_32px_rgb(0_0_0/0.65)] sm:text-5xl md:text-6xl lg:text-7xl">
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
              <span className="inline-flex items-center gap-3 text-xs font-bold tracking-[0.3em] text-white/75 uppercase drop-shadow-[0_2px_12px_rgb(0_0_0/0.6)] sm:text-sm">
                <span className="h-px w-8 bg-white/50" aria-hidden="true" />
                {t('home.hero.quoteBy')}
                <span className="h-px w-8 bg-white/50" aria-hidden="true" />
              </span>
            </motion.footer>
          </motion.blockquote>
        </motion.div>
      </section>

      <section className="shell py-16">
        <p className="text-muted mb-8 text-center text-xs font-bold tracking-[0.18em] uppercase">
          {t('home.stats.kicker')}
        </p>
        <StaggerContainer className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.slice(0, 4).map((stat) => (
            <StaggerItem key={stat.id}>
              <div className="glass hover:glass-strong rounded-3xl px-5 py-8 text-center transition-all duration-500 hover:-translate-y-1">
                <p className="text-3xl font-extrabold tracking-tight md:text-4xl">
                  <Counter value={stat.value} suffix={stat.suffix ?? ''} />
                </p>
                <p className="text-muted mt-2 text-sm">{tp(stat.label)}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      <section className="border-line bg-glass-bg border-y backdrop-blur-xl">
        <div className="shell flex flex-wrap items-center justify-between gap-4 py-6">
          <p className="text-muted text-xs font-bold tracking-[0.18em] uppercase">
            {t('home.marquee.label')}
          </p>
          <Link
            to={`/${locale}/herramientas`}
            className="text-accent-500 inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase transition-transform duration-300 hover:translate-x-0.5"
          >
            {t('home.marquee.cta')} <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
        <div className="border-line border-t pb-8">
          <Marquee duration={48}>
            {toolCategories.map((category, index) => (
              <Fragment key={category.id}>
                {index > 0 ? (
                  <span className="bg-accent-500/50 size-1 shrink-0 rounded-full" aria-hidden="true" />
                ) : null}
                <span className="glass text-ink-soft shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold">
                  {tp(category.label)}
                </span>
              </Fragment>
            ))}
            <span className="bg-accent-500/50 size-1 shrink-0 rounded-full" aria-hidden="true" />
            <span className="bg-accent-500 text-on-accent shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold">
              {formatNumber(allTools.length, locale)}+
            </span>
          </Marquee>
        </div>
      </section>

      <section ref={storyRef} className="border-line bg-glass-bg relative border-y">
        <div className="shell py-16 md:py-24">
          <PageHeader
            kicker={t('home.method.phasesLabel')}
            title={t('home.method.title')}
            desc={t('home.method.desc')}
            className="border-0 bg-transparent p-0 pb-12"
          />
          <div className="grid items-start gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div className="relative">
              {tracks.slice(0, 4).map((track, index) => {
                return (
                  <div key={track.id} className="flex min-h-[42vh] items-center py-8">
                    <motion.div
                      animate={{
                        opacity: activePhase === index ? 1 : 0.48,
                        x: activePhase === index ? 0 : 8,
                      }}
                      transition={{ duration: reduced ? 0 : 0.35 }}
                      className="max-w-sm"
                    >
                      <p className="text-accent-500 text-xs font-bold tracking-widest uppercase">
                        {String(index + 1).padStart(2, '0')} / 04
                      </p>
                      <h3 className="mt-3 text-2xl font-bold md:text-3xl">{tp(track.title)}</h3>
                      <p className="text-muted mt-3 text-sm leading-relaxed">{tp(track.desc)}</p>
                    </motion.div>
                  </div>
                );
              })}
            </div>

            <div className="sticky top-24 flex min-h-[58vh] items-center py-6">
              <div className="glass grain relative grid min-h-[58vh] w-full place-items-center overflow-hidden rounded-3xl p-6 md:p-10">
                <div className="grid-bg pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
                <div className="relative aspect-square w-full max-w-[31rem]">
                  <div className="border-line-strong absolute inset-[15%] rounded-full border" />
                  <div className="border-line absolute inset-[29%] rounded-full border" />
                  <div className="border-line absolute inset-[43%] rounded-full border" />
                  <div className="bg-line-strong absolute top-[15%] left-1/2 h-[70%] w-px -translate-x-1/2" />
                  <div className="bg-line-strong absolute top-1/2 left-[15%] h-px w-[70%] -translate-y-1/2" />
                  {tracks.slice(0, 4).map((track, index) => {
                    const Icon = trackIcons[index];
                    const positions = [
                      'left-1/2 top-[4%] -translate-x-1/2',
                      'right-[4%] top-1/2 -translate-y-1/2',
                      'bottom-[4%] left-1/2 -translate-x-1/2',
                      'left-[4%] top-1/2 -translate-y-1/2',
                    ];
                    const visible = index <= activePhase;
                    return (
                      <motion.div
                        key={track.id}
                        initial={false}
                        animate={{ opacity: visible ? 1 : 0.22, scale: visible ? 1 : 0.82 }}
                        transition={{ duration: reduced ? 0 : 0.45, ease: EASE_OUT_EXPO }}
                        className={`absolute z-10 ${positions[index]} border-line bg-bg flex size-14 items-center justify-center rounded-2xl border shadow-[0_8px_24px_rgb(0_0_0/0.12)] md:size-16`}
                        aria-label={tp(track.title)}
                      >
                        <Icon className="text-accent-500 size-5 md:size-6" aria-hidden="true" />
                      </motion.div>
                    );
                  })}
                  <div className="bg-accent-500 text-on-accent absolute inset-[34%] flex flex-col items-center justify-center rounded-full text-center shadow-[0_16px_44px_rgb(0_0_0/0.25)]">
                    <span className="text-[10px] font-bold tracking-widest uppercase opacity-70">
                      Quonceptory
                    </span>
                    <span className="mt-1 text-sm font-extrabold md:text-base">
                      {tp(tracks[activePhase]?.title ?? tracks[0].title)}
                    </span>
                  </div>
                  <motion.div
                    className="border-accent-500/30 absolute inset-[8%] rounded-full border"
                    animate={reduced ? undefined : { rotate: 360 }}
                    transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
                    aria-hidden="true"
                  />
                </div>
                <div className="text-muted absolute right-6 bottom-5 left-6 flex items-center justify-between text-[10px] font-bold tracking-widest uppercase md:right-10 md:left-10">
                  <span>{t('home.method.systemStatus')}</span>
                  <span>{String(activePhase + 1).padStart(2, '0')} / 04</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-line bg-glass-bg border-y">
        <div className="shell py-16 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-accent-500 text-xs font-bold tracking-widest uppercase">
                {t('home.social.kicker')}
              </p>
              <h2 className="mt-3 max-w-xl text-3xl font-extrabold md:text-5xl">{t('home.social.title')}</h2>
            </div>
            <a
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent('Founder - Allerihe')}`}
              target="_blank"
              rel="noreferrer"
              className="group relative flex min-h-48 items-end justify-between overflow-hidden rounded-2xl bg-[#d82424] p-6 text-white shadow-[0_12px_30px_rgb(80_0_0/0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgb(80_0_0/0.26)] md:min-h-56 md:p-8"
            >
              <div
                className="absolute -top-12 -right-8 size-56 rounded-full border border-white/20 transition-transform duration-700 group-hover:scale-110"
                aria-hidden="true"
              />
              <div className="relative">
                <p className="text-xs font-bold tracking-widest text-white/75 uppercase">YouTube</p>
                <h3 className="mt-3 text-2xl font-extrabold md:text-4xl">Founder - Allerihe</h3>
                <p className="mt-2 text-sm text-white/80">{t('home.social.youtubeCta')}</p>
              </div>
              <span className="relative flex size-12 shrink-0 items-center justify-center rounded-full bg-white text-[#d82424] shadow-lg transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight className="size-5" aria-hidden="true" />
              </span>
            </a>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {siteConfig.socials
              .filter((social) => ['Instagram', 'TikTok', 'YouTube', 'LinkedIn', 'X'].includes(social.label))
              .map((social) => (
                <a
                  key={social.label}
                  href={
                    social.label === 'YouTube'
                      ? `https://www.youtube.com/results?search_query=${encodeURIComponent('Founder - Allerihe')}`
                      : social.href
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="glass group hover:glass-strong flex min-h-16 items-center justify-between gap-3 rounded-xl px-4 transition-all duration-300 hover:-translate-y-1"
                >
                  <span className="flex items-center gap-3 text-sm font-semibold">
                    <SocialIcon name={social.icon} className="text-accent-500 size-4" />
                    {social.label}
                  </span>
                  <ArrowRight
                    className="text-muted size-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </a>
              ))}
          </div>
        </div>
      </section>

      <section className="shell py-20 md:py-28">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="text-accent-500 text-xs font-bold tracking-widest uppercase">{t('nav.academia')}</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-5xl">
              {t('home.tracks.title')}
            </h2>
            <p className="text-ink-soft mt-4 max-w-2xl">{t('home.tracks.desc')}</p>
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
                  <Badge variant="outline">{t('home.tracks.phase', { phase: track.phase })}</Badge>
                </div>
                <p className="text-muted mt-3 text-sm leading-relaxed">{tp(track.desc)}</p>
                <p className="text-accent-500 mt-5 text-xs font-semibold">
                  {t('home.tracks.hours', { count: track.hours })} ·{' '}
                  {t('home.tracks.topics', { count: track.topicsCount })}
                </p>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      <section className="border-line bg-glass-bg border-y backdrop-blur-xl">
        <div className="shell py-20 md:py-28">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="text-accent-500 text-xs font-bold tracking-widest uppercase">
                {t('home.projects.metrics')}
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-5xl">
                {t('home.projects.title')}
              </h2>
              <p className="text-ink-soft mt-4 max-w-2xl">{t('home.projects.desc')}</p>
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
                  <p className="text-muted mt-2 text-sm leading-relaxed">{tp(project.desc)}</p>
                  <div className="mt-5 space-y-2">
                    {project.metrics.slice(0, 2).map((metric) => (
                      <p key={metric.es} className="text-accent-500 text-sm font-semibold">
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
            <p className="text-accent-500 text-xs font-bold tracking-widest uppercase">
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
                <p className="text-accent-500 text-xs font-bold tracking-widest uppercase">
                  {formatDate(event.date, locale)}
                </p>
                <h3 className="mt-3 font-bold">{tp(event.title)}</h3>
                <p className="text-muted mt-2 text-sm">{tp(event.location)}</p>
              </Card>
            </StaggerItem>
          ))}
          {upcoming.length === 0 ? <p className="text-muted">{t('home.events.empty')}</p> : null}
        </StaggerContainer>
      </section>

      <section className="border-line bg-glass-bg border-y backdrop-blur-xl">
        <div className="shell py-20 md:py-28">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="text-accent-500 text-xs font-bold tracking-widest uppercase">{t('nav.blog')}</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-5xl">
                {t('home.blog.title')}
              </h2>
              <p className="text-ink-soft mt-4 max-w-2xl">{t('home.blog.desc')}</p>
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
                    <p className="text-accent-500 text-xs font-bold tracking-widest uppercase">
                      {post.category} · {post.readMinutes} {t('common.minutes')}
                    </p>
                    <h3 className="mt-3 leading-snug font-bold">{tp(post.title)}</h3>
                    <p className="text-muted mt-3 line-clamp-3 text-sm leading-relaxed">{tp(post.excerpt)}</p>
                    <p className="text-muted mt-5 text-xs">{t('home.blog.by', { author: post.author })}</p>
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
              className="bg-glow animate-float-slow pointer-events-none absolute -right-24 -bottom-32 size-80 rounded-full blur-3xl"
              aria-hidden="true"
            />
            <div
              className="bg-glow animate-float pointer-events-none absolute -top-24 -left-16 size-56 rounded-full blur-3xl"
              aria-hidden="true"
            />
            <div className="relative max-w-3xl">
              <p className="text-accent-500 text-xs font-bold tracking-widest uppercase">
                {t('home.final.kicker')}
              </p>
              <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-balance md:text-6xl">
                {t('home.final.title')}
              </h2>
              <p className="text-ink-soft mt-5 max-w-2xl">{t('home.final.desc')}</p>
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
              <p className="text-muted mt-5 text-xs">{t('home.final.micro')}</p>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
