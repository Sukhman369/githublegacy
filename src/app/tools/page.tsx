'use client';

import React, { Suspense } from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { ToolsHubGrid } from '../../components/ToolsHubGrid';
import { useTheme } from '../../context/ThemeContext';
import { Sparkles } from 'lucide-react';

function ToolsContent() {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-12 space-y-12">
        {/* Tools Page Hero */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Sparkles className="w-4 h-4" />
            <span>Complete Developer Suite</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            GitLegacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">Developer Tools Hub</span>
          </h1>
          <p className={`max-w-2xl mx-auto text-sm sm:text-base ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Explore our expanding catalog of contribution planners, real activity visualizers, profile badge generators, and commit automation tools.
          </p>
        </div>

        {/* Tools Suite Grid */}
        <div className="pb-8">
          <ToolsHubGrid showTitle={false} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function ToolsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center font-mono text-sm">
          Loading Tools Library...
        </div>
      }
    >
      <ToolsContent />
    </Suspense>
  );
}
