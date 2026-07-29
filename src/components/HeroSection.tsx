'use client';

import React from 'react';
import { PRESET_PATTERNS } from '../lib/font-matrix';
import { Sparkles, Terminal, Flame, Zap } from 'lucide-react';

interface HeroSectionProps {
  onSelectPreset: (text: string) => void;
  activeText: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectPreset, activeText }) => {
  return (
    <section className="relative overflow-hidden py-10 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Background glow accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[600px] h-[300px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="h-3.5 w-3.5" />
          <span>GitHub Contribution Art Planner</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Design your <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">GitHub legacy</span> before you write code.
        </h1>

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
          Type text, initials, or patterns and instantly visualize an authentic 53-week GitHub contribution graph with an automated, copy-paste commit execution strategy.
        </p>

        {/* Quick Presets Bar */}
        <div className="pt-2">
          <p className="text-xs font-semibold uppercase text-slate-400 tracking-wider mb-3 flex items-center justify-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-amber-400" />
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
                      : 'bg-slate-900/90 text-slate-300 border border-slate-800 hover:border-emerald-500/50 hover:text-white'
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
