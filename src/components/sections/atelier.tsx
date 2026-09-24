import { BlurFade } from '@/components/fx/blur-fade';
import { ProductViewer } from '@/components/three/product-viewer';
import { Button, PillIcon } from '@/components/ui/button';
import { ArrowUpRight, Check } from '@/components/icons';

const POINTS = [
  'Real dried botanicals and 24k-look gold foil, hand-placed per piece',
  'Silent quartz movement with a two-year guarantee',
  'Hexagon, arch, round or a custom silhouette',
  'Your logo and palette matched before the first pour',
];

export function Atelier() {
  return (
    <section
      id="atelier"
      className="section relative overflow-hidden bg-forest-900/40"
      data-note="A rotatable 3D view of the craft. This is the moment the page stops looking like a catalogue and starts looking like a studio that can execute at this quality."
      data-note-impact="Premium perception in five seconds"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_70%_35%,rgba(198,161,91,0.09)_0%,transparent_70%)]"
      />

      <div className="container relative grid items-center gap-16 [&>*]:min-w-0 lg:grid-cols-2">
        <BlurFade inView>
          <p className="eyebrow">The craft</p>
          <h2 className="mt-6 max-w-[20ch] text-[clamp(1.75rem,3.4vw,2.875rem)]">
            Every piece is poured <span className="italic text-gold-400">by hand, one at a time.</span>
          </h2>
          <p className="mt-5 max-w-[50ch] text-cream-100/60">
            No two Arnviya pieces are identical, because no two flowers are. Watch a piece turn,
            or drag to inspect the botanicals and gold foil suspended inside the resin.
          </p>

          <ul className="mt-9 space-y-3.5">
            {POINTS.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm text-cream-100/70">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                {p}
              </li>
            ))}
          </ul>

          <Button asChild variant="outline" className="mt-10">
            <a href="#quote">
              Discuss a custom piece
              <PillIcon className="bg-white/[0.08]">
                <ArrowUpRight className="h-4 w-4" />
              </PillIcon>
            </a>
          </Button>
        </BlurFade>

        <BlurFade inView delay={0.12} className="min-w-0">
          <div className="relative w-full min-w-0">
            <ProductViewer />
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
