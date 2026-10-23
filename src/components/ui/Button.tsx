import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import type { ComponentProps } from 'react';
import { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'accent-soft';
export type ButtonSize = 'sm' | 'md' | 'lg';

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-accent-500 text-white hover:bg-accent-600',
  outline: 'border border-line-strong hover:border-accent-500 hover:text-accent-500',
  ghost: 'hover:bg-surface-2',
  'accent-soft': 'bg-accent-500/10 text-accent-500 hover:bg-accent-500/20',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-sm',
  lg: 'h-13 px-8 text-base',
};

const BASE_CLASSES =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-300 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50';

export function buttonVariants(opts?: { variant?: ButtonVariant; size?: ButtonSize }): string {
  const variant = opts?.variant ?? 'primary';
  const size = opts?.size ?? 'md';
  return cn(BASE_CLASSES, VARIANT_CLASSES[variant], SIZE_CLASSES[size]);
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant,
    size,
    loading = false,
    disabled,
    className,
    children,
    type = 'button',
    ...props
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        buttonVariants({ variant, size }),
        loading && 'pointer-events-none opacity-80',
        className,
      )}
      {...props}
    >
      {loading ? <Loader2 className="size-4 shrink-0 animate-spin" aria-hidden="true" /> : null}
      {children}
    </button>
  );
});

export interface LinkButtonProps
  extends Omit<ComponentProps<typeof Link>, 'className' | 'to'> {
  to: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  external?: boolean;
  loading?: boolean;
  className?: string;
  children?: ReactNode;
}

export function LinkButton({
  to,
  variant,
  size,
  external = false,
  loading = false,
  className,
  children,
  onClick,
  ...props
}: LinkButtonProps) {
  const classes = cn(
    buttonVariants({ variant, size }),
    loading && 'pointer-events-none opacity-80',
    className,
  );
  const spinner = loading ? (
    <Loader2 className="size-4 shrink-0 animate-spin" aria-hidden="true" />
  ) : null;

  if (external) {
    return (
      <a
        href={to}
        target="_blank"
        rel="noreferrer"
        onClick={onClick}
        className={classes}
        aria-busy={loading || undefined}
      >
        {spinner}
        {children}
      </a>
    );
  }

  return (
    <Link to={to} onClick={onClick} className={classes} aria-busy={loading || undefined} {...props}>
      {spinner}
      {children}
    </Link>
  );
}
