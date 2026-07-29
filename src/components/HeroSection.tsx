'use client';

import React from 'react';
import { PRESET_PATTERNS } from '../lib/font-matrix';
import { Sparkles, Zap } from 'lucide-react';

interface HeroSectionProps {
  onSelectPreset: (text: string) => void;
  activeText: string;
  isDarkMode?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSelectPreset,
  activeText,
  isDarkMode = true,
}) => {
  return (
    <section className="relative overflow-hidden py-10 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Background glow accents */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[600px] h-[300px] blur-[120px] rounded-full pointer-events-none ${
        isDarkMode ? 'bg-emerald-500/10' : 'bg-emerald-500/15'
      }`} />

      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-wider ${
          isDarkMode
            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
            : 'bg-emerald-50 border-emerald-200 text-emerald-700'
        }`}>
          <Sparkles className="h-3.5 w-3.5" />
          <span>GitHub Contribution Art Planner</span>
        </div>

        <h1 className={`text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight ${
          isDarkMode ? 'text-white' : 'text-slate-900'
        }`}>
          Design your <span className="bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 bg-clip-text text-transparent">GitHub legacy</span> before you write code.
        </h1>

        <p className={`text-base sm:text-lg leading-relaxed ${
          isDarkMode ? 'text-slate-300' : 'text-slate-600'
        }`}>
          Type text, initials, or patterns and instantly visualize an authentic 53-week GitHub contribution graph with an automated, copy-paste commit execution strategy.
        </p>

        {/* Quick Presets Bar */}
        <div className="pt-2">
          <p className={`text-xs font-semibold uppercase tracking-wider mb-3 flex items-center justify-center gap-1.5 ${
            isDarkMode ? 'text-slate-400' : 'text-slate-500'
          }`}>
            <Zap className="h-3.5 w-3.5 text-amber-500" />
            Quick Artwork Presets
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {PRESET_PATTERNS.map((preset) => {
              const isActive = activeText.toUpperCase() === preset.text.toUpperCase();
              return (
                <button
                  key={preset.id}
                  onClick={() => onSelectPreset(preset.text)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20 scale-105'
                      : isDarkMode
                      ? 'bg-slate-900/90 text-slate-300 border border-slate-800 hover:border-emerald-500/50 hover:text-white'
                      : 'bg-white text-slate-700 border border-slate-300 shadow-sm hover:border-emerald-500 hover:text-slate-900'
                  }`}
                  title={preset.description}
                >
                  {preset.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
