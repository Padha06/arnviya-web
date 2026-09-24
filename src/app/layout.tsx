import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Jost } from 'next/font/google';
import './globals.css';

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const sans = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://arnviya.com'),
  title: 'Arnviya — Handcrafted Resin Corporate Gifting | Vadodara, India',
  description:
    'Handcrafted resin gifts with real botanicals and gold foil for corporate onboarding, client appreciation, pharma, clinics and real estate. Indicative bulk pricing from 25 to 500+ pieces. Pan-India delivery, GST invoiced.',
  keywords: [
    'corporate gifting India',
    'resin corporate gifts',
    'botanical gifting',
    'bulk corporate gifts Vadodara',
    'employee onboarding kits',
    'possession day gifts',
    'handcrafted corporate gifting',
  ],
  openGraph: {
    title: 'Arnviya — Handcrafted Resin Corporate Gifting',
    description:
      'Hand-poured resin keepsakes with real pressed botanicals. Bulk corporate gifting from 25 pieces, delivered across India.',
    type: 'website',
    locale: 'en_IN',
    images: [{ url: '/images/wallclock-butterfly.jpg', width: 1241, height: 1366 }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0A170F',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="grain">{children}</body>
    </html>
  );
}
