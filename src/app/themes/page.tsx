'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { THEMES } from '../../lib/theme-config';
import { useTheme } from '../../context/ThemeContext';
import { Palette, Play } from 'lucide-react';

export default function ThemesPage() {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
        isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-10 w-full space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-wider ${
              isDarkMode
                ? 'bg-purple-500/10 border-purple-500/20 text-purple-400'
                : 'bg-purple-50 border-purple-200 text-purple-700'
            }`}
          >
            <Palette className="h-3.5 w-3.5" />
            <span>Custom Color Palettes</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            GitHub Contribution <span className="text-purple-500">Theme Gallery</span>
          </h1>

          <p className={`text-base sm:text-lg ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Preview 6 curated color themes engineered for high-contrast contribution art visibility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {THEMES.map((theme) => (
            <div
              key={theme.id}
              className={`rounded-2xl border p-6 flex flex-col justify-between transition-all hover:scale-[1.02] ${
                isDarkMode
                  ? 'bg-slate-900/90 border-slate-800 text-slate-100'
                  : 'bg-white border-slate-200 text-slate-900 shadow-sm'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{theme.name}</h3>
                  <span className="text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                    {theme.id}
                  </span>
                </div>

                {/* Color Swatch Bar */}
                <div className={`flex items-center gap-2 p-2 rounded-xl border justify-between ${
                  isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  {theme.levels.map((color, idx) => (
                    <div
                      key={idx}
                      style={{ backgroundColor: color }}
                      className="h-8 flex-1 rounded-md border border-slate-700/50 shadow-inner"
                      title={`Level ${idx}: ${color}`}
                    />
                  ))}
                </div>

                <div className="grid grid-cols-5 gap-1 pt-1">
                  {[0, 1, 2, 3, 4].map((lvl) => (
                    <span key={lvl} className="text-[10px] font-mono text-center text-slate-500">
                      Lvl {lvl}
                    </span>
                  ))}
                </div>
              </div>

              <div className={`mt-6 pt-4 border-t flex items-center justify-between ${
                isDarkMode ? 'border-slate-800/60' : 'border-slate-100'
              }`}>
                <span className="text-xs text-slate-400 font-mono">5 Intensity Levels</span>
                <Link
                  href={`/?theme=${theme.id}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purple-500 text-white font-bold text-xs hover:scale-105 transition-all shadow-md"
                >
                  <Play className="h-3.5 w-3.5 fill-white" />
                  <span>Apply Theme</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
