import { Navigate, useLocation } from 'react-router-dom';
import { detectLocale } from '@/i18n';

export function RootRedirect() {
  const location = useLocation();
  const locale = detectLocale();
  return <Navigate to={`/${locale}${location.pathname === '/' ? '' : location.pathname}`} replace />;
}
