import { BlurFade } from '@/components/fx/blur-fade';
import { TracingBeam } from '@/components/fx/tracing-beam';
import { STEPS } from '@/lib/data';

export function HowItWorks() {
  return (
    <section id="process" className="section container">
      <BlurFade inView>
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">How it works</p>
          <h2 className="mt-6 text-[clamp(1.75rem,3.4vw,2.875rem)]">
            From enquiry to <span className="italic text-gold-400">keepsake.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[52ch] text-cream-100/60">
            No chasing, no vague timelines. A quote within 24 hours, a digital mock-up before
            production, and one named person on WhatsApp until it lands.
          </p>
        </div>
      </BlurFade>

      <div className="mt-20">
        <TracingBeam>
          <div className="space-y-16 pb-8">
            {STEPS.map((s, i) => (
              <BlurFade key={s.n} inView delay={i * 0.08}>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-baseline sm:gap-8">
                  <span className="font-display text-4xl leading-none text-gold-500/70">
                    {s.n}
                  </span>
                  <div className="max-w-[46ch]">
                    <h3 className="font-display text-2xl text-cream-100">{s.title}</h3>
                    <p className="mt-3 text-cream-100/60">{s.body}</p>
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        </TracingBeam>
      </div>
    </section>
  );
}
