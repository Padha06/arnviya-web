'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { BackgroundBeams } from '@/components/fx/background-beams';
import { Spotlight } from '@/components/fx/spotlight';
import { TextShimmer } from '@/components/fx/text-shimmer';
import { NumberTicker } from '@/components/fx/number-ticker';
import { Button, PillIcon } from '@/components/ui/button';
import { ArrowRight, ArrowUpRight, Shield } from '@/components/icons';
import { STATS } from '@/lib/data';

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden">
      {/* deep radial wash */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(120%_90%_at_15%_10%,#143024_0%,#0F2118_45%,#0A170F_100%)]"
      />

      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="#C6A15B" opacity={0.14} />
      <BackgroundBeams className="opacity-[0.55]" />

      <div className="container relative z-10 grid min-h-[100svh] items-center gap-14 pb-20 pt-36 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pt-32">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="eyebrow"
          >
            Corporate Gifting · 2026
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 max-w-[19ch] text-[clamp(2.75rem,6.4vw,5.25rem)] leading-[1.02]"
          >
            Gifts rooted in <TextShimmer className="italic">nature&rsquo;s</TextShimmer> quiet
            beauty.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 max-w-[48ch] text-[clamp(1rem,1.25vw,1.125rem)] leading-relaxed text-cream-100/65"
          >
            Hand-poured resin keepsakes with real pressed botanicals and gold foil — for onboarding
            kits, client appreciation, possession days and festive hampers. Made by hand in Vadodara,
            delivered across India.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          >
            <Button asChild>
              <a href="#quote">
                Request custom quote
                <PillIcon>
                  <ArrowUpRight className="h-4 w-4" />
                </PillIcon>
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href="#collections">
                Explore collections
                <PillIcon className="bg-white/[0.08]">
                  <ArrowRight className="h-4 w-4" />
                </PillIcon>
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/[0.09] pt-8 sm:grid-cols-4"
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="font-display text-[clamp(1.5rem,2.6vw,2.125rem)] leading-none text-cream-100">
                  <NumberTicker value={s.value} />
                  {s.suffix}
                </div>
                <div className="mt-2.5 text-[0.6875rem] uppercase leading-snug tracking-[0.16em] text-cream-100/45">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* floating product stack */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[30rem] lg:max-w-none"
        >
          <div className="bezel">
            <div className="bezel-core">
              <Image
                src="/images/wallclock-butterfly.jpg"
                alt="Botanical wall clock with pressed flowers and a gold butterfly"
                width={1241}
                height={1366}
                priority
                sizes="(max-width: 1024px) 90vw, 560px"
                className="h-auto w-full object-cover"
              />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: -20, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -bottom-6 -left-3 w-[13.5rem] sm:-left-8"
          >
            <div className="bezel backdrop-blur-xl">
              <div className="bezel-core flex items-center gap-3 px-4 py-3.5">
                <Shield className="h-5 w-5 shrink-0 text-gold-400" />
                <span className="text-[0.6875rem] uppercase leading-snug tracking-[0.12em] text-cream-100/75">
                  GST invoiced · PO &amp; Net-30 accepted
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* bottom fade into the page */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-forest-950"
      />
    </section>
  );
}
