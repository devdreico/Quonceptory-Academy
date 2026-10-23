import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type BadgeVariant = 'neutral' | 'accent' | 'outline' | 'solid';

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  neutral: 'bg-surface-2/80 text-ink-soft backdrop-blur-md',
  accent: 'bg-accent-500/10 text-accent-500 backdrop-blur-md',
  outline: 'glass text-ink-soft',
  solid: 'bg-ink text-bg',
};

export interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({ children, variant = 'neutral', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider',
        VARIANT_CLASSES[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
