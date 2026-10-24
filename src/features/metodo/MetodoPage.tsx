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
  useMeta(t('metodo.meta.title'), {
    description: t('metodo.meta.desc'),
    canonical: `/${locale}/metodo`,
  });

  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.7', 'end 0.65'],
  });
  const progressHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <>
      <PageHeader index="02" kicker={t('metodo.kicker')} title={t('metodo.title')} desc={t('metodo.desc')} />

      <section className="shell py-16 md:py-20">
        <p className="text-muted mb-12 text-center text-xs font-bold tracking-[0.18em] uppercase">
          {t('metodo.timelineLabel')}
        </p>

        <div ref={timelineRef} className="relative">
          <div
            className="bg-line absolute top-2 bottom-2 left-5 w-px md:left-1/2 md:-translate-x-1/2"
            aria-hidden="true"
          >
            <motion.div
              className="bg-accent-500 w-full origin-top"
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
                    className="bg-accent-500 ring-bg absolute top-8 left-5 size-3 -translate-x-1/2 rounded-full ring-4 md:left-0 md:size-3.5 md:translate-x-[-42%]"
                    aria-hidden="true"
                  />
                  <span
                    className={cn(
                      'bg-line-strong absolute top-2.5 hidden h-px md:block',
                      onRight ? 'right-[-2.5rem] w-10' : 'left-[-2.5rem] w-10',
                    )}
                    aria-hidden="true"
                  />
                  <Reveal delay={0.05}>
                    <SpotlightCard className="p-7 md:p-8">
                      <div className="flex items-center gap-3">
                        <span className="glass text-accent-500 inline-flex size-9 items-center justify-center rounded-full font-mono text-xs font-bold">
                          {String(phase).padStart(2, '0')}
                        </span>
                        <span className="bg-line h-px flex-1" aria-hidden="true" />
                      </div>
                      <h2 className="mt-5 text-2xl font-extrabold tracking-tight md:text-3xl">
                        {t(`metodo.phase${phase}.title`)}
                      </h2>
                      <p className="text-ink-soft mt-4 text-sm leading-relaxed">
                        {t(`metodo.phase${phase}.desc`)}
                      </p>
                      <ul className="mt-6 space-y-2.5">
                        {([1, 2, 3] as const).map((bullet) => (
                          <li key={bullet} className="text-muted flex items-start gap-2.5 text-sm">
                            <span className="bg-accent-500/10 mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full">
                              <Check className="text-accent-500 size-2.5" aria-hidden="true" />
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

      <section className="border-line bg-glass-bg border-y backdrop-blur-xl">
        <div className="shell py-20 md:py-28">
          <Reveal>
            <p className="text-accent-500 text-xs font-bold tracking-widest uppercase">
              {t('metodo.principles.kicker')}
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-5xl">
              {t('metodo.principles.title')}
            </h2>
            <p className="text-ink-soft mt-4 max-w-2xl">{t('metodo.principles.desc')}</p>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PRINCIPLES.map((index) => (
              <Reveal key={index} delay={index * 0.06}>
                <SpotlightCard className="h-full p-6">
                  <p className="text-accent-500 font-mono text-xs">{String(index).padStart(2, '0')}</p>
                  <h3 className="mt-4 font-bold">{t(`metodo.principle${index}.title`)}</h3>
                  <p className="text-muted mt-2 text-sm leading-relaxed">
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
            className="bg-glow animate-float pointer-events-none absolute -bottom-28 -left-16 size-72 rounded-full blur-3xl"
            aria-hidden="true"
          />
          <div className="relative max-w-3xl">
            <p className="text-accent-500 text-xs font-bold tracking-widest uppercase">
              {t('metodo.final.kicker')}
            </p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-balance md:text-5xl">
              {t('metodo.final.title')}
            </h2>
            <p className="text-ink-soft mt-5 max-w-2xl">{t('metodo.final.desc')}</p>
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
