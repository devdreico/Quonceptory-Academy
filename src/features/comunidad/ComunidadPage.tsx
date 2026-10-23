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
  const { locale, tp } = useLocale();
  const en = locale === 'en';
  useMeta(en ? 'Community — Quonceptory Academy' : 'Comunidad — Quonceptory Academy');
  return (
    <>
      <PageHeader index="04" kicker={en ? 'LEARN TOGETHER' : 'APRENDEMOS EN COMUNIDAD'} title={en ? 'A global community building with AI.' : 'Una comunidad global construyendo con IA.'} desc={en ? 'Connect with practitioners, share what you are building and get thoughtful feedback from people solving similar problems.' : 'Conecta con profesionales, comparte lo que construyes y recibe feedback de personas que resuelven problemas parecidos.'}>
        <LinkButton to={siteConfig.socials.find((social) => social.label === 'Discord')?.href ?? `/${locale}/contacto`} external size="lg">{en ? 'Join the community' : 'Unirme a la comunidad'} <ArrowRight className="size-4" /></LinkButton>
      </PageHeader>
      <section className="shell py-14 md:py-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{stats.slice(0, 4).map((stat) => <Card key={stat.id} className="p-6"><Users className="size-5 text-accent-500" /><p className="mt-4 text-3xl font-extrabold">{formatNumber(stat.value, locale)}{stat.suffix ?? ''}</p><p className="mt-2 text-sm text-muted">{tp(stat.label)}</p></Card>)}</div>
      </section>
      <section className="border-y border-line bg-surface/50">
        <div className="shell py-16 md:py-24">
          <div className="mb-9 flex items-center gap-3"><Globe2 className="size-5 text-accent-500" /><div><p className="text-xs font-bold uppercase tracking-widest text-accent-500">{en ? 'Worldwide' : 'En todo el mundo'}</p><h2 className="mt-1 text-3xl font-extrabold">{en ? 'Learn from different perspectives.' : 'Aprende desde perspectivas distintas.'}</h2></div></div>
          <div className="flex flex-wrap gap-2">{['España', 'México', 'Argentina', 'Colombia', 'Brasil', 'Estados Unidos', 'Reino Unido', 'Alemania', 'India', 'Chile', 'Perú', 'Portugal'].map((country) => <Badge key={country} variant="outline">{country}</Badge>)}</div>
        </div>
      </section>
      <section className="shell py-16 md:py-24">
        <div className="mb-9"><p className="text-xs font-bold uppercase tracking-widest text-accent-500">{en ? 'Member stories' : 'Experiencias de la comunidad'}</p><h2 className="mt-2 text-3xl font-extrabold">{en ? 'Progress is better shared.' : 'El progreso se construye en compañía.'}</h2></div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{testimonials.slice(0, 6).map((item) => <Card key={item.id} className="p-6"><Quote className="size-5 text-accent-500" /><blockquote className="mt-4 text-sm leading-relaxed text-ink-soft">“{tp(item.quote)}”</blockquote><div className="mt-6 border-t border-line pt-4"><p className="font-bold">{item.name}</p><p className="mt-1 text-xs text-muted">{tp(item.role)} · {item.country}</p></div></Card>)}</div>
        <div className="mt-12 rounded-3xl border border-line bg-surface p-8 text-center md:p-12"><p className="text-xs font-bold uppercase tracking-widest text-accent-500">{en ? 'Your next step' : 'Tu siguiente paso'}</p><h2 className="mt-3 text-3xl font-extrabold">{en ? 'Bring a challenge. Leave with a plan.' : 'Trae un reto. Sal con un plan.'}</h2><p className="mx-auto mt-3 max-w-xl text-sm text-muted">{en ? 'Start with an open event or talk to the academy team about a learning path.' : 'Empieza por un evento abierto o habla con el equipo de la academia sobre tu ruta.'}</p><div className="mt-6 flex justify-center gap-3"><LinkButton to={`/${locale}/eventos`}>{en ? 'See events' : 'Ver eventos'}</LinkButton><LinkButton to={`/${locale}/contacto`} variant="outline">{en ? 'Contact us' : 'Contactar'}</LinkButton></div></div>
      </section>
    </>
  );
}
