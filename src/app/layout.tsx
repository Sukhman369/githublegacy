import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
});

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
      <body className="min-h-full bg-slate-950 text-slate-100 flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
