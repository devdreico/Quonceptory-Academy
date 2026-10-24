import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

const FIELD_CLASSES =
  'w-full rounded-2xl border border-line bg-glass-bg backdrop-blur-xl px-4 py-3 text-sm text-ink placeholder:text-muted transition-all duration-300 focus:border-accent-500 focus:outline-none';

export interface FieldProps {
  label: string;
  id: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}

export function Field({ label, id, error, hint, required = false, children, className }: FieldProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <label htmlFor={id} className="text-muted block text-[11px] font-bold tracking-wider uppercase">
        {label}
        {required ? <span className="text-accent-500 ml-1">*</span> : null}
      </label>
      {children}
      {hint && !error ? <p className="text-muted text-xs">{hint}</p> : null}
      {error ? <p className="text-xs font-medium text-red-500">{error}</p> : null}
    </div>
  );
}

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return <input className={cn(FIELD_CLASSES, className)} {...props} />;
}

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className, rows = 5, ...props }: TextareaProps) {
  return <textarea rows={rows} className={cn(FIELD_CLASSES, 'resize-y', className)} {...props} />;
}
