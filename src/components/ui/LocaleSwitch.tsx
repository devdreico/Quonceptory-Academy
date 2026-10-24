import { useLocation, useNavigate } from 'react-router-dom';
import type { Locale } from '@/data/types';
import { LOCALES, useLocale } from '@/i18n';
import { cn } from '@/lib/utils';

export interface LocaleSwitchProps {
  className?: string;
}

export function LocaleSwitch({ className }: LocaleSwitchProps) {
  const { locale, setLocale, otherLocalePath, t } = useLocale();
  const location = useLocation();
  const navigate = useNavigate();

  const switchTo = (next: Locale) => {
    if (next === locale) return;
    const newPath = otherLocalePath(location.pathname + location.search);
    setLocale(next);
    navigate(newPath, { replace: true });
  };

  return (
    <div
      role="group"
      aria-label={t('nav.language')}
      className={cn('glass inline-flex shrink-0 items-center rounded-full p-0.5', className)}
    >
      {LOCALES.map((code) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            onClick={() => switchTo(code)}
            aria-pressed={active}
            className={cn(
              'rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase transition-colors duration-300',
              active ? 'bg-pill text-pill-ink' : 'text-muted hover:text-ink',
            )}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
}
