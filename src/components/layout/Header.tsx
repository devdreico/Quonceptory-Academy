import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/auth/AuthProvider';
import { Button, LinkButton } from '@/components/ui/Button';
import { LocaleSwitch } from '@/components/ui/LocaleSwitch';
import { Logo } from '@/components/ui/Logo';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useLocale } from '@/i18n';
import { useScrolled } from '@/lib/hooks';
import { cn } from '@/lib/utils';
import { EASE_OUT_EXPO } from '@/lib/animations';

const NAV_ITEMS = [
  { key: 'nav.academia', path: 'academia' },
  { key: 'nav.herramientas', path: 'herramientas' },
  { key: 'nav.proyectos', path: 'proyectos' },
  { key: 'nav.comunidad', path: 'comunidad' },
  { key: 'nav.eventos', path: 'eventos' },
  { key: 'nav.blog', path: 'blog' },
  { key: 'nav.contacto', path: 'contacto' },
] as const;

export function Header() {
  const { locale, t } = useLocale();
  const { user } = useAuth();
  const scrolled = useScrolled(16);
  const location = useLocation();
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const accountButton = user ? (
    <LinkButton to={`/${locale}/app`} variant="outline" size="sm" className="hidden lg:inline-flex">
      {t('nav.app')}
    </LinkButton>
  ) : (
    <LinkButton to={`/${locale}/login`} variant="outline" size="sm" className="hidden lg:inline-flex">
      {t('nav.login')}
    </LinkButton>
  );

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-xl transition-shadow duration-300',
          scrolled && 'shadow-[0_1px_0_0_var(--q-line),0_8px_30px_-12px_rgb(0_0_0/0.35)]',
        )}
      >
        <div className="shell flex h-16 items-center justify-between gap-4 md:h-18">
          <Link
            to={`/${locale}`}
            className="flex shrink-0 items-center gap-2.5"
            aria-label={t('nav.home')}
          >
            <Logo size={36} />
            <span className="hidden text-sm font-extrabold tracking-tight sm:inline">
              Quonceptory
            </span>
          </Link>

          <nav className="hidden items-center lg:flex" aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={`/${locale}/${item.path}`}
                className={({ isActive }) =>
                  cn(
                    'relative px-3 py-2 text-sm font-medium transition-colors duration-300',
                    isActive ? 'text-accent-500' : 'text-ink-soft hover:text-ink',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {t(item.key)}
                    {isActive ? (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-x-2.5 bottom-0 h-px bg-accent-500"
                        transition={
                          reduced
                            ? { duration: 0 }
                            : { type: 'spring', bounce: 0.15, duration: 0.6 }
                        }
                      />
                    ) : null}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LocaleSwitch className="hidden sm:inline-flex" />
            <ThemeToggle />
            {accountButton}
            <Button
              variant="ghost"
              size="sm"
              className="size-10 px-0 lg:hidden"
              aria-label={open ? t('nav.menuClose') : t('nav.menuOpen')}
              aria-expanded={open}
              onClick={() => setOpen((prev) => !prev)}
            >
              {open ? (
                <X className="size-5" aria-hidden="true" />
              ) : (
                <Menu className="size-5" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="mobile-menu"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: reduced ? 0.15 : 0.4, ease: EASE_OUT_EXPO }}
            className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-line bg-bg/95 backdrop-blur-xl lg:hidden"
          >
            <nav className="shell flex flex-col py-8" aria-label="Mobile">
              {NAV_ITEMS.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: reduced ? 0.15 : 0.5,
                    delay: reduced ? 0 : 0.06 + index * 0.05,
                    ease: EASE_OUT_EXPO,
                  }}
                >
                  <NavLink
                    to={`/${locale}/${item.path}`}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'flex items-baseline gap-4 border-b border-line py-4 text-3xl font-extrabold tracking-tight transition-colors duration-300',
                        isActive ? 'text-accent-500' : 'text-ink hover:text-accent-500',
                      )
                    }
                  >
                    <span className="text-xs font-bold tracking-[0.2em] text-muted">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {t(item.key)}
                  </NavLink>
                </motion.div>
              ))}

              <motion.div
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reduced ? 0.15 : 0.5,
                  delay: reduced ? 0 : 0.42,
                  ease: EASE_OUT_EXPO,
                }}
                className="mt-8 flex flex-col gap-4"
              >
                <div className="flex items-center gap-3">
                  <LocaleSwitch />
                  <ThemeToggle />
                </div>
                <LinkButton
                  to={user ? `/${locale}/app` : `/${locale}/login`}
                  variant="primary"
                  size="lg"
                  onClick={() => setOpen(false)}
                >
                  {user ? t('nav.app') : t('nav.login')}
                </LinkButton>
              </motion.div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
