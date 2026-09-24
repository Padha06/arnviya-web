import { cn } from '@/lib/utils';

type TextShimmerProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Gold light travelling across a word. Adapted from Magic UI's TextShimmer (MIT),
 * simplified to a background-position sweep so it works without JS.
 */
export function TextShimmer({ children, className }: TextShimmerProps) {
  return (
    <span
      className={cn(
        'inline-block animate-shimmer bg-clip-text text-transparent',
        /* reduced motion: animation none (globals) leaves the static gold gradient */
        className,
      )}
      style={
        {
          backgroundImage:
            'linear-gradient(100deg, #C6A15B 0%, #C6A15B 38%, #FBF6E9 50%, #C6A15B 62%, #C6A15B 100%)',
          backgroundSize: '200% 100%',
        } as React.CSSProperties
      }
    >
      {children}
    </span>
  );
}
