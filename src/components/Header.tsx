'use client';

import React from 'react';
import { Sparkles, Code2, ShieldCheck, Sun, Moon } from 'lucide-react';
import { GitLegacyLogo } from './GitLegacyLogo';

const GithubIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

interface HeaderProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isDarkMode, onToggleDarkMode }) => {
  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-colors ${
        isDarkMode
          ? 'border-slate-800 bg-slate-950/80 text-slate-100 backdrop-blur-xl'
          : 'border-slate-200 bg-white/80 text-slate-900 backdrop-blur-xl shadow-sm'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <div className={`flex items-center justify-center rounded-xl p-0.5 border shadow-sm ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
          }`}>
            <GitLegacyLogo className="h-10 w-10" size={40} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`font-mono text-xl font-extrabold tracking-tight ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                Git<span className="text-emerald-500">Legacy</span>
              </span>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                v1.0 MVP
              </span>
            </div>
            <p className={`text-xs font-sans hidden sm:block ${
              isDarkMode ? 'text-slate-400' : 'text-slate-500'
            }`}>
              Design your GitHub legacy before you write code
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className={`hidden md:flex items-center gap-2 text-xs font-medium border rounded-lg px-3 py-1.5 ${
            isDarkMode ? 'text-slate-400 bg-slate-900 border-slate-800' : 'text-slate-600 bg-slate-100 border-slate-200'
          }`}>
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            <span>Zero Backend Required • Instant Generation</span>
          </div>

          {/* Dark / Light Mode Switch Button */}
          <button
            onClick={onToggleDarkMode}
            className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold border transition-all ${
              isDarkMode
                ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800 hover:text-amber-300'
                : 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200 hover:text-slate-950'
            }`}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? (
              <>
                <Sun className="h-4 w-4 text-amber-400" />
                <span className="hidden sm:inline">Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="h-4 w-4 text-slate-700" />
                <span className="hidden sm:inline">Dark Mode</span>
              </>
            )}
          </button>

          <a
            href="https://github.com/Sukhman369/githublegacy.git"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold border transition-all ${
              isDarkMode
                ? 'bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800 hover:text-white'
                : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            <GithubIcon className="h-4 w-4" />
            <span className="hidden sm:inline">GitHub Repository</span>
          </a>
        </div>
      </div>
    </header>
  );
};
