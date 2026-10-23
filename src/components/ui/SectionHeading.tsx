import { cn } from '@/lib/utils';

export interface SectionHeadingProps {
  index?: string;
  kicker?: string;
  title: string;
  desc?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  index,
  kicker,
  title,
  desc,
  align = 'left',
  className,
}: SectionHeadingProps) {
  const centered = align === 'center';

  return (
    <div className={cn('border-t border-line pt-8', centered && 'text-center', className)}>
      {index || kicker ? (
        <div className={cn('flex items-baseline gap-3', centered && 'justify-center')}>
          {index ? (
            <span className="text-xs font-bold tracking-[0.2em] text-accent-500">{index}</span>
          ) : null}
          {kicker ? (
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted">
              {kicker}
            </span>
          ) : null}
        </div>
      ) : null}
      <h2
        className={cn(
          'mt-4 text-3xl font-extrabold tracking-tight text-balance md:text-5xl',
          centered && 'mx-auto max-w-3xl',
        )}
      >
        {title}
      </h2>
      {desc ? (
        <p className={cn('mt-4 text-ink-soft', centered ? 'mx-auto max-w-2xl' : 'max-w-2xl')}>
          {desc}
        </p>
      ) : null}
    </div>
  );
}
