import { ArrowRight, Orbit, Sparkles, Waves } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { LinkButton } from '@/components/ui/Button';
import { SpotlightCard } from '@/components/ui/Card';
import { PageHeader } from '@/components/layout/PageHeader';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/ui/Reveal';
import { useLocale } from '@/i18n';
import { useMeta } from '@/lib/useMeta';

const SECTION_ICONS = { cosmos: Orbit, vida: Waves, materia: Sparkles } as const;

const IMAGES = {
  blackHole:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Black_hole_-_Messier_87_crop_max_res.jpg/1280px-Black_hole_-_Messier_87_crop_max_res.jpg',
  galaxy: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1400&q=80',
  sun: 'https://images.unsplash.com/photo-1614642264762-d0a3b8bf3700?auto=format&fit=crop&w=1400&q=80',
  reef: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&w=1400&q=80',
  divers: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1400&q=80',
  turtle: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&w=1400&q=80',
} as const;

type DomainKey = 'cosmos' | 'vida' | 'materia';

interface DomainCard {
  titleKey: string;
  descKey: string;
  factKey: string;
  image?: string;
}

const DOMAIN_CARDS: Record<DomainKey, readonly DomainCard[]> = {
  cosmos: [
    {
      titleKey: 'ciencia.cosmos.card1.title',
      descKey: 'ciencia.cosmos.card1.desc',
      factKey: 'ciencia.cosmos.card1.fact',
      image: IMAGES.blackHole,
    },
    {
      titleKey: 'ciencia.cosmos.card2.title',
      descKey: 'ciencia.cosmos.card2.desc',
      factKey: 'ciencia.cosmos.card2.fact',
      image: IMAGES.galaxy,
    },
    {
      titleKey: 'ciencia.cosmos.card3.title',
      descKey: 'ciencia.cosmos.card3.desc',
      factKey: 'ciencia.cosmos.card3.fact',
      image: IMAGES.sun,
    },
  ],
  vida: [
    {
      titleKey: 'ciencia.vida.card1.title',
      descKey: 'ciencia.vida.card1.desc',
      factKey: 'ciencia.vida.card1.fact',
      image: IMAGES.reef,
    },
    {
      titleKey: 'ciencia.vida.card2.title',
      descKey: 'ciencia.vida.card2.desc',
      factKey: 'ciencia.vida.card2.fact',
      image: IMAGES.divers,
    },
    {
      titleKey: 'ciencia.vida.card3.title',
      descKey: 'ciencia.vida.card3.desc',
      factKey: 'ciencia.vida.card3.fact',
      image: IMAGES.turtle,
    },
  ],
  materia: [
    {
      titleKey: 'ciencia.materia.card1.title',
      descKey: 'ciencia.materia.card1.desc',
      factKey: 'ciencia.materia.card1.fact',
    },
    {
      titleKey: 'ciencia.materia.card2.title',
      descKey: 'ciencia.materia.card2.desc',
      factKey: 'ciencia.materia.card2.fact',
    },
    {
      titleKey: 'ciencia.materia.card3.title',
      descKey: 'ciencia.materia.card3.desc',
      factKey: 'ciencia.materia.card3.fact',
    },
  ],
};

function DomainSection({ domain, id }: { domain: DomainKey; id: string }) {
  const { t } = useLocale();
  const Icon = SECTION_ICONS[domain];
  const cards = DOMAIN_CARDS[domain];
  const flip = domain === 'vida';

  return (
    <section
      id={id}
      className={flip ? 'border-line bg-glass-bg scroll-mt-24 border-y backdrop-blur-xl' : 'scroll-mt-24'}
    >
      <div className="shell py-20 md:py-28">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="glass inline-flex size-10 items-center justify-center rounded-full">
              <Icon className="text-accent-500 size-5" aria-hidden="true" />
            </span>
            <span className="text-muted text-[11px] font-bold tracking-[0.18em] uppercase">
              {t(`ciencia.${domain}.kicker`)}
            </span>
          </div>
          <h2 className="mt-5 max-w-3xl text-3xl font-extrabold tracking-tight text-balance md:text-5xl">
            {t(`ciencia.${domain}.title`)}
          </h2>
          <p className="text-ink-soft mt-4 max-w-2xl">{t(`ciencia.${domain}.desc`)}</p>
        </Reveal>

        <StaggerContainer className="mt-12 grid gap-4 md:grid-cols-3">
          {cards.map((card) => (
            <StaggerItem key={card.titleKey}>
              <SpotlightCard className="flex h-full flex-col overflow-hidden">
                {card.image ? (
                  <div className="border-line relative aspect-[16/10] overflow-hidden border-b">
                    <img
                      src={card.image}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
                      aria-hidden="true"
                    />
                  </div>
                ) : null}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-bold">{t(card.titleKey)}</h3>
                  <p className="text-muted mt-3 flex-1 text-sm leading-relaxed">{t(card.descKey)}</p>
                  <p className="border-line text-accent-500 mt-5 border-t pt-4 text-xs font-semibold">
                    {t(card.factKey)}
                  </p>
                </div>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

export function CienciaPage() {
  const { locale, t } = useLocale();
  useMeta(t('ciencia.meta.title'), {
    description: t('ciencia.meta.desc'),
    canonical: `/${locale}/ciencia`,
  });

  return (
    <>
      <PageHeader
        index="01"
        kicker={t('ciencia.kicker')}
        title={t('ciencia.title')}
        desc={t('ciencia.desc')}
      />

      <Reveal className="shell pt-16">
        <blockquote className="glass grain relative mx-auto max-w-3xl overflow-hidden rounded-[2rem] p-10 text-center md:p-14">
          <p className="text-2xl leading-snug font-extrabold tracking-tight text-balance md:text-4xl">
            “{t('ciencia.quote')}”
          </p>
          <footer className="text-muted mt-6 text-xs font-bold tracking-[0.3em] uppercase">
            — {t('ciencia.quoteBy')}
          </footer>
        </blockquote>
      </Reveal>

      <DomainSection domain="cosmos" id="cosmos" />
      <DomainSection domain="vida" id="vida" />
      <DomainSection domain="materia" id="materia" />

      <section className="shell py-20 md:py-28">
        <Reveal className="glass relative overflow-hidden rounded-[2.5rem] p-8 md:p-14">
          <div
            className="bg-glow animate-float-slow pointer-events-none absolute -top-24 -right-16 size-72 rounded-full blur-3xl"
            aria-hidden="true"
          />
          <div className="relative max-w-3xl">
            <Badge variant="accent">{t('ciencia.cta.kicker')}</Badge>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-balance md:text-5xl">
              {t('ciencia.cta.title')}
            </h2>
            <p className="text-ink-soft mt-5 max-w-2xl">{t('ciencia.cta.desc')}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton to={`/${locale}/metodo`} size="lg">
                {t('ciencia.cta.primary')} <ArrowRight className="size-4" aria-hidden="true" />
              </LinkButton>
              <LinkButton to={`/${locale}/academia`} size="lg" variant="outline">
                {t('ciencia.cta.secondary')}
              </LinkButton>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
