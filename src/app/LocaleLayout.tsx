import { useEffect } from 'react';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { isLocale, useLocale } from '@/i18n';

export function LocaleLayout() {
  const { locale } = useParams();
  const { setLocale } = useLocale();

  useEffect(() => {
    if (isLocale(locale)) setLocale(locale);
  }, [locale, setLocale]);

  if (!isLocale(locale)) {
    return <Navigate to="/es" replace />;
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <ScrollToTop />
      <Header />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
