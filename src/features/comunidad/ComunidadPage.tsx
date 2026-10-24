import { ArrowRight, Globe2, Quote, Users } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { LinkButton } from '@/components/ui/Button';
import { PageHeader } from '@/components/layout/PageHeader';
import { stats, testimonials } from '@/data';
import { siteConfig } from '@/config/site';
import { useLocale } from '@/i18n';
import { formatNumber } from '@/lib/utils';
import { useMeta } from '@/lib/useMeta';

export function ComunidadPage() {
  const { locale, tp, t } = useLocale();
  useMeta(t('comunidad.meta.title'), {
    canonical: `/${locale}/comunidad`,
  });
  return (
    <>
      <PageHeader
        index="04"
        kicker={t('comunidad.kicker')}
        title={t('comunidad.title')}
        desc={t('comunidad.desc')}
      >
        <LinkButton
          to={siteConfig.socials.find((social) => social.label === 'Discord')?.href ?? `/${locale}/contacto`}
          external
          size="lg"
        >
          {t('comunidad.ctaJoin')} <ArrowRight className="size-4" />
        </LinkButton>
      </PageHeader>
      <section className="shell py-14 md:py-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.slice(0, 4).map((stat) => (
            <Card key={stat.id} className="p-6">
              <Users className="text-accent-500 size-5" />
              <p className="mt-4 text-3xl font-extrabold">
                {formatNumber(stat.value, locale)}
                {stat.suffix ?? ''}
              </p>
              <p className="text-muted mt-2 text-sm">{tp(stat.label)}</p>
            </Card>
          ))}
        </div>
      </section>
      <section className="border-line bg-surface/50 border-y">
        <div className="shell py-16 md:py-24">
          <div className="mb-9 flex items-center gap-3">
            <Globe2 className="text-accent-500 size-5" />
            <div>
              <p className="text-accent-500 text-xs font-bold tracking-widest uppercase">
                {t('comunidad.worldwide.kicker')}
              </p>
              <h2 className="mt-1 text-3xl font-extrabold">{t('comunidad.worldwide.title')}</h2>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              'España',
              'México',
              'Argentina',
              'Colombia',
              'Brasil',
              'Estados Unidos',
              'Reino Unido',
              'Alemania',
              'India',
              'Chile',
              'Perú',
              'Portugal',
            ].map((country) => (
              <Badge key={country} variant="outline">
                {country}
              </Badge>
            ))}
          </div>
        </div>
      </section>
      <section className="shell py-16 md:py-24">
        <div className="mb-9">
          <p className="text-accent-500 text-xs font-bold tracking-widest uppercase">
            {t('comunidad.stories.kicker')}
          </p>
          <h2 className="mt-2 text-3xl font-extrabold">{t('comunidad.stories.title')}</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.slice(0, 6).map((item) => (
            <Card key={item.id} className="p-6">
              <Quote className="text-accent-500 size-5" />
              <blockquote className="text-ink-soft mt-4 text-sm leading-relaxed">
                “{tp(item.quote)}”
              </blockquote>
              <div className="border-line mt-6 border-t pt-4">
                <p className="font-bold">{item.name}</p>
                <p className="text-muted mt-1 text-xs">
                  {tp(item.role)} · {item.country}
                </p>
              </div>
            </Card>
          ))}
        </div>
        <div className="border-line bg-surface mt-12 rounded-3xl border p-8 text-center md:p-12">
          <p className="text-accent-500 text-xs font-bold tracking-widest uppercase">
            {t('comunidad.final.kicker')}
          </p>
          <h2 className="mt-3 text-3xl font-extrabold">{t('comunidad.final.title')}</h2>
          <p className="text-muted mx-auto mt-3 max-w-xl text-sm">{t('comunidad.final.desc')}</p>
          <div className="mt-6 flex justify-center gap-3">
            <LinkButton to={`/${locale}/eventos`}>{t('comunidad.final.ctaEvents')}</LinkButton>
            <LinkButton to={`/${locale}/contacto`} variant="outline">
              {t('comunidad.final.ctaContact')}
            </LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}
