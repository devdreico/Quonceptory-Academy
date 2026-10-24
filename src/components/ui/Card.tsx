import { useRef, useState, type HTMLAttributes, type MouseEvent } from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  group?: boolean;
}

export function Card({ group = false, className, ...props }: CardProps) {
  return (
    <div
      className={cn('glass rounded-3xl transition-colors duration-300', group && 'group', className)}
      {...props}
    />
  );
}

export type CardInteractiveProps = HTMLAttributes<HTMLDivElement>;

export function CardInteractive({ className, ...props }: CardInteractiveProps) {
  return (
    <div
      className={cn(
        'glass hover:glass-strong cursor-pointer rounded-3xl transition-all duration-500 ease-out hover:-translate-y-1',
        className,
      )}
      {...props}
    />
  );
}

export interface SpotlightCardProps extends HTMLAttributes<HTMLDivElement> {
  spotlightSize?: number;
}

export function SpotlightCard({ className, spotlightSize = 420, children, ...props }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0, active: false });

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: event.clientX - rect.left, y: event.clientY - rect.top, active: true });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setPos((prev) => ({ ...prev, active: false }))}
      className={cn(
        'glass group hover:glass-strong relative overflow-hidden rounded-3xl transition-all duration-500 ease-out hover:-translate-y-1',
        className,
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: pos.active ? 1 : 0,
          background: `radial-gradient(${spotlightSize}px circle at ${pos.x}px ${pos.y}px, var(--q-spot), transparent 65%)`,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
