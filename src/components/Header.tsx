'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Sun, Moon, BookOpen, LayoutGrid, Palette, Terminal, Coffee } from 'lucide-react';
import { GitLegacyLogo } from './GitLegacyLogo';
import { useTheme } from '../context/ThemeContext';
import { SponsorModal } from './SponsorModal';

const GithubIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);

  const navItems = [
    { label: 'Studio', href: '/', icon: LayoutGrid },
    { label: 'Presets', href: '/presets', icon: Sparkles },
    { label: 'Themes', href: '/themes', icon: Palette },
    { label: 'Script Generator', href: '/script-generator', icon: Terminal },
    { label: 'Blog Corner', href: '/blog', icon: BookOpen },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-colors ${
        isDarkMode
          ? 'border-slate-800 bg-slate-950/80 text-slate-100 backdrop-blur-xl'
          : 'border-slate-200 bg-white/80 text-slate-900 backdrop-blur-xl shadow-sm'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand Logo & Title */}
        <Link href="/" className="flex items-center gap-3 group">
          <div
            className={`flex items-center justify-center rounded-xl p-0.5 border shadow-sm transition-transform group-hover:scale-105 ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}
          >
            <GitLegacyLogo className="h-9 w-9" size={36} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`font-mono text-xl font-extrabold tracking-tight ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}
              >
                Git<span className="text-emerald-500">Legacy</span>
              </span>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                v1.0
              </span>
            </div>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href || (href !== '/' && pathname?.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                    : isDarkMode
                    ? 'text-slate-300 hover:text-white hover:bg-slate-900'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Dark / Light Mode Switch */}
          <button
            onClick={toggleDarkMode}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold border transition-all ${
              isDarkMode
                ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800'
                : 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
            }`}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-slate-700" />
            )}
            <span className="hidden sm:inline text-xs font-medium">
              {isDarkMode ? 'Light' : 'Dark'}
            </span>
          </button>

          {/* Contribute / GitHub Repo Link */}
          <a
            href="https://github.com/Sukhman369/githublegacy.git"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold border transition-all ${
              isDarkMode
                ? 'bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800 hover:text-white'
                : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
            }`}
            title="Contribute on GitHub"
          >
            <GithubIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Contribute</span>
          </a>

          {/* Sponsor / Buy Me a Chai Button */}
          <button
            onClick={() => setIsSponsorModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md hover:scale-105 transition-all"
            title="Support GitLegacy (Domestic & International)"
          >
            <Coffee className="h-4 w-4 fill-slate-950" />
            <span className="hidden sm:inline">Sponsor</span>
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div
        className={`flex lg:hidden overflow-x-auto border-t px-4 py-2 gap-2 text-xs font-medium scrollbar-none ${
          isDarkMode ? 'border-slate-800 bg-slate-950/90' : 'border-slate-200 bg-slate-50'
        }`}
      >
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href || (href !== '/' && pathname?.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full whitespace-nowrap text-xs transition-all ${
                isActive
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : isDarkMode
                  ? 'text-slate-400 bg-slate-900'
                  : 'text-slate-600 bg-white border border-slate-200'
              }`}
            >
              <Icon className="h-3 w-3" />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>

      {/* Sponsor Modal */}
      <SponsorModal
        isOpen={isSponsorModalOpen}
        onClose={() => setIsSponsorModalOpen(false)}
        isDarkMode={isDarkMode}
      />
    </header>
  );
};
