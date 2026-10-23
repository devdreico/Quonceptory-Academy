import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useAuth } from '@/auth/AuthProvider';
import { Button, LinkButton } from '@/components/ui/Button';
import { LocaleSwitch } from '@/components/ui/LocaleSwitch';
import { Logo } from '@/components/ui/Logo';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useLocale } from '@/i18n';
import { useScrolled } from '@/lib/hooks';
import { cn } from '@/lib/utils';
import { EASE_OUT_EXPO } from '@/lib/animations';

interface NavChild {
  key: string;
  path: string;
}

interface NavItem {
  key: string;
  path: string;
  children?: readonly NavChild[];
}

const NAV_ITEMS: readonly NavItem[] = [
  {
    key: 'nav.ciencia',
    path: 'ciencia',
    children: [
      { key: 'nav.ciencia.cosmos', path: 'ciencia#cosmos' },
      { key: 'nav.ciencia.vida', path: 'ciencia#vida' },
      { key: 'nav.ciencia.materia', path: 'ciencia#materia' },
    ],
  },
  {
    key: 'nav.academia',
    path: 'academia',
    children: [
      { key: 'nav.academia.plan', path: 'academia' },
      { key: 'nav.metodo', path: 'metodo' },
    ],
  },
  { key: 'nav.herramientas', path: 'herramientas' },
  { key: 'nav.proyectos', path: 'proyectos' },
  { key: 'nav.comunidad', path: 'comunidad' },
  { key: 'nav.eventos', path: 'eventos' },
  { key: 'nav.blog', path: 'blog' },
  { key: 'nav.contacto', path: 'contacto' },
] as const;

const CLOSE_DELAY_MS = 130;

export function Header() {
  const { locale, t } = useLocale();
  const { user } = useAuth();
  const scrolled = useScrolled(16);
  const location = useLocation();
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimer = useRef<number | null>(null);

  const cancelClose = () => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), CLOSE_DELAY_MS);
  };

  useEffect(() => {
    setOpen(false);
    setOpenMenu(null);
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

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenMenu(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => cancelClose, []);

  const accountButton = user ? (
    <LinkButton to={`/${locale}/app`} variant="outline" size="sm" className="hidden xl:inline-flex">
      {t('nav.app')}
    </LinkButton>
  ) : (
    <LinkButton to={`/${locale}/login`} variant="outline" size="sm" className="hidden xl:inline-flex">
      {t('nav.login')}
    </LinkButton>
  );

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 border-b border-line bg-bg/60 backdrop-blur-2xl backdrop-saturate-180 transition-all duration-300',
          scrolled &&
            'bg-bg/80 shadow-[0_1px_0_0_var(--q-glass-line),0_12px_40px_-16px_rgb(0_0_0/0.25)]',
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
            {NAV_ITEMS.map((item) => {
              const hasChildren = Boolean(item.children?.length);
              const isOpen = openMenu === item.path;
              return (
                <div
                  key={item.path}
                  className="relative"
                  onMouseEnter={() => {
                    if (hasChildren) {
                      cancelClose();
                      setOpenMenu(item.path);
                    } else {
                      scheduleClose();
                    }
                  }}
                  onMouseLeave={scheduleClose}
                >
                  <div className="flex items-center">
                    <NavLink
                      to={`/${locale}/${item.path}`}
                      className={({ isActive }) =>
                        cn(
                          'relative px-2.5 py-2 text-[13px] font-medium transition-colors duration-300',
                          isActive ? 'text-ink' : 'text-ink-soft hover:text-ink',
                        )
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {t(item.key)}
                          {isActive ? (
                            <motion.span
                              layoutId="nav-indicator"
                              className="absolute inset-x-2.5 bottom-0 h-0.5 rounded-full bg-accent-500"
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
                    {hasChildren ? (
                      <button
                        type="button"
                        aria-label={`${t(item.key)} ▾`}
                        aria-expanded={isOpen}
                        className="rounded-full p-1 text-muted transition-colors duration-300 hover:text-ink"
                        onClick={() => setOpenMenu(isOpen ? null : item.path)}
                      >
                        <ChevronDown
                          className={cn(
                            'size-3.5 transition-transform duration-300',
                            isOpen && 'rotate-180',
                          )}
                          aria-hidden="true"
                        />
                      </button>
                    ) : null}
                  </div>

                  <AnimatePresence>
                    {hasChildren && isOpen ? (
                      <motion.div
                        initial={reduced ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={reduced ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.98 }}
                        transition={{ duration: reduced ? 0.12 : 0.2, ease: EASE_OUT_EXPO }}
                        className="absolute left-1/2 top-full z-50 mt-2.5 w-60 -translate-x-1/2"
                      >
                        <div className="glass-strong overflow-hidden rounded-2xl p-1.5">
                          {item.children?.map((child) => (
                            <Link
                              key={child.path}
                              to={`/${locale}/${child.path}`}
                              onClick={() => setOpenMenu(null)}
                              className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium text-ink-soft transition-colors duration-200 hover:bg-accent-500/8 hover:text-ink"
                            >
                              <span
                                className="size-1 rounded-full bg-accent-500/60"
                                aria-hidden="true"
                              />
                              {t(child.key)}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
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
            className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-line bg-bg/85 backdrop-blur-2xl lg:hidden"
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
                        'flex items-baseline gap-4 border-b border-line py-4 text-2xl font-extrabold tracking-tight transition-colors duration-300 sm:text-3xl',
                        isActive ? 'text-ink' : 'text-ink-soft hover:text-ink',
                      )
                    }
                  >
                    <span className="text-xs font-bold tracking-[0.2em] text-muted">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {t(item.key)}
                  </NavLink>
                  {item.children?.map((child) => (
                    <Link
                      key={child.path}
                      to={`/${locale}/${child.path}`}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 border-b border-line/60 py-3 pl-10 text-base font-semibold text-ink-soft transition-colors duration-300 hover:text-ink"
                    >
                      <span className="size-1.5 rounded-full bg-accent-500/60" aria-hidden="true" />
                      {t(child.key)}
                    </Link>
                  ))}
                </motion.div>
              ))}

              <motion.div
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reduced ? 0.15 : 0.5,
                  delay: reduced ? 0 : 0.52,
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
