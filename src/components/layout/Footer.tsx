import { Link } from 'react-router-dom';
import { siteConfig } from '@/config/site';
import { LinkButton } from '@/components/ui/Button';
import { LocaleSwitch } from '@/components/ui/LocaleSwitch';
import { Logo } from '@/components/ui/Logo';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useLocale } from '@/i18n';
import { Reveal } from '@/components/ui/Reveal';

const NAV_LINKS = [
  { key: 'nav.academia', path: 'academia' },
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
    <footer className="border-t border-line bg-bg">
      <section className="grain relative overflow-hidden border-b border-line">
        <div className="grid-bg absolute inset-0" aria-hidden="true" />
        <div className="shell relative py-20 md:py-28">
          <Reveal>
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted">
              {t('footer.cta')}
            </span>
            <h2 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-balance md:text-6xl">
              {t('footer.ctaTitle')}
            </h2>
            <p className="mt-5 max-w-xl text-ink-soft">{t('footer.ctaDesc')}</p>
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
            <p className="mt-5 text-sm leading-relaxed text-muted">{t('footer.tagline')}</p>
            <div className="mt-8">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted">
                {t('footer.follow')}
              </h3>
              <ul className="mt-4 space-y-2">
                {siteConfig.socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-ink-soft transition-colors duration-300 hover:text-accent-500"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted">
              {t('footer.nav')}
            </h3>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={`/${locale}/${link.path}`}
                    className="text-sm text-ink-soft transition-colors duration-300 hover:text-accent-500"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted">
              {t('footer.community')}
            </h3>
            <ul className="mt-4 space-y-2">
              {COMMUNITY_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={`/${locale}/${link.path}`}
                    className="text-sm text-ink-soft transition-colors duration-300 hover:text-accent-500"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to={`/${locale}/login`}
                  className="text-sm text-ink-soft transition-colors duration-300 hover:text-accent-500"
                >
                  {t('nav.login')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted">
              {t('footer.contact')}
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-ink-soft">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="transition-colors duration-300 hover:text-accent-500"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors duration-300 hover:text-accent-500"
                >
                  {t('footer.whatsapp')}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.calendly}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors duration-300 hover:text-accent-500"
                >
                  {t('footer.calendly')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-line pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-muted">
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
