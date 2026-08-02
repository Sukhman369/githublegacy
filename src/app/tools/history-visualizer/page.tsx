'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { useTheme } from '../../../context/ThemeContext';
import { BarChart3, Code, Copy, Check, UserCheck } from 'lucide-react';

export default function HistoryVisualizerPage() {
  const { isDarkMode } = useTheme();
  const [username, setUsername] = useState('Sukhman369');
  const [userBadgeTheme, setUserBadgeTheme] = useState('github-dark');
  const [userBadgeYear, setUserBadgeYear] = useState('last');
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://gitlegacy.dev';

  const usernameBadgeUrl = `${baseUrl}/api/u/${encodeURIComponent(username || 'developer')}.svg?year=${userBadgeYear}&theme=${userBadgeTheme}`;
  const usernameBadgeMarkdown = `![${username || 'GitHub'} Real Contributions](${usernameBadgeUrl})`;
  const usernameBadgeHtml = `<a href="https://github.com/${encodeURIComponent(username || 'developer')}"><img src="${usernameBadgeUrl}" alt="${username}'s Real GitHub Contributions" /></a>`;

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      <Header />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-10 space-y-10">
        {/* Page Hero Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-500/10 text-teal-400 border border-teal-500/20">
            <BarChart3 className="w-4 h-4" />
            <span>GitLegacy Sub-Tool</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Real GitHub <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-400">History Visualizer</span>
          </h1>
          <p className={`max-w-2xl mx-auto text-sm sm:text-base ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Fetch live 365-day contribution history for any handle (@username) and generate dynamic SVG profile cards for your README.md.
          </p>
        </div>

        {/* Visualizer Card */}
        <section className={`p-6 sm:p-8 rounded-2xl border shadow-2xl space-y-6 ${
          isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between border-b pb-4 border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-teal-500/20 text-teal-400">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold">Fetch Historical Contribution Graph</h2>
                <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Serverless SVG generator fetching real public contributions via <code>/api/u/[username]</code>.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Input Controls */}
            <div className="lg:col-span-5 space-y-4">
              <div>
                <label className={`block text-xs font-bold uppercase mb-1.5 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  GitHub Handle
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-500">@</span>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Sukhman369"
                    className={`w-full pl-7 pr-3 py-2.5 rounded-xl border text-sm font-mono ${
                      isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`block text-xs font-bold uppercase mb-1.5 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    Year Filter
                  </label>
                  <select
                    value={userBadgeYear}
                    onChange={(e) => setUserBadgeYear(e.target.value)}
                    className={`w-full p-2.5 rounded-xl border text-sm font-semibold ${
                      isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'
                    }`}
                  >
                    <option value="last">Last 365 Days</option>
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-xs font-bold uppercase mb-1.5 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    Theme Palette
                  </label>
                  <select
                    value={userBadgeTheme}
                    onChange={(e) => setUserBadgeTheme(e.target.value)}
                    className={`w-full p-2.5 rounded-xl border text-sm font-semibold ${
                      isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'
                    }`}
                  >
                    <option value="github-dark">GitHub Dark</option>
                    <option value="github-light">GitHub Light</option>
                    <option value="emerald-matrix">Emerald Matrix</option>
                    <option value="cyberpunk">Cyberpunk Neon</option>
                    <option value="dracula">Dracula Vamp</option>
                  </select>
                </div>
              </div>

              <div className={`p-4 rounded-xl border space-y-2 ${
                isDarkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-400">Direct SVG URL</span>
                  <span className="text-emerald-400 font-mono">100% Vector</span>
                </div>
                <code className="block p-2 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-teal-300 break-all select-all">
                  {usernameBadgeUrl}
                </code>
              </div>
            </div>

            {/* Live SVG Preview */}
            <div className="lg:col-span-7 space-y-3">
              <label className={`block text-xs font-bold uppercase ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Live Vector SVG Preview (`/api/u/{username || 'username'}.svg`)
              </label>
              <div className={`p-5 rounded-xl border flex items-center justify-center overflow-x-auto min-h-[200px] ${
                isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-300'
              }`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={usernameBadgeUrl}
                  alt={`${username}'s Real GitHub Contribution History`}
                  className="max-w-full h-auto rounded-lg shadow-lg"
                />
              </div>

              {/* Code Snippets */}
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => handleCopy(usernameBadgeMarkdown, 'user-md')}
                  className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  {copiedType === 'user-md' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedType === 'user-md' ? 'Copied Markdown!' : 'Copy Profile Markdown'}</span>
                </button>

                <button
                  onClick={() => handleCopy(usernameBadgeHtml, 'user-html')}
                  className={`py-2.5 px-4 rounded-xl text-xs font-semibold border flex items-center justify-center gap-2 transition-all ${
                    isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-200' : 'bg-slate-200 border-slate-300 hover:bg-slate-300 text-slate-800'
                  }`}
                >
                  <Code className="w-4 h-4" />
                  <span>Copy HTML</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
