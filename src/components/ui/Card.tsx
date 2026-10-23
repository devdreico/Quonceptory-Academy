import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  group?: boolean;
}

export function Card({ group = false, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-line bg-surface',
        group && 'group',
        className,
      )}
      {...props}
    />
  );
}

export type CardInteractiveProps = HTMLAttributes<HTMLDivElement>;

export function CardInteractive({ className, ...props }: CardInteractiveProps) {
  return (
    <div
      className={cn(
        'cursor-pointer rounded-2xl border border-line bg-surface transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong',
        className,
      )}
      {...props}
    />
  );
}
