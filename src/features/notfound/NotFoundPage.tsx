import { LinkButton } from '@/components/ui/Button';
import { PageHeader } from '@/components/layout/PageHeader';
import { useLocale } from '@/i18n';
import { useMeta } from '@/lib/useMeta';

export function NotFoundPage() {
  const { locale } = useLocale();
  const en = locale === 'en';
  useMeta('404 — Quonceptory Academy');
  return <PageHeader index="404" kicker={en ? 'PAGE NOT FOUND' : 'PÁGINA NO ENCONTRADA'} title={en ? 'This route does not exist.' : 'Esta ruta no existe.'} desc={en ? 'The address may be outdated or incorrect. Return home and continue exploring.' : 'Puede que la dirección ya no exista o esté mal escrita. Vuelve al inicio y sigue explorando.'}><LinkButton to={`/${locale}`} size="lg">{en ? 'Go to homepage' : 'Ir al inicio'}</LinkButton></PageHeader>;
}
