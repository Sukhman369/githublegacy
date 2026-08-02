'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, Coffee, Shield, Sparkles, BookOpen, Terminal, LayoutGrid, Palette, ExternalLink, HeartHandshake } from 'lucide-react';
import { GitLegacyLogo } from './GitLegacyLogo';
import { useTheme } from '../context/ThemeContext';
import { SponsorModal } from './SponsorModal';

const GithubIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

export const Footer: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);

  return (
    <footer
      className={`mt-20 border-t transition-colors ${
        isDarkMode ? 'border-slate-800 bg-slate-950 text-slate-400' : 'border-slate-200 bg-slate-100 text-slate-600'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 space-y-12">
        {/* Top Section: 4-Column Professional Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Column 1: Brand & Tagline (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <GitLegacyLogo className="h-9 w-9" size={36} />
              <div>
                <div className={`font-mono text-lg font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Git<span className="text-emerald-500">Legacy</span>
                </div>
                <span className="text-[11px] font-semibold text-emerald-400">Open-Source Developer Branding Platform</span>
              </div>
            </div>

            <p className="text-xs leading-relaxed opacity-85 max-w-sm">
              Design custom contribution artwork, fetch real historical GitHub graphs, generate dynamic profile badges, and export retina social media banners.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                All Systems Operational
              </span>
              <span className="text-[11px] opacity-70">v1.0 • MIT Licensed</span>
            </div>
          </div>

          {/* Column 2: Developer Tools (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Developer Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/#planner-studio" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <LayoutGrid className="w-3.5 h-3.5 text-slate-500" />
                  <span>Contribution Art Planner</span>
                </Link>
              </li>
              <li>
                <Link href="/badges#real-history" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-slate-500" />
                  <span>Real GitHub History Visualizer</span>
                </Link>
              </li>
              <li>
                <Link href="/badges" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-slate-500" />
                  <span>Badge & Shield Studio</span>
                </Link>
              </li>
              <li>
                <Link href="/presets" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-slate-500" />
                  <span>Preset Patterns Gallery</span>
                </Link>
              </li>
              <li>
                <Link href="/script-generator" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-slate-500" />
                  <span>Automation Script Exporter</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources & Community (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Resources & Guide
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/contribute" className="hover:text-emerald-400 transition-colors font-bold text-emerald-400 flex items-center gap-1.5">
                  <HeartHandshake className="w-3.5 h-3.5" />
                  <span>Contribute Guide & Docs</span>
                </Link>
              </li>
              <li>
                <Link href="/themes" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-slate-500" />
                  <span>Color Themes Customizer</span>
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                  <span>Developer Articles & Guides</span>
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/Sukhman369/githublegacy.git"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <GithubIcon className="w-3.5 h-3.5 text-slate-500" />
                  <span>GitHub Repository</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Support & Sponsorship (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Support Project
            </h4>
            <p className="text-xs opacity-80 leading-relaxed">
              GitLegacy is free & open source. Support development with chai!
            </p>
            <button
              onClick={() => setIsSponsorModalOpen(true)}
              className="w-full py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold shadow-md hover:scale-105 transition-all text-xs flex items-center justify-center gap-1.5"
            >
              <Coffee className="h-3.5 w-3.5 fill-slate-950" />
              <span>Sponsor Coffee</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-1.5 opacity-90">
            <span>Crafted with</span>
            <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500 animate-pulse" />
            <span>for the developer community.</span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/contribute" className="hover:text-emerald-400 transition-colors">
              Contribution Guide
            </Link>
            <span className="opacity-30">•</span>
            <a
              href="https://github.com/Sukhman369/githublegacy.git"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors flex items-center gap-1"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Sponsor Modal */}
      <SponsorModal
        isOpen={isSponsorModalOpen}
        onClose={() => setIsSponsorModalOpen(false)}
        isDarkMode={isDarkMode}
      />
    </footer>
  );
};
