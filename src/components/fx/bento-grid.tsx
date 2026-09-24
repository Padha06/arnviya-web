import { cn } from '@/lib/utils';

/**
 * Asymmetric masonry grid. Adapted from Aceternity UI's BentoGrid (MIT).
 */
export function BentoGrid({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn('mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[19rem] md:grid-cols-6', className)}>
      {children}
    </div>
  );
}

export function BentoGridItem({
  className,
  title,
  description,
  header,
  icon,
  meta,
}: {
  className?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  meta?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        'group/bento row-span-1 flex flex-col justify-between overflow-hidden rounded-3xl',
        'border border-white/[0.08] bg-white/[0.03] p-2 transition-colors duration-500',
        'hover:border-gold-500/30',
        className,
      )}
    >
      <div className="relative flex-1 overflow-hidden rounded-[calc(1.5rem-0.5rem)] bg-forest-800">
        {header}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-950/85 via-forest-950/10 to-transparent" />
      </div>

      <div className="p-4 pt-5 transition-transform duration-500 group-hover/bento:translate-x-1">
        {icon ? <div className="mb-3 text-gold-400 [&>svg]:h-5 [&>svg]:w-5">{icon}</div> : null}
        <div className="font-display text-xl leading-tight text-cream-100">{title}</div>
        <div className="mt-1.5 text-sm leading-relaxed text-cream-100/55">{description}</div>
        {meta ? (
          <div className="mt-3 font-sans text-[0.6875rem] uppercase tracking-[0.16em] text-gold-400">
            {meta}
          </div>
        ) : null}
      </div>
    </div>
  );
}
