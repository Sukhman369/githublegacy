'use client';

import React from 'react';
import { Heart, Coffee } from 'lucide-react';
import { GitLegacyLogo } from './GitLegacyLogo';
import { useTheme } from '../context/ThemeContext';

const GithubIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

export const Footer: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <footer
      className={`mt-16 border-t py-10 px-4 sm:px-6 transition-colors ${
        isDarkMode ? 'border-slate-800 bg-slate-950 text-slate-400' : 'border-slate-200 bg-slate-100 text-slate-600'
      }`}
    >
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <GitLegacyLogo className="h-9 w-9" size={36} />
          <div>
            <div className={`font-mono text-base font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Git<span className="text-emerald-500">Legacy</span>
            </div>
            <p className="text-xs opacity-80">
              Interactive GitHub Contribution Graph Art & Strategy Planner
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs">
          <span className="flex items-center gap-1.5">
            Crafted with <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" /> for Developers
          </span>
          <span>•</span>
          <a
            href="https://github.com/Sukhman369/githublegacy.git"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-emerald-500 transition-colors"
          >
            <GithubIcon className="h-3.5 w-3.5" />
            <span>Contribute</span>
          </a>
          <span>•</span>
          <a
            href="https://www.buymeachai.in/sukhman"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-amber-500 font-bold hover:text-amber-400 transition-colors"
          >
            <Coffee className="h-3.5 w-3.5 fill-amber-500" />
            <span>Buy Me a Chai</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
