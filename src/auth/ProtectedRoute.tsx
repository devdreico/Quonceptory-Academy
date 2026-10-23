import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { useLocale } from '@/i18n';

export function ProtectedRoute() {
  const { user } = useAuth();
  const { locale } = useLocale();
  const location = useLocation();

  if (!user) {
    return <Navigate to={`/${locale}/login`} replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
