'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onSelectPreset?: (text: string) => void;
  activeText?: string;
  isDarkMode?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
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
          <span>Developer Branding & Contribution Platform</span>
        </div>

        <h1 className={`text-3xl sm:text-5xl font-black tracking-tight leading-tight ${
          isDarkMode ? 'text-white' : 'text-slate-900'
        }`}>
          Elevate Your <span className="bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 bg-clip-text text-transparent">GitHub Contribution Legacy</span>
        </h1>

        <p className={`text-base sm:text-lg leading-relaxed ${
          isDarkMode ? 'text-slate-300' : 'text-slate-600'
        }`}>
          Design custom 53-week pixel art, visualize real historical contribution graphs, generate dynamic live SVG profile badges, and export retina social media headers.
        </p>
      </div>
    </section>
  );
};

