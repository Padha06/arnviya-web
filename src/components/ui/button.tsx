import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  [
    'group inline-flex items-center justify-center gap-3 whitespace-normal rounded-full text-left sm:whitespace-nowrap sm:text-center',
    'font-sans text-[0.8125rem] uppercase tracking-[0.14em]',
    'transition-[transform,background-color,color,box-shadow,border-color] duration-500',
    'ease-silk',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2',
    'focus-visible:ring-offset-forest-950 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
  ].join(' '),
  {
    variants: {
      variant: {
        primary:
          'bg-gold-500 pl-6 pr-2 py-2 text-forest-950 shadow-[0_14px_34px_-16px_rgba(198,161,91,0.75)] hover:bg-gold-400 hover:-translate-y-0.5',
        outline:
          'border border-gold-500/35 px-6 py-3 text-cream-100 hover:bg-white/[0.06] hover:-translate-y-0.5',
        dark:
          'border border-white/10 bg-white/[0.05] px-6 py-3 text-cream-100 hover:bg-white/[0.1] hover:-translate-y-0.5',
        ghost: 'px-4 py-2 text-cream-100/75 hover:text-cream-100',
        link: 'p-0 text-gold-400 normal-case tracking-normal underline-offset-4 hover:underline',
      },
      size: {
        default: 'min-h-[3rem]',
        sm: 'min-h-[2.5rem] text-[0.6875rem] tracking-[0.12em]',
        lg: 'min-h-[3.5rem]',
        icon: 'h-11 w-11 p-0',
      },
    },
    defaultVariants: { variant: 'primary', size: 'default' },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = 'Button';

/** The nested "button-in-button" trailing icon disc. */
export function PillIcon({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'grid h-8 w-8 shrink-0 place-items-center rounded-full bg-black/15',
        'transition-transform duration-500 ease-silk',
        'group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-105',
        className,
      )}
      aria-hidden
    >
      {children}
    </span>
  );
}

export { Button, buttonVariants };
