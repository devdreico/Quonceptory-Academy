import { motion, useReducedMotion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useT } from '@/i18n';
import { useTheme } from '@/theme/ThemeProvider';
import { cn } from '@/lib/utils';
import { EASE_OUT_EXPO } from '@/lib/animations';

export interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const t = useT();
  const reduced = useReducedMotion();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? t('nav.themeToLight') : t('nav.themeToDark')}
      className={cn(
        'border-line text-ink-soft hover:border-line-strong hover:text-ink grid size-10 shrink-0 place-items-center rounded-full border transition-colors duration-300',
        className,
      )}
    >
      <motion.span
        key={theme}
        initial={reduced ? { opacity: 0 } : { rotate: -100, opacity: 0, scale: 0.5 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ duration: reduced ? 0.2 : 0.45, ease: EASE_OUT_EXPO }}
        className="grid place-items-center"
      >
        {isDark ? (
          <Moon className="size-4" aria-hidden="true" />
        ) : (
          <Sun className="size-4" aria-hidden="true" />
        )}
      </motion.span>
    </button>
  );
}
