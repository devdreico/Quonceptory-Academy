import { useState, type FormEvent } from 'react';
import { ArrowRight, CalendarDays, Mail, MapPin, MessageCircle } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Field, Input, Textarea } from '@/components/ui/Field';
import { buttonVariants } from '@/components/ui/Button';
import { PageHeader } from '@/components/layout/PageHeader';
import { siteConfig } from '@/config/site';
import { useLocale } from '@/i18n';
import { cn } from '@/lib/utils';
import { useMeta } from '@/lib/useMeta';

interface ContactFormData {
  name: string;
  email: string;
  profile: string;
  topic: string;
  message: string;
}

export function ContactoPage() {
  const { locale, t } = useLocale();
  const [draftHref, setDraftHref] = useState('');
  const en = locale === 'en';
  useMeta(t('contacto.metaTitle'), t('contacto.metaDesc'));

  const prepareEmail = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: ContactFormData = {
      name: String(formData.get('name') ?? '').trim(),
      email: String(formData.get('email') ?? '').trim(),
      profile: String(formData.get('profile') ?? ''),
      topic: String(formData.get('topic') ?? ''),
      message: String(formData.get('message') ?? '').trim(),
    };
    const subject = `${en ? 'Website enquiry' : 'Consulta desde la web'}: ${data.topic}`;
    const body = [
      `${en ? 'Name' : 'Nombre'}: ${data.name}`,
      `${en ? 'Email' : 'Correo'}: ${data.email}`,
      `${en ? 'Profile' : 'Perfil'}: ${data.profile}`,
      `${en ? 'Topic' : 'Tema'}: ${data.topic}`,
      '',
      data.message,
    ].join('\n');
    setDraftHref(`mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  return (
    <>
      <PageHeader index="07" kicker={t('contacto.kicker')} title={t('contacto.title')} desc={t('contacto.desc')} />
      <section className="shell grid gap-10 py-12 md:py-16 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="p-6 md:p-8">
          <div className="mb-7"><h2 className="text-2xl font-extrabold">{t('contacto.form.title')}</h2><p className="mt-2 text-sm text-muted">{t('contacto.form.desc')}</p></div>
          {draftHref ? <div className="rounded-2xl border border-accent-500/30 bg-accent-500/5 p-5" role="status"><Badge variant="accent">{t('contacto.form.successTitle')}</Badge><p className="mt-3 text-sm leading-relaxed text-ink-soft">{t('contacto.form.successDesc')}</p><div className="mt-5 flex flex-wrap gap-3"><a href={draftHref} className={cn(buttonVariants(), 'no-underline')}>{en ? 'Open email app' : 'Abrir aplicación de correo'} <ArrowRight className="size-4" /></a><button type="button" onClick={() => setDraftHref('')} className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold hover:border-accent-500">{t('contacto.form.sendAnother')}</button></div></div> : <form onSubmit={prepareEmail} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="contact-name" label={t('contacto.form.name')} required><Input id="contact-name" name="name" autoComplete="name" required maxLength={100} placeholder={t('contacto.form.namePlaceholder')} /></Field>
              <Field id="contact-email" label={t('contacto.form.email')} required><Input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder={t('contacto.form.emailPlaceholder')} /></Field>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="contact-profile" label={t('contacto.form.profile')}><select id="contact-profile" name="profile" defaultValue="" className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink focus:border-accent-500 focus:outline-none"><option value="">{t('contacto.form.profilePlaceholder')}</option>{(['profesional', 'estudiante', 'equipo', 'fundador'] as const).map((item) => <option key={item} value={t(`contacto.form.profile.${item}`)}>{t(`contacto.form.profile.${item}`)}</option>)}</select></Field>
              <Field id="contact-topic" label={t('contacto.form.topic')} required><select id="contact-topic" name="topic" required defaultValue="" className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink focus:border-accent-500 focus:outline-none"><option value="">{t('contacto.form.topicPlaceholder')}</option>{(['formacion', 'consultoria', 'comunidad', 'eventos', 'otro'] as const).map((item) => <option key={item} value={t(`contacto.form.topic.${item}`)}>{t(`contacto.form.topic.${item}`)}</option>)}</select></Field>
            </div>
            <Field id="contact-message" label={t('contacto.form.message')} required><Textarea id="contact-message" name="message" required minLength={10} maxLength={3000} placeholder={t('contacto.form.messagePlaceholder')} /></Field>
            <label className="flex items-start gap-3 text-sm text-ink-soft"><input name="consent" type="checkbox" required className="mt-1 size-4 accent-accent-500" /><span>{t('contacto.form.consent')}</span></label>
            <button type="submit" className={buttonVariants({ size: 'lg' })}><Mail className="size-4" />{t('contacto.form.submit')}</button>
          </form>}
          {!draftHref ? <p className="mt-5 text-xs leading-relaxed text-muted">{en ? 'This demo prepares an email on your device. The message is not sent or stored by this website.' : 'Esta demo prepara un correo en tu dispositivo. Este sitio no envía ni almacena el mensaje.'}</p> : null}
        </Card>
        <div className="space-y-4">
          <Card className="p-6"><div className="flex items-start gap-4"><div className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent-500/10 text-accent-500"><Mail className="size-5" /></div><div><h3 className="font-bold">{t('contacto.cards.email')}</h3><a className="mt-1 inline-block text-sm text-accent-500 hover:underline" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></div></div></Card>
          <Card className="p-6"><div className="flex items-start gap-4"><div className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent-500/10 text-accent-500"><Mail className="size-5" /></div><div><h3 className="font-bold">{t('contacto.cards.admissions')}</h3><p className="mt-1 text-sm text-muted">{t('contacto.cards.admissionsDesc')}</p><a className="mt-2 inline-block text-sm text-accent-500 hover:underline" href={`mailto:${siteConfig.admissionsEmail}`}>{siteConfig.admissionsEmail}</a></div></div></Card>
          <Card className="p-6"><a href={siteConfig.whatsapp} target="_blank" rel="noreferrer" className="flex items-start gap-4"><div className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent-500/10 text-accent-500"><MessageCircle className="size-5" /></div><span><strong className="block">{t('contacto.cards.whatsapp')}</strong><span className="mt-1 block text-sm text-muted">{t('contacto.cards.whatsappDesc')}</span></span></a></Card>
          <Card className="p-6"><a href={siteConfig.calendly} target="_blank" rel="noreferrer" className="flex items-start gap-4"><div className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent-500/10 text-accent-500"><CalendarDays className="size-5" /></div><span><strong className="block">{t('contacto.cards.calendly')}</strong><span className="mt-1 block text-sm text-muted">{t('contacto.cards.calendlyDesc')}</span></span></a></Card>
          <Card className="p-6"><div className="flex items-start gap-4"><div className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent-500/10 text-accent-500"><MapPin className="size-5" /></div><div><h3 className="font-bold">{t('contacto.cards.hq')}</h3><p className="mt-1 text-sm text-muted">{siteConfig.headquarters[locale]}</p><p className="mt-4 text-xs font-bold uppercase tracking-widest text-muted">{t('contacto.cards.hours')}</p><p className="mt-1 text-sm text-ink-soft">{t('contacto.cards.hoursDesc')}</p></div></div></Card>
        </div>
      </section>
    </>
  );
}
