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
    <div className={cn('border-line border-t pt-8', centered && 'text-center', className)}>
      {index || kicker ? (
        <div className={cn('flex items-baseline gap-3', centered && 'justify-center')}>
          {index ? <span className="text-accent-500 text-xs font-bold tracking-[0.2em]">{index}</span> : null}
          {kicker ? (
            <span className="text-muted text-[11px] font-bold tracking-[0.18em] uppercase">{kicker}</span>
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
        <p className={cn('text-ink-soft mt-4', centered ? 'mx-auto max-w-2xl' : 'max-w-2xl')}>{desc}</p>
      ) : null}
    </div>
  );
}
