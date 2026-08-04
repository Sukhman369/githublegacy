import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import ArtStudioClient from '../../../components/ArtStudioClient';
import { getSoftwareApplicationSchema } from '../../../lib/schema-org';
import { PlannerSettings } from '../../../types/calendar';

interface PageProps {
  searchParams: Promise<{
    text?: string;
    year?: string;
    intensity?: string;
    theme?: string;
    align?: string;
    offset?: string;
    wordgap?: string;
    mode?: string;
  }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const text = (params.text || 'LEGACY').toUpperCase();
  const year = params.year || `${new Date().getFullYear()}`;
  const theme = params.theme || 'github-dark';

  // Point og:image directly to our dynamic /api/og PNG endpoint
  const ogImageUrl = `/api/og?text=${encodeURIComponent(text)}&year=${encodeURIComponent(year)}&theme=${encodeURIComponent(theme)}`;

  return {
    title: `Contribution Art Studio - ${text} (${year}) | GitLegacy`,
    description: `Check out this custom contribution calendar artwork: "${text}" designed on GitLegacy. Design your own profile contribution artwork or automate commits!`,
    openGraph: {
      title: `GitLegacy Artist Canvas: ${text} (${year})`,
      description: `Plan and write custom contribution artwork onto your GitHub profile.`,
      url: `https://gitlegacy.co/tools/art-studio?text=${encodeURIComponent(text)}&year=${year}&theme=${theme}`,
      type: 'website',
      siteName: 'GitLegacy',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `GitLegacy Contribution Canvas Artwork: ${text}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `GitLegacy Artist Canvas: ${text} (${year})`,
      description: `Plan and write custom contribution artwork onto your GitHub profile.`,
      images: [ogImageUrl],
    },
  };
}

export default async function ArtStudioPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentYear = new Date().getFullYear();

  const initialSettings: PlannerSettings = {
    text: params.text || 'LEGACY',
    year: params.year ? parseInt(params.year, 10) : currentYear,
    intensityMaxCommits: params.intensity ? parseInt(params.intensity, 10) : 4,
    letterSpacing: 1,
    wordSpacing: params.wordgap ? parseInt(params.wordgap, 10) : 4,
    alignment: (params.align as any) || 'center',
    columnOffset: params.offset ? parseInt(params.offset, 10) : 0,
    themeId: params.theme || 'github-dark',
    drawingMode: 'select',
    drawIntensityLevel: 4,
    username: '',
    repoName: 'github-art-canvas',
  };

  const artStudioSchema = getSoftwareApplicationSchema(
    'GitLegacy Contribution Art Studio',
    'Design custom 8-bit pixel text and GitHub contribution graph artwork.',
    '/tools/art-studio'
  );

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center font-mono text-sm">
          Loading Art Studio...
        </div>
      }
    >
      <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(artStudioSchema) }}
        />
        <Header />
        <ArtStudioClient initialSettings={initialSettings} />
        <Footer />
      </div>
    </Suspense>
  );
}
