import { Link } from 'react-router-dom';
import { siteConfig } from '@/config/site';
import { LinkButton } from '@/components/ui/Button';
import { LocaleSwitch } from '@/components/ui/LocaleSwitch';
import { Logo } from '@/components/ui/Logo';
import { SocialIcon } from '@/components/ui/SocialIcon';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useLocale } from '@/i18n';
import { Reveal } from '@/components/ui/Reveal';

const NAV_LINKS = [
  { key: 'nav.ciencia', path: 'ciencia' },
  { key: 'nav.academia', path: 'academia' },
  { key: 'nav.metodo', path: 'metodo' },
  { key: 'nav.herramientas', path: 'herramientas' },
  { key: 'nav.proyectos', path: 'proyectos' },
  { key: 'nav.comunidad', path: 'comunidad' },
  { key: 'nav.eventos', path: 'eventos' },
  { key: 'nav.blog', path: 'blog' },
  { key: 'nav.contacto', path: 'contacto' },
] as const;

const COMMUNITY_LINKS = [
  { key: 'nav.eventos', path: 'eventos' },
  { key: 'nav.blog', path: 'blog' },
  { key: 'nav.comunidad', path: 'comunidad' },
] as const;

export function Footer() {
  const { locale, t } = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="border-line bg-bg border-t">
      <section className="border-line relative overflow-hidden border-b">
        <div className="grid-bg absolute inset-0" aria-hidden="true" />
        <div
          className="bg-glow animate-float-slow pointer-events-none absolute -top-24 right-0 size-80 rounded-full blur-3xl"
          aria-hidden="true"
        />
        <div
          className="bg-glow animate-float pointer-events-none absolute -bottom-32 left-1/4 size-96 rounded-full blur-3xl"
          aria-hidden="true"
        />
        <div className="shell relative py-20 md:py-28">
          <Reveal>
            <span className="border-line bg-glass-bg text-muted inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-bold tracking-[0.18em] uppercase backdrop-blur-md">
              {t('footer.cta')}
            </span>
            <h2 className="mt-5 max-w-3xl text-4xl font-extrabold tracking-tight text-balance md:text-6xl">
              {t('footer.ctaTitle')}
            </h2>
            <p className="text-ink-soft mt-5 max-w-xl">{t('footer.ctaDesc')}</p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <LinkButton to={`/${locale}/contacto`} variant="primary" size="lg">
                {t('footer.ctaButton')}
              </LinkButton>
              <LinkButton to={`/${locale}/academia`} variant="outline" size="lg">
                {t('footer.ctaSecondary')}
              </LinkButton>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="shell py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="max-w-sm">
            <Logo size={48} withWordmark />
            <p className="text-muted mt-5 text-sm leading-relaxed">{t('footer.tagline')}</p>
            <div className="mt-8">
              <h3 className="text-muted text-[11px] font-bold tracking-[0.18em] uppercase">
                {t('footer.follow')}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {siteConfig.socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                      title={social.label}
                      className="glass text-ink-soft hover:text-ink hover:glass-strong inline-flex size-10 items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-0.5"
                    >
                      <SocialIcon name={social.icon} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-muted text-[11px] font-bold tracking-[0.18em] uppercase">
              {t('footer.nav')}
            </h3>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={`/${locale}/${link.path}`}
                    className="text-ink-soft hover:text-accent-500 text-sm transition-colors duration-300"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-muted text-[11px] font-bold tracking-[0.18em] uppercase">
              {t('footer.community')}
            </h3>
            <ul className="mt-4 space-y-2">
              {COMMUNITY_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={`/${locale}/${link.path}`}
                    className="text-ink-soft hover:text-accent-500 text-sm transition-colors duration-300"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to={`/${locale}/login`}
                  className="text-ink-soft hover:text-accent-500 text-sm transition-colors duration-300"
                >
                  {t('nav.login')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-muted text-[11px] font-bold tracking-[0.18em] uppercase">
              {t('footer.contact')}
            </h3>
            <ul className="text-ink-soft mt-4 space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-accent-500 transition-colors duration-300"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-accent-500 transition-colors duration-300"
                >
                  {t('footer.whatsapp')}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.calendly}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-accent-500 transition-colors duration-300"
                >
                  {t('footer.calendly')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-line mt-14 flex flex-col items-start justify-between gap-6 border-t pt-8 sm:flex-row sm:items-center">
          <p className="text-muted text-xs">
            © {year} {siteConfig.fullName[locale]}. {t('footer.rights')}
          </p>
          <div className="flex items-center gap-3">
            <LocaleSwitch />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
