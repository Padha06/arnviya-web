export type Product = {
  id: string;
  name: string;
  blurb: string;
  image: string;
  priceAt100: number;
  moq: number;
  tag?: string;
};

export const BESTSELLERS: Product[] = [
  {
    id: 'nameplate',
    name: 'Personalised Desk Nameplate',
    blurb:
      'Crystal-clear resin with the name, title and company logo engraved, and pressed florals set along the base.',
    image: '/images/nameplate.jpg',
    priceAt100: 1290,
    moq: 25,
    tag: 'Bestseller',
  },
  {
    id: 'pen',
    name: 'Resin Fountain Pen',
    blurb:
      'A writing instrument that lasts. Botanical barrel with gold foil inlay, engraved with a name or logo.',
    image: '/images/pen.jpg',
    priceAt100: 940,
    moq: 25,
    tag: 'Corporate favourite',
  },
  {
    id: 'clock',
    name: 'Resin Desk Clock',
    blurb:
      'Hexagon, arch or round. Silent quartz movement, real pressed botanicals, your choice of palette.',
    image: '/images/clock-hex-sunflower.jpg',
    priceAt100: 1190,
    moq: 25,
  },
  {
    id: 'keychain',
    name: 'Initial Resin Keychain',
    blurb:
      'The volume hero. Gold foil and colour swirls set in a custom letter — built for large giveaways.',
    image: '/images/keychain-initial.jpg',
    priceAt100: 175,
    moq: 25,
  },
  {
    id: 'pendant',
    name: 'Botanical Pendant',
    blurb:
      'Real dried flowers preserved in hand-poured resin. Circle, heart, flower or a custom silhouette.',
    image: '/images/pendant-botanical.jpg',
    priceAt100: 420,
    moq: 25,
  },
  {
    id: 'rose',
    name: 'Rose Petal Heart Pendant',
    blurb:
      'Dried rose petals and gold foil captured inside a silver bezel. The one people keep on the bedside table.',
    image: '/images/pendant-rose-heart.jpg',
    priceAt100: 540,
    moq: 25,
    tag: 'New',
  },
];

export type Collection = {
  id: string;
  name: string;
  blurb: string;
  image: string;
  meta: string;
  span: string;
};

export const COLLECTIONS: Collection[] = [
  {
    id: 'welcome',
    name: 'Corporate Welcome Kits',
    blurb:
      'Nameplate, resin pen and initial keychain boxed in your branding — the first thing a new hire opens.',
    image: '/images/flatlay-set.jpg',
    meta: 'MOQ 10 · from \u20B91,950 / set at 500',
    span: 'md:col-span-3',
  },
  {
    id: 'doctor',
    name: 'Doctor Appreciation',
    blurb: 'Desk clock, personalised nameplate and botanical pen for surgeons and medical teams.',
    image: '/images/clock-arch.jpg',
    meta: 'MOQ 5 · from \u20B92,500 / set at 500',
    span: 'md:col-span-3',
  },
  {
    id: 'possession',
    name: 'Builder Possession',
    blurb:
      'Framed resin art and a keepsake keychain carrying the family name and the possession date.',
    image: '/images/wallclock-white.jpg',
    meta: 'MOQ 10 · from \u20B93,100 / set at 500',
    span: 'md:col-span-2',
  },
  {
    id: 'festive',
    name: 'Festival Hampers',
    blurb: 'Botanical pendant, keychain and a small clock, boxed for Diwali and New Year.',
    image: '/images/pendant-rose-heart.jpg',
    meta: 'MOQ 25 · from \u20B92,250 / set at 500',
    span: 'md:col-span-2',
  },
  {
    id: 'keepsakes',
    name: 'Personal Keepsakes',
    blurb:
      'Bridal bouquets, baby milestones and pet memorials preserved in resin — kept forever, not for a season.',
    image: '/images/diary-gold.jpg',
    meta: 'Bespoke \u00B7 per piece',
    span: 'md:col-span-2',
  },
];

export const USPS = [
  '100% Handcrafted',
  'Real Botanicals',
  'Fully Customisable',
  'Bulk Orders Welcome',
  'GST Invoiced',
  'Pan-India Delivery',
];

export const STEPS = [
  {
    n: '01',
    title: 'Share your vision',
    body: 'Tell us the occasion, quantity, budget and deadline. Two minutes is enough.',
  },
  {
    n: '02',
    title: 'Get a custom quote',
    body: 'A tailored proposal with product options, per-piece pricing and a production window, within 24 hours.',
  },
  {
    n: '03',
    title: 'Approve the mock-up',
    body: 'We render your logo and name on the actual piece. Nothing is poured until you approve it.',
  },
  {
    n: '04',
    title: 'Handcrafted & delivered',
    body: 'Made by hand, boxed in your branding, delivered to one address or to every employee\u2019s home.',
  },
];

export const STATS = [
  { value: 5, suffix: '', label: 'Pieces minimum · kits' },
  { value: 500, suffix: '+', label: 'Best per-piece tier' },
  { value: 7, suffix: ' days', label: 'Express lead time' },
  { value: 100, suffix: '%', label: 'Hand-poured, no two alike' },
];

export type QuoteProduct = {
  id: string;
  name: string;
  sub: string;
  image: string;
  lead: number;
  moq: number;
  tiers: Record<number, number>;
};

export const TIERS = [25, 50, 100, 250, 500] as const;

export const QUOTE_PRODUCTS: QuoteProduct[] = [
  {
    id: 'keychain',
    name: 'Initial Botanical Keychain',
    sub: 'Gold foil, dried botanicals \u00B7 MOQ 25',
    image: '/images/keychain-initial.jpg',
    lead: 8,
    moq: 25,
    tiers: { 25: 240, 50: 205, 100: 175, 250: 150, 500: 130 },
  },
  {
    id: 'pendant',
    name: 'Botanical Pendant',
    sub: 'Real pressed flowers \u00B7 MOQ 25',
    image: '/images/pendant-botanical.jpg',
    lead: 9,
    moq: 25,
    tiers: { 25: 560, 50: 490, 100: 420, 250: 370, 500: 330 },
  },
  {
    id: 'rose',
    name: 'Rose Petal Heart Pendant',
    sub: 'Silver bezel, dried rose petals \u00B7 MOQ 25',
    image: '/images/pendant-rose-heart.jpg',
    lead: 9,
    moq: 25,
    tiers: { 25: 720, 50: 630, 100: 540, 250: 470, 500: 420 },
  },
  {
    id: 'pen',
    name: 'Resin Fountain Pen',
    sub: 'Botanical barrel, gold nib \u00B7 MOQ 25',
    image: '/images/pen.jpg',
    lead: 12,
    moq: 25,
    tiers: { 25: 1250, 50: 1090, 100: 940, 250: 830, 500: 760 },
  },
  {
    id: 'diary',
    name: 'Resin Diary (A5)',
    sub: 'Hand-poured cover \u00B7 MOQ 25',
    image: '/images/diary.jpg',
    lead: 12,
    moq: 25,
    tiers: { 25: 1050, 50: 920, 100: 790, 250: 700, 500: 640 },
  },
  {
    id: 'nameplate',
    name: 'Desk Nameplate',
    sub: 'Engraved name, title, logo \u00B7 MOQ 25',
    image: '/images/nameplate.jpg',
    lead: 10,
    moq: 25,
    tiers: { 25: 1750, 50: 1520, 100: 1290, 250: 1140, 500: 1020 },
  },
  {
    id: 'clock',
    name: 'Resin Desk Clock',
    sub: 'Hexagon / arch / round \u00B7 MOQ 25',
    image: '/images/clock-hex-sunflower.jpg',
    lead: 12,
    moq: 25,
    tiers: { 25: 1600, 50: 1400, 100: 1190, 250: 1050, 500: 950 },
  },
  {
    id: 'welcome',
    name: 'Corporate Welcome Kit',
    sub: 'Nameplate + pen + keychain \u00B7 MOQ 10',
    image: '/images/flatlay-set.jpg',
    lead: 14,
    moq: 10,
    tiers: { 25: 3400, 50: 2950, 100: 2500, 250: 2180, 500: 1950 },
  },
  {
    id: 'doctor',
    name: 'Doctor Appreciation Kit',
    sub: 'Clock + nameplate + pen \u00B7 MOQ 5',
    image: '/images/clock-arch.jpg',
    lead: 14,
    moq: 5,
    tiers: { 25: 4300, 50: 3750, 100: 3180, 250: 2790, 500: 2500 },
  },
  {
    id: 'builder',
    name: 'Builder Possession Kit',
    sub: 'Wall art + keepsake keychain \u00B7 MOQ 10',
    image: '/images/wallclock-white.jpg',
    lead: 21,
    moq: 10,
    tiers: { 25: 5400, 50: 4700, 100: 3980, 250: 3480, 500: 3100 },
  },
  {
    id: 'festival',
    name: 'Festival Corporate Hamper',
    sub: 'Pendant + keychain + clock \u00B7 MOQ 25',
    image: '/images/pendant-geode.jpg',
    lead: 14,
    moq: 25,
    tiers: { 25: 3900, 50: 3400, 100: 2880, 250: 2520, 500: 2250 },
  },
];

export const ADDONS = [
  { id: 'engrave', label: 'Logo / name engraving', hint: 'Laser-engraved into every piece', rate: 25 },
  { id: 'pack', label: 'Branded rigid gift box', hint: 'Foil logo, tissue paper, thank-you card', rate: 65 },
  { id: 'botanic', label: 'Custom botanicals & palette', hint: 'Matched to your brand colours', rate: 40 },
];

export const PRESETS: { id: string; label: string; items: Record<string, number> }[] = [
  { id: 'onboarding', label: 'Onboarding \u00B7 100 kits', items: { welcome: 100 } },
  { id: 'festive', label: 'Diwali \u00B7 250 hampers', items: { festival: 250 } },
  { id: 'clinic', label: 'Clinics \u00B7 50 doctor kits', items: { doctor: 50 } },
  { id: 'handover', label: 'Possession \u00B7 100 homes', items: { builder: 100, keychain: 100 } },
];

export const TESTIMONIALS = [
  {
    quote:
      'We ordered 180 nameplates for our new floor. The mock-up came the next day, the boxes were branded, and not one arrived chipped.',
    by: 'HR Lead \u00B7 Real Estate Developer \u00B7 Ahmedabad',
  },
  {
    quote:
      'Our representatives actually keep these on their desks. That never happened with the dry-fruit boxes.',
    by: 'Marketing Manager \u00B7 Pharma \u00B7 Vadodara',
  },
  {
    quote:
      'The families photographed the possession artwork and posted it. That is reach we could never have bought.',
    by: 'Sales Director \u00B7 Builder \u00B7 Surat',
  },
];
