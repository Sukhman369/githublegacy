'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { useTheme } from '../../context/ThemeContext';
import {
  HeartHandshake,
  GitPullRequest,
  Sparkles,
  Palette,
  Shield,
  Code,
  Check,
  Copy,
  Terminal,
  ExternalLink,
  BookOpen,
} from 'lucide-react';

export default function ContributePage() {
  const { isDarkMode } = useTheme();
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const presetTemplateSnippet = `// 1. Open src/lib/font-matrix.ts
// 2. Add your new pattern to PRESET_PATTERNS array:
{
  id: 'my-custom-pattern',
  name: 'Space Rocket',
  text: '🚀',
  category: 'gaming', // 'gaming' | 'tech' | 'career' | 'signature'
  description: 'Retro 8-bit space rocket contribution artwork',
  matrix: [
    [0, 1, 1, 1, 0],
    [1, 2, 3, 2, 1],
    [1, 3, 4, 3, 1],
    [0, 1, 2, 1, 0],
    [0, 0, 1, 0, 0],
  ],
}`;

  const themeTemplateSnippet = `// 1. Open src/lib/theme-config.ts
// 2. Add your new theme to COLOR_THEMES array:
{
  id: 'neon-synthwave',
  name: 'Synthwave Neon',
  description: 'Vibrant retrowave neon gradient matrix',
  isDark: true,
  levels: [
    '#16002c', // Level 0: Empty cell
    '#5c0099', // Level 1: Light activity
    '#8900f2', // Level 2: Medium activity
    '#b100e8', // Level 3: High activity
    '#f72585', // Level 4: Max intensity
  ],
}`;

  const badgeTemplateSnippet = `// 1. Open src/app/badges/page.tsx
// 2. Add your technology to TECH_BADGES array:
{
  name: 'Bun.js',
  logo: 'bun',
  color: 'FBF0DF',
  category: 'backend', // 'frontend' | 'backend' | 'languages' | 'databases' | 'devops'
}`;

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      <Header />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-10 space-y-12">
        {/* Page Hero Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <HeartHandshake className="w-4 h-4" />
            <span>Open Source Community Guide</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Contribute to <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">GitLegacy</span>
          </h1>
          <p className={`max-w-2xl mx-auto text-sm sm:text-base leading-relaxed ${
            isDarkMode ? 'text-slate-400' : 'text-slate-600'
          }`}>
            GitLegacy is 100% open-source and built for developers. We welcome community contributions for new artwork presets, color themes, tech stack shields, and feature tools!
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="https://github.com/Sukhman369/gitlegacy"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center gap-2 shadow-lg transition-all"
            >
              <GitPullRequest className="w-4 h-4" />
              <span>Fork Repository on GitHub</span>
            </a>
            <Link
              href="/blog"
              className={`py-2.5 px-5 rounded-xl text-xs font-semibold border flex items-center gap-2 transition-all ${
                isDarkMode
                  ? 'bg-slate-900 border-slate-800 hover:bg-slate-800 text-slate-200'
                  : 'bg-white border-slate-300 hover:bg-slate-100 text-slate-800'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Read Documentation</span>
            </Link>
          </div>
        </div>

        {/* Section 1: Contribution Workflow */}
        <section className={`p-6 sm:p-8 rounded-2xl border shadow-xl space-y-6 ${
          isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center gap-3 border-b pb-4 border-slate-800">
            <div className="p-2.5 rounded-xl bg-teal-500/20 text-teal-400">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Quick 4-Step Contribution Workflow</h2>
              <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                How to get your code merged into GitLegacy in minutes.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                step: '01',
                title: 'Fork & Clone',
                desc: 'Fork Sukhman369/gitlegacy on GitHub and clone locally.',
              },
              {
                step: '02',
                title: 'Create Branch',
                desc: 'Run git checkout -b feat/my-new-preset or feat/my-theme.',
              },
              {
                step: '03',
                title: 'Add Code & Test',
                desc: 'Make changes and test with npm run build & npx tsc --noEmit.',
              },
              {
                step: '04',
                title: 'Submit PR',
                desc: 'Push branch and open a Pull Request. We review and merge quickly!',
              },
            ].map((s) => (
              <div
                key={s.step}
                className={`p-4 rounded-xl border flex flex-col justify-between space-y-2 ${
                  isDarkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-black text-emerald-400">{s.step}</span>
                  <Sparkles className="w-3.5 h-3.5 text-slate-500" />
                </div>
                <div>
                  <h3 className="text-sm font-bold">{s.title}</h3>
                  <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: What Can You Contribute? */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-extrabold tracking-tight">What Would You Like to Add?</h2>
            <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Choose an area below and copy the code template to start building.
            </p>
          </div>

          {/* Guide 1: Presets & Font Patterns */}
          <div className={`p-6 sm:p-8 rounded-2xl border shadow-xl space-y-4 ${
            isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold">1. Contribute New Matrix Presets & Patterns</h3>
                  <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    Add 5x7 matrix pixel art patterns (e.g. Gaming, Tech Logos, Career, Symbols).
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleCopy(presetTemplateSnippet, 'preset-code')}
                className="py-1.5 px-3 rounded-lg text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center gap-1.5 transition-all shadow-sm"
              >
                {copiedSnippet === 'preset-code' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSnippet === 'preset-code' ? 'Copied!' : 'Copy Code Snippet'}</span>
              </button>
            </div>
            <pre className={`p-4 rounded-xl text-xs font-mono overflow-x-auto border ${
              isDarkMode ? 'bg-slate-950 border-slate-800 text-emerald-400' : 'bg-slate-900 border-slate-800 text-emerald-300'
            }`}>
              <code>{presetTemplateSnippet}</code>
            </pre>
          </div>

          {/* Guide 2: Color Themes */}
          <div className={`p-6 sm:p-8 rounded-2xl border shadow-xl space-y-4 ${
            isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400">
                  <Palette className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold">2. Contribute Custom Color Themes</h3>
                  <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    Design new 5-level color gradient palettes (e.g. Synthwave, Solarized, Dracula).
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleCopy(themeTemplateSnippet, 'theme-code')}
                className="py-1.5 px-3 rounded-lg text-xs font-semibold bg-purple-500 hover:bg-purple-400 text-white flex items-center gap-1.5 transition-all shadow-sm"
              >
                {copiedSnippet === 'theme-code' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSnippet === 'theme-code' ? 'Copied!' : 'Copy Code Snippet'}</span>
              </button>
            </div>
            <pre className={`p-4 rounded-xl text-xs font-mono overflow-x-auto border ${
              isDarkMode ? 'bg-slate-950 border-slate-800 text-purple-300' : 'bg-slate-900 border-slate-800 text-purple-300'
            }`}>
              <code>{themeTemplateSnippet}</code>
            </pre>
          </div>

          {/* Guide 3: Tech Stack Shields */}
          <div className={`p-6 sm:p-8 rounded-2xl border shadow-xl space-y-4 ${
            isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold">3. Add Tech Stack Shields & Badges</h3>
                  <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    Include new frameworks, languages, or tools in the Badge Studio gallery.
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleCopy(badgeTemplateSnippet, 'badge-code')}
                className="py-1.5 px-3 rounded-lg text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center gap-1.5 transition-all shadow-sm"
              >
                {copiedSnippet === 'badge-code' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSnippet === 'badge-code' ? 'Copied!' : 'Copy Code Snippet'}</span>
              </button>
            </div>
            <pre className={`p-4 rounded-xl text-xs font-mono overflow-x-auto border ${
              isDarkMode ? 'bg-slate-950 border-slate-800 text-cyan-300' : 'bg-slate-900 border-slate-800 text-cyan-300'
            }`}>
              <code>{badgeTemplateSnippet}</code>
            </pre>
          </div>
        </div>

        {/* Community Open Ideas Callout */}
        <div className="p-6 rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-center space-y-3">
          <h3 className="text-lg font-bold text-emerald-400">Have a New Tool or Feature Idea?</h3>
          <p className={`max-w-xl mx-auto text-xs sm:text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
            Got ideas for 3D isometric contribution visualizers, README generators, or commit analytics? Open an issue on GitHub to discuss with the maintainers!
          </p>
          <a
            href="https://github.com/Sukhman369/gitlegacy/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open GitHub Discussion / Issue</span>
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
