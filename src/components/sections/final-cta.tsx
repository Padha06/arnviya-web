'use client';

import { useEffect, useRef, useState } from 'react';
import { BlurFade } from '@/components/fx/blur-fade';
import { Button, PillIcon } from '@/components/ui/button';
import { Input, Textarea } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowUpRight, Check } from '@/components/icons';
import { inr } from '@/lib/utils';
import { useQuote } from './quote-context';

const OCCASIONS = [
  'Employee onboarding',
  'Client appreciation',
  'Festive / Diwali',
  'Possession day',
  'Doctor / clinic appreciation',
  'Event or conference',
  'Milestone or award',
];

const GSTIN_PATTERN = '[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]';
const PHONE_PATTERN = '[\\+0-9][0-9\\+\\(\\)\\- ]{6,15}';

export function FinalCta() {
  const { lines, total, totalQty, gst, summaryText } = useQuote();
  const [sent, setSent] = useState(false);
  const [gstin, setGstin] = useState('');
  const deadlineRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = deadlineRef.current;
    if (!el) return;
    const d = new Date();
    const pad = (n: number) => String(n).padStart(2, '0');
    el.min = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const body = [
      'Corporate gifting enquiry — Arnviya',
      '',
      `Company: ${data.get('company') || ''}`,
      `Contact: ${data.get('name') || ''}`,
      `Email: ${data.get('email') || ''}`,
      `Phone: ${data.get('phone') || ''}`,
      `Occasion: ${data.get('occasion') || ''}`,
      `Required by: ${data.get('deadline') || ''}`,
      `GSTIN: ${data.get('gstin') || ''}`,
      '',
      'Selection:',
      summaryText,
      '',
      lines.length
        ? `Indicative total: ${inr(total)} for ${totalQty} pieces${gst ? ' (incl. GST)' : ' (excl. GST)'}`
        : '',
      '',
      `Notes: ${data.get('notes') || ''}`,
    ]
      .filter(Boolean)
      .join('\n');

    setSent(true);
    window.location.href = `mailto:hello@arnviya.com?subject=${encodeURIComponent(
      `Corporate gifting quote — ${data.get('company') || 'your company'}`,
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section
      id="contact"
      className="section container"
      data-note="One form and one email address. The quote selection is carried straight into the brief, so no buyer is ever lost for want of a way to reach you. The WhatsApp row appears here once the real number is supplied."
      data-note-impact="Captures every intent signal"
    >
      <div className="grid gap-16 [&>*]:min-w-0 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <BlurFade inView>
          <p className="eyebrow">Get in touch</p>
          <h2 className="mt-6 max-w-[18ch] text-[clamp(2rem,4vw,3.25rem)]">
            Let&rsquo;s create something <span className="italic text-gold-400">beautiful</span>{' '}
            together.
          </h2>
          <p className="mt-6 max-w-[46ch] text-cream-100/60">
            Tell us the occasion, the quantity and the date. You&rsquo;ll have a formal quotation, a
            digital mock-up with your logo, and a confirmed production window within 24 hours — no
            deposit until you approve the mock-up.
          </p>

          <div className="mt-10 space-y-4">
            <a
              href="mailto:hello@arnviya.com"
              className="flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 transition-colors duration-500 hover:border-gold-500/40"
            >
              <ArrowUpRight className="h-6 w-6 shrink-0 text-gold-400" />
              <span>
                <span className="block text-sm text-cream-100">hello@arnviya.com</span>
                <span className="block text-xs text-cream-100/60">
                  Attach your logo and we&rsquo;ll mock it up
                </span>
              </span>
            </a>
          </div>

          <ul className="mt-10 space-y-3 text-sm text-cream-100/60">
            {[
              'GST invoice, PO and Net-30 supported',
              'Breakage replaced free — photographed on arrival',
              'Pan-India delivery, to one address or to every home',
            ].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                {t}
              </li>
            ))}
          </ul>
        </BlurFade>

        <BlurFade inView delay={0.1}>
          <div className="bezel">
            <div className="bezel-core p-7 sm:p-9">
              <form onSubmit={handleSubmit} className="grid gap-5">
                <div role="status" aria-live="polite">
                  {lines.length > 0 ? (
                    <div className="rounded-2xl border border-gold-500/25 bg-gold-500/[0.06] p-5">
                      <p className="text-[0.625rem] uppercase tracking-[0.2em] text-gold-400">
                        Attached from the quote builder
                      </p>
                      <div className="mt-3 space-y-1.5">
                        {lines.map((l) => (
                          <div
                            key={l.id}
                            className="flex justify-between gap-4 text-sm text-cream-100/80"
                          >
                            <span>
                              {l.name} <span className="text-cream-100/55">× {l.qty}</span>
                            </span>
                            <span className="tabular-nums">{inr(l.line)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 flex justify-between border-t border-gold-500/20 pt-3 font-display text-xl text-cream-100">
                        <span>Indicative total</span>
                        <span className="tabular-nums">{inr(total)}</span>
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    name="company"
                    required
                    maxLength={120}
                    autoComplete="organization"
                    placeholder="Your organisation"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="name">Your name</Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    maxLength={80}
                    autoComplete="name"
                    placeholder="Full name"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Work email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      maxLength={120}
                      autoComplete="email"
                      placeholder="name@company.com"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone / WhatsApp</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      maxLength={16}
                      pattern={PHONE_PATTERN}
                      placeholder="+91"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="occasion">Occasion</Label>
                    <Select name="occasion" defaultValue={OCCASIONS[0]}>
                      <SelectTrigger id="occasion">
                        <SelectValue placeholder="Choose an occasion" />
                      </SelectTrigger>
                      <SelectContent>
                        {OCCASIONS.map((o) => (
                          <SelectItem key={o} value={o}>
                            {o}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="deadline">Required by</Label>
                    <Input id="deadline" name="deadline" type="date" ref={deadlineRef} />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="gstin">GSTIN (optional — for the invoice)</Label>
                  <Input
                    id="gstin"
                    name="gstin"
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value.toUpperCase())}
                    maxLength={15}
                    pattern={GSTIN_PATTERN}
                    autoCapitalize="characters"
                    spellCheck={false}
                    aria-describedby="gstin-hint"
                    placeholder="24AABCU9603R1ZM"
                  />
                  <p id="gstin-hint" className="text-xs text-cream-100/55">
                    15 characters — 2-digit state code, PAN, entity number, then Z and a checksum.
                  </p>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="notes">Anything else?</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    maxLength={800}
                    placeholder="Brand colours, logo file, delivery cities, budget ceiling…"
                  />
                </div>

                <Button type="submit" className="justify-between">
                  Request my quote
                  <PillIcon>
                    <ArrowUpRight className="h-4 w-4" />
                  </PillIcon>
                </Button>

                {sent ? (
                  <p className="text-sm text-gold-400" role="status">
                    Your email client is opening with the brief ready to send. If nothing happened,
                    write to hello@arnviya.com and paste the selection above.
                  </p>
                ) : (
                  <p className="text-xs leading-relaxed text-cream-100/60">
                    We reply within one working day. Your logo and details stay private.
                  </p>
                )}
              </form>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
