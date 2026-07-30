import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '../context/ThemeContext';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  preload: false,
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
  preload: false,
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
  title: 'GitLegacy - Design your GitHub legacy before you write code',
  description:
    'GitLegacy is an interactive developer planning studio for designing GitHub contribution graph artwork, custom patterns, and generating automated backdated commit strategies.',
  keywords: [
    'GitLegacy',
    'GitHub Contribution Graph',
    'Git Commit Art',
    'GitHub Contribution Generator',
    'Developer Tools',
    'Commit Strategy Planner',
  ],
  authors: [{ name: 'Sukhman' }],
  openGraph: {
    title: 'GitLegacy - GitHub Contribution Calendar Planner',
    description:
      'Design your GitHub contribution art before you write code. Convert text, initials, or logos into an authentic contribution strategy with instant script export.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col font-sans overflow-x-hidden selection:bg-emerald-500 selection:text-slate-950">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
