'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { ToolsHubGrid } from '../../components/ToolsHubGrid';
import { useTheme } from '../../context/ThemeContext';
import { Sparkles, HeartHandshake, ArrowRight, Code2, ExternalLink } from 'lucide-react';

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
        <div>
          <ToolsHubGrid showTitle={false} />
        </div>

        {/* Open Source Contribution Banner */}
        <section className={`relative overflow-hidden p-8 sm:p-10 rounded-3xl border shadow-2xl transition-all ${
          isDarkMode
            ? 'bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border-slate-800'
            : 'bg-gradient-to-br from-emerald-50/50 via-white to-teal-50/30 border-slate-200 shadow-sm'
        }`}>
          {/* Background Ambient Glow */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <HeartHandshake className="w-4 h-4" />
                <span>Open Source Community</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
                Want to Build & Add a <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">New Tool or Theme?</span>
              </h2>

              <p className={`text-xs sm:text-sm leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                GitLegacy is built by developers, for developers. Help us expand the platform by contributing new artwork presets, color themes, badge designs, or custom developer utilities!
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-[11px] font-mono">
                <span className="px-2.5 py-1 rounded-lg border bg-emerald-500/10 text-emerald-400 border-emerald-500/20">🎨 Matrix Presets</span>
                <span className="px-2.5 py-1 rounded-lg border bg-teal-500/10 text-teal-400 border-teal-500/20">🎨 Color Themes</span>
                <span className="px-2.5 py-1 rounded-lg border bg-cyan-500/10 text-cyan-400 border-cyan-500/20">🛡️ Tech Shields</span>
                <span className="px-2.5 py-1 rounded-lg border bg-purple-500/10 text-purple-400 border-purple-500/20">⚡ Commit Generators</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto">
              <Link
                href="/contribute"
                className="py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all text-center"
              >
                <span>Read Contribute Guide</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="https://github.com/Sukhman369/gitlegacy"
                target="_blank"
                rel="noopener noreferrer"
                className={`py-3.5 px-6 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all hover:scale-105 text-center ${
                  isDarkMode
                    ? 'bg-slate-900 border-slate-800 hover:bg-slate-800 text-slate-200'
                    : 'bg-white border-slate-300 hover:bg-slate-100 text-slate-800'
                }`}
              >
                <Code2 className="w-4 h-4 text-emerald-400" />
                <span>GitHub Repository</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </a>
            </div>
          </div>
        </section>
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
