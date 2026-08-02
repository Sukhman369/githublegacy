'use client';

import React, { Suspense } from 'react';
import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { PlatformStats } from '../components/PlatformStats';
import { ToolsHubGrid } from '../components/ToolsHubGrid';
import { Footer } from '../components/Footer';
import { useTheme } from '../context/ThemeContext';

function AppContent() {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`min-h-screen font-sans selection:bg-emerald-500 selection:text-slate-950 flex flex-col transition-colors duration-300 ${
        isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      <Header />

      <main className="flex-1 space-y-12">
        <HeroSection isDarkMode={isDarkMode} />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 space-y-16 pb-16">
          {/* Platform Trust & Statistics Banner */}
          <PlatformStats />

          {/* Developer Tools Suite Grid */}
          <div id="tools-hub">
            <ToolsHubGrid />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center font-mono text-sm">
          Loading GitLegacy Platform...
        </div>
      }
    >
      <AppContent />
    </Suspense>
  );
}
