import { Leaf } from '@/components/icons';

const COLS = [
  {
    title: 'Collections',
    links: [
      { label: 'Bestsellers', href: '#bestsellers' },
      { label: 'Corporate kits', href: '#collections' },
      { label: 'Personal keepsakes', href: '#collections' },
      { label: 'The craft', href: '#atelier' },
    ],
  },
  {
    title: 'For buyers',
    links: [
      { label: 'Build a quote', href: '#quote' },
      { label: 'How it works', href: '#process' },
      { label: 'Request a sample', href: '#contact' },
      { label: 'Vendor onboarding', href: '#contact' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-forest-950">
      <div className="container py-16">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3">
              <Leaf className="h-7 w-7 text-gold-500" />
              <span className="font-display text-xl uppercase tracking-[0.16em] text-cream-100">
                Arnviya
              </span>
            </div>
            <p className="mt-5 max-w-[32ch] text-sm leading-relaxed text-cream-100/55">
              Born from the heart of the forest. Handcrafted resin gifts with real botanicals, made
              in Vadodara, delivered across India.
            </p>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <h3 className="font-sans text-[0.625rem] uppercase tracking-[0.2em] text-gold-400">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3 text-sm">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-cream-100/60 transition-colors duration-300 hover:text-cream-100"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="font-sans text-[0.625rem] uppercase tracking-[0.2em] text-gold-400">
              Contact
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-cream-100/60">
              <li>
                <a
                  href="mailto:hello@arnviya.com"
                  className="transition-colors duration-300 hover:text-cream-100"
                >
                  hello@arnviya.com
                </a>
              </li>
              <li>Vadodara, Gujarat, India</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/[0.08] pt-6 text-xs text-cream-100/55 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Arnviya. Handcrafted with love and nature.</span>
          <span>Nature never goes out of style — and neither will your gift.</span>
        </div>
      </div>
    </footer>
  );
}
