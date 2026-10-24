import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

export interface LogoProps {
  size?: number;
  withWordmark?: boolean;
  className?: string;
}

export function Logo({ size = 36, withWordmark = false, className }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <img
        src={siteConfig.logo.src}
        alt={siteConfig.name}
        className="logo-negative shrink-0 object-contain"
        style={{ width: size, height: size }}
      />
      {withWordmark ? <span className="font-extrabold tracking-tight">Quonceptory</span> : null}
    </span>
  );
}
