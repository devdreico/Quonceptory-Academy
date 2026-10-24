import { useEffect } from 'react';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { isLocale, useLocale } from '@/i18n';

export function LocaleLayout() {
  const { locale } = useParams();
  const { setLocale, t } = useLocale();

  useEffect(() => {
    if (isLocale(locale)) setLocale(locale);
  }, [locale, setLocale]);

  if (!isLocale(locale)) {
    return <Navigate to="/es" replace />;
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <ScrollToTop />
      <a
        href="#main"
        className="focus:bg-accent-600 sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
      >
        {t('a11y.skip')}
      </a>
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="bg-glow animate-float-slow absolute -top-48 -left-32 size-[42rem] rounded-full blur-3xl" />
        <div className="bg-glow animate-float absolute top-1/3 -right-48 size-[36rem] rounded-full blur-3xl" />
        <div className="bg-glow-strong animate-float-slow absolute -bottom-56 left-1/4 size-[40rem] rounded-full blur-3xl" />
      </div>
      <Header />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
