import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full font-sans text-[0.625rem] uppercase tracking-[0.18em]',
  {
    variants: {
      variant: {
        gold: 'bg-gold-500 px-3 py-1 text-forest-950',
        forest: 'bg-forest-700 px-3 py-1 text-cream-100',
        outline: 'border border-gold-500/35 px-3 py-1 text-gold-400',
        muted: 'border border-white/10 px-3 py-1 text-cream-100/60',
      },
    },
    defaultVariants: { variant: 'gold' },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { badgeVariants };
