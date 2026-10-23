import { useMemo, useState } from 'react';
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  MonitorPlay,
  Trophy,
  Users,
  Video,
  Wifi,
  Wrench,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button, LinkButton } from '@/components/ui/Button';
import { Card, CardInteractive } from '@/components/ui/Card';
import { PageHeader } from '@/components/layout/PageHeader';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Tabs, type TabItem } from '@/components/ui/Tabs';
import { events, type EventItem, type Locale } from '@/data';
import { siteConfig } from '@/config/site';
import { useLocale } from '@/i18n';
import { formatDate, formatNumber } from '@/lib/utils';
import { useMeta } from '@/lib/useMeta';

type EventType = EventItem['type'];
type PastFilter = 'all' | EventType;

const TYPE_ICONS: Record<EventType, LucideIcon> = {
  webinar: Video,
  workshop: Wrench,
  hackathon: Trophy,
  meetup: Users,
};

const PAGE_SIZE = 12;

function dateParts(iso: string, locale: Locale) {
  const tag = locale === 'es' ? 'es-ES' : 'en-US';
  const date = new Date(iso);
  return {
    day: new Intl.DateTimeFormat(tag, { day: '2-digit' }).format(date),
    month: new Intl.DateTimeFormat(tag, { month: 'short' }).format(date).replace('.', ''),
    time: new Intl.DateTimeFormat(tag, { hour: '2-digit', minute: '2-digit' }).format(date),
  };
}

function DateBlock({ iso, locale, size = 'md' }: { iso: string; locale: Locale; size?: 'sm' | 'md' }) {
  const { day, month, time } = dateParts(iso, locale);
  const large = size === 'md';
  return (
    <div
      className={
        large
          ? 'flex w-24 shrink-0 flex-col items-center justify-center rounded-2xl border border-line-strong bg-surface-2 py-5'
          : 'flex w-16 shrink-0 flex-col items-center justify-center rounded-xl border border-line bg-surface-2 py-3'
      }
    >
      <span
        className={
          large
            ? 'text-4xl font-extrabold leading-none tracking-tight'
            : 'text-xl font-extrabold leading-none tracking-tight'
        }
      >
        {day}
      </span>
      <span
        className={
          large
            ? 'mt-1 text-[11px] font-bold uppercase tracking-[0.2em] text-accent-500'
            : 'mt-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-muted'
        }
      >
        {month}
      </span>
      {large ? (
        <span className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-muted">
          <CalendarDays className="size-3" aria-hidden="true" />
          {time}
        </span>
      ) : null}
    </div>
  );
}

function SeatsLabel({ seats, label, oneLabel }: { seats?: number; label: string; oneLabel: string }) {
  if (seats === undefined) return null;
  const text = seats === 1 ? oneLabel : label.replace('{count}', String(seats));
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted">
      <Users className="size-3.5" aria-hidden="true" />
      {text}
    </span>
  );
}

function TypeBadge({
  type,
  label,
  variant,
}: {
  type: EventType;
  label: string;
  variant?: 'accent' | 'neutral';
}) {
  const Icon = TYPE_ICONS[type];
  return (
    <Badge variant={variant ?? 'neutral'}>
      <Icon className="mr-1 size-3" aria-hidden="true" />
      {label}
    </Badge>
  );
}

function PlaceLine({ online, text }: { online: boolean; text: string }) {
  const Icon = online ? Wifi : MapPin;
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-muted">
      <Icon className="size-4 shrink-0" aria-hidden="true" />
      {text}
    </span>
  );
}

export function EventosPage() {
  const { locale, t, tp } = useLocale();
  const [pastFilter, setPastFilter] = useState<PastFilter>('all');
  const [pastVisible, setPastVisible] = useState(PAGE_SIZE);

  useMeta(`${t('eventos.title')} — Quonceptory Academy`, t('eventos.desc'));

  const now = useMemo(() => Date.now(), []);
  const upcoming = useMemo(
    () =>
      events
        .filter((event) => new Date(event.date).getTime() > now)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
    [now],
  );
  const past = useMemo(
    () =>
      events
        .filter((event) => new Date(event.date).getTime() <= now)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [now],
  );

  const filteredPast = useMemo(
    () => (pastFilter === 'all' ? past : past.filter((event) => event.type === pastFilter)),
    [past, pastFilter],
  );
  const shownPast = filteredPast.slice(0, pastVisible);
  const hasMorePast = pastVisible < filteredPast.length;

  const hero = upcoming[0];
  const restUpcoming = upcoming.slice(1, 10);
  const youtubeHref = siteConfig.socials.find((social) => social.label === 'YouTube')?.href;

  const tabs: TabItem<PastFilter>[] = [
    { id: 'all', label: t('eventos.filtersAll'), icon: MonitorPlay },
    { id: 'webinar', label: t('eventos.type.webinar'), icon: Video },
    { id: 'workshop', label: t('eventos.type.workshop'), icon: Wrench },
    { id: 'hackathon', label: t('eventos.type.hackathon'), icon: Trophy },
    { id: 'meetup', label: t('eventos.type.meetup'), icon: Users },
  ];

  const onFilterChange = (id: PastFilter) => {
    setPastFilter(id);
    setPastVisible(PAGE_SIZE);
  };

  return (
    <>
      <PageHeader kicker={t('eventos.kicker')} title={t('eventos.title')} desc={t('eventos.desc')} />

      <section className="shell py-16 md:py-24">
        <SectionHeading
          kicker={t('eventos.upcomingKicker')}
          title={t('eventos.upcomingTitle')}
          desc={t('eventos.upcomingDesc')}
          className="mb-10"
        />

        {hero ? (
          <Reveal>
            <Card className="grain relative overflow-hidden">
              <div
                className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full bg-glow blur-3xl"
                aria-hidden="true"
              />
              <div className="relative grid gap-8 p-6 md:grid-cols-[auto_1fr] md:p-10">
                <DateBlock iso={hero.date} locale={locale} />
                <div className="flex flex-col gap-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <TypeBadge type={hero.type} label={t(`eventos.type.${hero.type}`)} variant="accent" />
                    {hero.online ? <Badge variant="outline">{t('eventos.online')}</Badge> : null}
                    <SeatsLabel
                      seats={hero.seats}
                      label={t('eventos.seats')}
                      oneLabel={t('eventos.seatsOne')}
                    />
                  </div>
                  <h3 className="text-2xl font-extrabold tracking-tight text-balance md:text-4xl">
                    {tp(hero.title)}
                  </h3>
                  <p className="max-w-2xl text-ink-soft">{tp(hero.desc)}</p>
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                    <PlaceLine online={hero.online} text={tp(hero.location)} />
                    <span className="text-sm font-semibold text-muted">
                      {formatDate(hero.date, locale)}
                    </span>
                  </div>
                  <div>
                    <LinkButton to={siteConfig.calendly} external variant="primary" size="lg">
                      {t('eventos.bookSeat')}
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </LinkButton>
                  </div>
                </div>
              </div>
            </Card>
          </Reveal>
        ) : null}

        {restUpcoming.length > 0 ? (
          <StaggerContainer className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {restUpcoming.map((event) => (
              <StaggerItem key={event.id}>
                <CardInteractive className="h-full p-5">
                  <div className="flex items-start gap-4">
                    <DateBlock iso={event.date} locale={locale} size="sm" />
                    <div className="flex min-w-0 flex-1 flex-col gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <TypeBadge type={event.type} label={t(`eventos.type.${event.type}`)} />
                        {event.online ? (
                          <Badge variant="outline" className="gap-1">
                            <Wifi className="size-3" aria-hidden="true" />
                            {t('eventos.online')}
                          </Badge>
                        ) : null}
                      </div>
                      <h3 className="text-base font-bold leading-snug text-balance">{tp(event.title)}</h3>
                      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1">
                        <PlaceLine online={event.online} text={tp(event.location)} />
                        <SeatsLabel
                          seats={event.seats}
                          label={t('eventos.seats')}
                          oneLabel={t('eventos.seatsOne')}
                        />
                      </div>
                      <span className="text-xs font-semibold text-muted">
                        {formatDate(event.date, locale)}
                      </span>
                    </div>
                  </div>
                </CardInteractive>
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : null}
      </section>

      <section className="border-y border-line bg-surface/50 py-16 md:py-24">
        <div className="shell">
          <SectionHeading
            kicker={t('eventos.pastKicker')}
            title={t('eventos.pastTitle')}
            desc={t('eventos.pastDesc')}
            className="mb-8"
          />

          <Reveal>
            <div className="flex flex-wrap items-center gap-4">
              <Tabs<PastFilter> tabs={tabs} value={pastFilter} onChange={onFilterChange} />
              <span className="text-sm font-semibold text-muted" aria-live="polite">
                {t('eventos.showing', {
                  shown: formatNumber(Math.min(pastVisible, filteredPast.length), locale),
                  total: formatNumber(filteredPast.length, locale),
                })}
              </span>
            </div>
          </Reveal>

          {shownPast.length > 0 ? (
            <StaggerContainer className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {shownPast.map((event) => (
                <StaggerItem key={event.id}>
                  <Card className="flex h-full items-start gap-4 p-5">
                    <DateBlock iso={event.date} locale={locale} size="sm" />
                    <div className="flex min-w-0 flex-1 flex-col gap-2.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <TypeBadge type={event.type} label={t(`eventos.type.${event.type}`)} />
                        <Badge variant="solid">{t('eventos.completed')}</Badge>
                      </div>
                      <h3 className="text-sm font-bold leading-snug text-balance">{tp(event.title)}</h3>
                      <PlaceLine online={event.online} text={tp(event.location)} />
                      <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-1">
                        <span className="text-xs font-semibold text-muted">
                          {formatDate(event.date, locale)}
                        </span>
                        {event.online && youtubeHref ? (
                          <a
                            href={youtubeHref}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-accent-500 transition-colors duration-300 hover:text-accent-600"
                          >
                            <Video className="size-3.5" aria-hidden="true" />
                            {t('eventos.recording')}
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <p className="mt-10 text-muted">{t('eventos.empty')}</p>
          )}

          {hasMorePast ? (
            <div className="mt-10 flex justify-center">
              <Button variant="outline" onClick={() => setPastVisible((prev) => prev + PAGE_SIZE)}>
                {t('common.loadMore')}
              </Button>
            </div>
          ) : null}
        </div>
      </section>

      <section className="shell py-20 md:py-28">
        <Reveal>
          <Card className="grain relative overflow-hidden border-line-strong">
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-500 to-transparent"
              aria-hidden="true"
            />
            <div className="flex flex-col items-start justify-between gap-8 p-8 md:flex-row md:items-center md:p-12">
              <div className="max-w-2xl">
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent-500">
                  {t('eventos.kicker')}
                </span>
                <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-balance md:text-4xl">
                  {t('eventos.ctaTitle')}
                </h2>
                <p className="mt-4 text-ink-soft">{t('eventos.ctaDesc')}</p>
              </div>
              <LinkButton to={`/${locale}/contacto`} variant="primary" size="lg" className="shrink-0">
                {t('eventos.ctaButton')}
                <ArrowRight className="size-4" aria-hidden="true" />
              </LinkButton>
            </div>
          </Card>
        </Reveal>
      </section>
    </>
  );
}
