import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Check } from 'lucide-react';
import { LinkButton } from '@/components/ui/Button';
import { SpotlightCard } from '@/components/ui/Card';
import { PageHeader } from '@/components/layout/PageHeader';
import { Reveal } from '@/components/ui/Reveal';
import { useLocale } from '@/i18n';
import { useMeta } from '@/lib/useMeta';
import { cn } from '@/lib/utils';

const PHASES = [1, 2, 3, 4] as const;

const PRINCIPLES = [1, 2, 3, 4] as const;

export function MetodoPage() {
  const { locale, t } = useLocale();
  const reduced = useReducedMotion();
  useMeta(t('metodo.meta.title'), t('metodo.meta.desc'));

  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.7', 'end 0.65'],
  });
  const progressHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <>
      <PageHeader
        index="02"
        kicker={t('metodo.kicker')}
        title={t('metodo.title')}
        desc={t('metodo.desc')}
      />

      <section className="shell py-16 md:py-20">
        <p className="mb-12 text-center text-xs font-bold uppercase tracking-[0.18em] text-muted">
          {t('metodo.timelineLabel')}
        </p>

        <div ref={timelineRef} className="relative">
          <div
            className="absolute top-2 bottom-2 left-5 w-px bg-line md:left-1/2 md:-translate-x-1/2"
            aria-hidden="true"
          >
            <motion.div
              className="w-full origin-top bg-accent-500"
              style={{ height: reduced ? '100%' : progressHeight }}
            />
          </div>

          <div className="space-y-10 md:space-y-16">
            {PHASES.map((phase, index) => {
              const onRight = index % 2 === 0;
              return (
                <div
                  key={phase}
                  className={cn(
                    'relative pl-14 md:w-[calc(50%-2.5rem)] md:pl-0',
                    onRight ? 'md:ml-auto md:pr-0' : 'md:mr-auto',
                  )}
                >
                  <span
                    className="absolute top-8 left-5 size-3 -translate-x-1/2 rounded-full bg-accent-500 ring-4 ring-bg md:left-0 md:translate-x-[-42%] md:size-3.5"
                    aria-hidden="true"
                  />
                  <span
                    className={cn(
                      'absolute top-2.5 hidden h-px bg-line-strong md:block',
                      onRight ? 'right-[-2.5rem] w-10' : 'left-[-2.5rem] w-10',
                    )}
                    aria-hidden="true"
                  />
                  <Reveal delay={0.05}>
                    <SpotlightCard className="p-7 md:p-8">
                      <div className="flex items-center gap-3">
                        <span className="glass inline-flex size-9 items-center justify-center rounded-full font-mono text-xs font-bold text-accent-500">
                          {String(phase).padStart(2, '0')}
                        </span>
                        <span className="h-px flex-1 bg-line" aria-hidden="true" />
                      </div>
                      <h2 className="mt-5 text-2xl font-extrabold tracking-tight md:text-3xl">
                        {t(`metodo.phase${phase}.title`)}
                      </h2>
                      <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                        {t(`metodo.phase${phase}.desc`)}
                      </p>
                      <ul className="mt-6 space-y-2.5">
                        {([1, 2, 3] as const).map((bullet) => (
                          <li key={bullet} className="flex items-start gap-2.5 text-sm text-muted">
                            <span className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-accent-500/10">
                              <Check className="size-2.5 text-accent-500" aria-hidden="true" />
                            </span>
                            {t(`metodo.phase${phase}.b${bullet}`)}
                          </li>
                        ))}
                      </ul>
                    </SpotlightCard>
                  </Reveal>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-glass-bg backdrop-blur-xl">
        <div className="shell py-20 md:py-28">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-widest text-accent-500">
              {t('metodo.principles.kicker')}
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-5xl">
              {t('metodo.principles.title')}
            </h2>
            <p className="mt-4 max-w-2xl text-ink-soft">{t('metodo.principles.desc')}</p>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PRINCIPLES.map((index) => (
              <Reveal key={index} delay={index * 0.06}>
                <SpotlightCard className="h-full p-6">
                  <p className="font-mono text-xs text-accent-500">
                    {String(index).padStart(2, '0')}
                  </p>
                  <h3 className="mt-4 font-bold">{t(`metodo.principle${index}.title`)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {t(`metodo.principle${index}.desc`)}
                  </p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="shell py-20 md:py-28">
        <Reveal className="glass grain relative overflow-hidden rounded-[2.5rem] p-8 md:p-14">
          <div
            className="pointer-events-none absolute -bottom-28 -left-16 size-72 rounded-full bg-glow blur-3xl animate-float"
            aria-hidden="true"
          />
          <div className="relative max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-widest text-accent-500">
              {t('metodo.final.kicker')}
            </p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-balance md:text-5xl">
              {t('metodo.final.title')}
            </h2>
            <p className="mt-5 max-w-2xl text-ink-soft">{t('metodo.final.desc')}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton to={`/${locale}/contacto`} size="lg">
                {t('metodo.final.ctaPrimary')}
              </LinkButton>
              <LinkButton to={`/${locale}/academia`} size="lg" variant="outline">
                {t('metodo.final.ctaSecondary')}
              </LinkButton>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
