import { motion, useReducedMotion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TabItem<T extends string> {
  id: T;
  label: string;
  icon?: LucideIcon;
}

export interface TabsProps<T extends string> {
  tabs: TabItem<T>[];
  value: T;
  onChange: (id: T) => void;
  className?: string;
}

export function Tabs<T extends string>({ tabs, value, onChange, className }: TabsProps<T>) {
  const reduced = useReducedMotion();

  return (
    <div
      role="tablist"
      className={cn(
        'glass inline-flex flex-wrap items-center gap-1 rounded-full p-1',
        className,
      )}
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const active = tab.id === value;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(tab.id)}
            className={cn(
              'relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300',
              active ? 'text-pill-ink' : 'text-ink-soft hover:text-ink',
            )}
          >
            {active ? (
              <motion.span
                layoutId="tab-indicator"
                className="absolute inset-0 rounded-full bg-pill shadow-[0_2px_10px_rgb(0_0_0/0.18)]"
                transition={
                  reduced ? { duration: 0 } : { type: 'spring', bounce: 0.2, duration: 0.55 }
                }
              />
            ) : null}
            <span className="relative z-10 inline-flex items-center gap-2">
              {Icon ? <Icon className="size-4" aria-hidden="true" /> : null}
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
