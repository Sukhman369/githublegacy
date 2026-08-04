import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { ThemeProvider } from '../context/ThemeContext';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { getWebSiteSchema, getOrganizationSchema, getSiteNavigationSchema } from '../lib/schema-org';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#020617' },
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://gitlegacy.co'),
  title: {
    default: 'GitLegacy - Design your GitHub legacy before you write code',
    template: '%s | GitLegacy',
  },
  description:
    'GitLegacy is an interactive developer planning studio for designing GitHub contribution graph artwork, custom badges, and generating automated backdated commit strategies.',
  keywords: [
    'GitLegacy',
    'Git Legacy',
    'gitlegacy.co',
    'Git Legacy Studio',
    'GitHub Contribution Graph',
    'Git Commit Art',
    'GitHub Contribution Generator',
    'GitHub Badge Generator',
    'Developer Badges',
    'Commit Strategy Planner',
  ],
  authors: [{ name: 'Sukhman' }],
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: 'GitLegacy - GitHub Contribution Calendar Planner & Badge Studio',
    description:
      'Design your GitHub contribution art before you write code. Convert text, initials, or logos into an authentic contribution strategy with instant script export and custom badges.',
    type: 'website',
    siteName: 'GitLegacy',
    url: 'https://gitlegacy.co',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GitLegacy - GitHub Contribution Calendar Planner',
    description: 'Design your GitHub contribution art before you write code.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteSchema = getWebSiteSchema();
  const orgSchema = getOrganizationSchema();
  const sitelinksSchema = getSiteNavigationSchema();

  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(sitelinksSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans overflow-x-hidden selection:bg-emerald-500 selection:text-slate-950">
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
        <SpeedInsights />
        <Script
          id="bmc-widget"
          src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
          data-name="BMC-Widget"
          data-cfasync="false"
          data-id="sukhman69"
          data-description="Support me on Buy me a coffee!"
          data-message=""
          data-color="#40DCA5"
          data-position="Right"
          data-x_margin="18"
          data-y_margin="18"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
