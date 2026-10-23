import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface MarqueeProps {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  className?: string;
  gap?: string;
}

export function Marquee({
  children,
  duration = 40,
  reverse = false,
  className,
  gap = 'gap-10',
}: MarqueeProps) {
  const trackStyle = {
    '--marquee-duration': `${duration}s`,
    animationDirection: reverse ? 'reverse' : 'normal',
  } as CSSProperties;

  return (
    <div className={cn('overflow-hidden', className)}>
      <div className={cn('marquee-track', gap)} style={trackStyle}>
        <div className={cn('flex shrink-0 items-center', gap)}>{children}</div>
        <div className={cn('flex shrink-0 items-center', gap)} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
