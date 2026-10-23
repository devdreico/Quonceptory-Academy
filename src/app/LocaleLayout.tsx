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
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-48 -left-32 size-[42rem] rounded-full bg-glow blur-3xl animate-float-slow" />
        <div className="absolute top-1/3 -right-48 size-[36rem] rounded-full bg-glow blur-3xl animate-float" />
        <div className="absolute -bottom-56 left-1/4 size-[40rem] rounded-full bg-glow-strong blur-3xl animate-float-slow" />
      </div>
      <Header />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
