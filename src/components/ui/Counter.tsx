import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { useLocale } from '@/i18n';
import { formatNumber } from '@/lib/utils';

export interface CounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function Counter({ value, suffix = '', prefix = '', duration = 1.8, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduced = useReducedMotion();
  const { locale } = useLocale();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(value);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const totalMs = Math.max(duration, 0.1) * 1000;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / totalMs, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplay(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatNumber(display, locale)}
      {suffix}
    </span>
  );
}
