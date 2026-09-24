import { Marquee } from '@/components/fx/marquee';
import { Leaf } from '@/components/icons';
import { USPS } from '@/lib/data';

export function TrustStrip() {
  return (
    <section
      aria-label="What every Arnviya order includes"
      className="border-y border-white/[0.08] bg-forest-900/60"
    >
      <Marquee pauseOnHover className="[--duration:38s] [--gap:3.5rem] py-5">
        {USPS.map((u) => (
          <span
            key={u}
            className="flex items-center gap-3 whitespace-nowrap text-[0.6875rem] uppercase tracking-[0.28em] text-cream-100/55"
          >
            <Leaf className="h-4 w-4 text-gold-500/70" />
            {u}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
