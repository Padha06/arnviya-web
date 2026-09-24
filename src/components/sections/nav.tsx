'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Button, PillIcon } from '@/components/ui/button';
import { ArrowUpRight, Leaf } from '@/components/icons';
import { cn } from '@/lib/utils';

const LINKS = [
  { href: '#bestsellers', label: 'Bestsellers' },
  { href: '#collections', label: 'Collections' },
  { href: '#atelier', label: 'The Craft' },
  { href: '#process', label: 'How it works' },
  { href: '#contact', label: 'Contact' },
];

export function Nav() {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          'fixed left-1/2 top-4 z-50 flex w-[min(1280px,calc(100%-1.5rem))] -translate-x-1/2 items-center gap-3',
          'rounded-full border p-2 pl-4 transition-all duration-700',
          'ease-silk',
          stuck
            ? 'border-white/10 bg-forest-950/75 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl'
            : 'border-transparent bg-transparent',
        )}
      >
        <a href="#top" className="flex shrink-0 items-center gap-3" aria-label="Arnviya — home">
          <Leaf className="h-7 w-7 text-gold-500" />
          <span className="leading-none">
            <span className="block font-display text-xl uppercase tracking-[0.16em] text-cream-100">
              Arnviya
            </span>
            <span className="mt-1 hidden text-[0.5rem] uppercase tracking-[0.28em] text-gold-500/80 sm:block">
              Handcrafted Corporate Gifting
            </span>
          </span>
        </a>

        <nav aria-label="Primary" className="ml-auto min-w-0 hidden lg:block">
          {/* flex-wrap: at large text sizes the row can't hold every link on
              one line — they stack inside the pill instead of overflowing it */}
          <ul className="flex flex-wrap items-center justify-end">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-full px-3.5 py-2 text-xs uppercase tracking-[0.12em] text-cream-100/70 transition-colors duration-300 hover:bg-white/[0.06] hover:text-cream-100"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2 lg:ml-0">
          <Button asChild size="sm" variant="primary" className="hidden sm:inline-flex">
            <a href="#quote">
              Request a quote
              <PillIcon>
                <ArrowUpRight className="h-4 w-4" />
              </PillIcon>
            </a>
          </Button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/10 lg:hidden"
          >
            <span
              className={cn(
                'absolute h-px w-4 bg-cream-100 transition-transform duration-500 ease-silk',
                open ? 'rotate-45' : '-translate-y-[3px]',
              )}
            />
            <span
              className={cn(
                'absolute h-px w-4 bg-cream-100 transition-transform duration-500 ease-silk',
                open ? '-rotate-45' : 'translate-y-[3px]',
              )}
            />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-40 grid content-center gap-1 bg-forest-950/95 px-7 pb-12 pt-28 backdrop-blur-2xl lg:hidden"
          >
            {LINKS.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 + i * 0.05, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                className="border-b border-white/[0.08] py-4 font-display text-3xl text-cream-100"
              >
                {l.label}
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.36, duration: 0.6 }}
              className="pt-6"
            >
              <Button asChild variant="primary" className="w-full justify-between">
                <a href="#quote" onClick={() => setOpen(false)}>
                  Request a quote
                  <PillIcon>
                    <ArrowUpRight className="h-4 w-4" />
                  </PillIcon>
                </a>
              </Button>
            </motion.div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </>
  );
}
