'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { PRESET_PATTERNS } from '../../lib/font-matrix';
import { Sparkles, ArrowRight, Play, Check } from 'lucide-react';

export default function PresetsPage() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
        isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      <Header isDarkMode={isDarkMode} onToggleDarkMode={() => setIsDarkMode((prev) => !prev)} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-10 w-full space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-wider ${
              isDarkMode
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                : 'bg-emerald-50 border-emerald-200 text-emerald-700'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Contribution Art Templates</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            GitHub Contribution <span className="text-emerald-500">Preset Patterns</span>
          </h1>

          <p className={`text-base sm:text-lg ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Explore pre-configured 5x7 matrix artwork templates for your GitHub profile contribution graph.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRESET_PATTERNS.map((preset) => (
            <div
              key={preset.id}
              className={`rounded-2xl border p-6 flex flex-col justify-between transition-all hover:scale-[1.02] ${
                isDarkMode
                  ? 'bg-slate-900/90 border-slate-800 text-slate-100'
                  : 'bg-white border-slate-200 text-slate-900 shadow-sm'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-emerald-500 uppercase tracking-widest">
                    PRESET #{preset.id.toUpperCase()}
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono">
                    5x7 Matrix
                  </span>
                </div>

                <h3 className="text-xl font-extrabold font-mono text-white tracking-wider">
                  &quot;{preset.text}&quot;
                </h3>

                <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {preset.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">Ready to load</span>
                <Link
                  href={`/?text=${encodeURIComponent(preset.text)}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:scale-105 transition-all shadow-md"
                >
                  <Play className="h-3.5 w-3.5 fill-slate-950" />
                  <span>Open in Studio</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}
