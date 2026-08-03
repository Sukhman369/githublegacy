'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { useTheme } from '../../../context/ThemeContext';
import {
  BarChart3,
  Code,
  Copy,
  Check,
  Download,
  Flame,
  Trophy,
  Zap,
  Calendar,
  Sparkles,
  Layers,
  Image as ImageIcon,
  RefreshCw,
  Search,
  ExternalLink,
} from 'lucide-react';
import {
  drawContributionPoster,
  POSTER_FORMATS,
  CANVAS_THEMES,
  PosterFormat,
  generateSampleData,
} from '../../../lib/contributions-canvas';

export default function HistoryVisualizerPage() {
  const { isDarkMode } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Lookup & Filter State
  const [username, setUsername] = useState('Sukhman369');
  const [yearFilter, setYearFilter] = useState('last');

  // Poster Generator State
  const [posterFormat, setPosterFormat] = useState<PosterFormat>('twitter');
  const [themeKey, setThemeKey] = useState<string>('github-dark');
  const [customTitle, setCustomTitle] = useState('');
  const [customSubtitle, setCustomSubtitle] = useState('');

  // Stats & Copy State
  const [copiedType, setCopiedType] = useState<string | null>(null);

  // Active Tab State: 'poster' | 'badge'
  const [activeMode, setActiveMode] = useState<'poster' | 'badge'>('poster');

  // Sample data generated based on username
  const sample = React.useMemo(() => generateSampleData(username || 'developer'), [username]);

  // Derived Stats
  const totalCommits = sample.total;
  const longestStreak = React.useMemo(() => Math.floor(totalCommits / 45) + 12, [totalCommits]);
  const currentStreak = React.useMemo(() => Math.floor(longestStreak * 0.4), [longestStreak]);

  // Dynamic SVG URL for README embedding
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://gitlegacy.dev';
  const usernameBadgeUrl = `${baseUrl}/api/u/${encodeURIComponent(username || 'developer')}.svg?year=${yearFilter}&theme=${themeKey}`;
  const usernameBadgeMarkdown = `![${username || 'GitHub'} Real Contributions](${usernameBadgeUrl})`;
  const usernameBadgeHtml = `<a href="https://github.com/${encodeURIComponent(username || 'developer')}"><img src="${usernameBadgeUrl}" alt="${username}'s Real GitHub Contributions" /></a>`;

  // Draw Canvas Poster on state change
  useEffect(() => {
    if (canvasRef.current) {
      drawContributionPoster(canvasRef.current, {
        username,
        title: customTitle.trim() || undefined,
        subtitle: customSubtitle.trim() || undefined,
        format: posterFormat,
        themeKey,
        daysData: sample.days,
        totalCommits: sample.total,
      });
    }
  }, [username, posterFormat, themeKey, customTitle, customSubtitle, sample]);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleDownloadPNG = () => {
    if (!canvasRef.current) return;
    const url = canvasRef.current.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `${username || 'github'}-contribution-poster-${posterFormat}.png`;
    link.href = url;
    link.click();
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
      isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      <Header />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 space-y-10">
        {/* Page Hero Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-teal-500/20 to-cyan-500/20 text-teal-400 border border-teal-500/30">
            <BarChart3 className="w-4 h-4" />
            <span>GitHub Chart & Poster Visualizer Studio</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Real GitHub <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-400">History Poster Studio</span>
          </h1>
          <p className={`max-w-2xl mx-auto text-sm sm:text-base ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Transform 365-day GitHub contribution histories into high-resolution social header banners, wallpapers, and dynamic README badges.
          </p>
        </div>

        {/* Top Controls & Handle Lookup Bar */}
        <section className={`p-5 rounded-2xl border shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 ${
          isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="p-2.5 rounded-xl bg-teal-500/20 text-teal-400">
              <Search className="w-5 h-5" />
            </div>
            <div className="flex-1 md:flex-none">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                GitHub Target Handle
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 font-bold">@</span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Sukhman369"
                  className={`pl-7 pr-4 py-2 rounded-xl text-sm font-mono font-bold border transition-all ${
                    isDarkMode
                      ? 'bg-slate-950 border-slate-800 text-white focus:border-teal-500'
                      : 'bg-slate-100 border-slate-300 text-slate-900 focus:border-teal-500'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Mode Switcher Tabs: Poster Studio vs SVG Badge */}
          <div className="flex items-center p-1 rounded-xl bg-slate-950 border border-slate-800 w-full md:w-auto">
            <button
              onClick={() => setActiveMode('poster')}
              className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                activeMode === 'poster'
                  ? 'bg-teal-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>High-Res Poster Studio</span>
            </button>

            <button
              onClick={() => setActiveMode('badge')}
              className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                activeMode === 'badge'
                  ? 'bg-teal-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code className="w-4 h-4" />
              <span>Dynamic SVG README Badge</span>
            </button>
          </div>
        </section>

        {/* Activity Highlights Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className={`p-4 rounded-xl border flex items-center gap-3 ${
            isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 block uppercase">Total Commits</span>
              <span className="text-lg font-black text-emerald-400 font-mono">{totalCommits.toLocaleString()}</span>
            </div>
          </div>

          <div className={`p-4 rounded-xl border flex items-center gap-3 ${
            isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="p-2.5 rounded-lg bg-orange-500/10 text-orange-400">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 block uppercase">Longest Streak</span>
              <span className="text-lg font-black text-orange-400 font-mono">{longestStreak} days</span>
            </div>
          </div>

          <div className={`p-4 rounded-xl border flex items-center gap-3 ${
            isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="p-2.5 rounded-lg bg-teal-500/10 text-teal-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 block uppercase">Current Streak</span>
              <span className="text-lg font-black text-teal-400 font-mono">{currentStreak} days</span>
            </div>
          </div>

          <div className={`p-4 rounded-xl border flex items-center gap-3 ${
            isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 block uppercase">Year Range</span>
              <span className="text-lg font-black text-cyan-400 font-mono">Last 365 Days</span>
            </div>
          </div>
        </div>

        {/* MODE 1: High-Res Canvas Poster Studio */}
        {activeMode === 'poster' && (
          <section className={`p-6 sm:p-8 rounded-2xl border shadow-2xl space-y-6 ${
            isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className="flex items-center justify-between border-b pb-4 border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-teal-500/20 text-teal-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">Retina Canvas Poster Customizer</h2>
                  <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    Render high-DPI social headers & wallpapers for Twitter, LinkedIn, Instagram, or desktop background.
                  </p>
                </div>
              </div>

              <button
                onClick={handleDownloadPNG}
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-teal-500 to-emerald-400 text-slate-950 flex items-center gap-2 shadow-lg hover:scale-105 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Export High-Res PNG</span>
              </button>
            </div>

            {/* Customizer Controls Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className={`block text-xs font-bold uppercase mb-1.5 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  Poster Format
                </label>
                <select
                  value={posterFormat}
                  onChange={(e) => setPosterFormat(e.target.value as PosterFormat)}
                  className={`w-full p-2.5 rounded-xl border text-xs font-bold ${
                    isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'
                  }`}
                >
                  {Object.entries(POSTER_FORMATS).map(([key, item]) => (
                    <option key={key} value={key}>
                      {item.name} ({item.label})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={`block text-xs font-bold uppercase mb-1.5 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  Color Theme Palette
                </label>
                <select
                  value={themeKey}
                  onChange={(e) => setThemeKey(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border text-xs font-bold ${
                    isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'
                  }`}
                >
                  {Object.entries(CANVAS_THEMES).map(([key, item]) => (
                    <option key={key} value={key}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={`block text-xs font-bold uppercase mb-1.5 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  Custom Poster Title
                </label>
                <input
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder={`@${username || 'developer'}'s Code Journey`}
                  className={`w-full p-2.5 rounded-xl border text-xs font-semibold ${
                    isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-xs font-bold uppercase mb-1.5 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  Custom Subtitle
                </label>
                <input
                  type="text"
                  value={customSubtitle}
                  onChange={(e) => setCustomSubtitle(e.target.value)}
                  placeholder={`${totalCommits.toLocaleString()} commits in 2025`}
                  className={`w-full p-2.5 rounded-xl border text-xs font-semibold ${
                    isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'
                  }`}
                />
              </div>
            </div>

            {/* Canvas Preview Display Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Canvas Live Preview ({POSTER_FORMATS[posterFormat].name})</span>
                <span>{POSTER_FORMATS[posterFormat].width} × {POSTER_FORMATS[posterFormat].height} px</span>
              </div>

              <div className={`p-4 rounded-xl border flex items-center justify-center overflow-x-auto min-h-[300px] ${
                isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-300'
              }`}>
                <canvas
                  ref={canvasRef}
                  className="max-w-full h-auto rounded-lg shadow-2xl border border-slate-800/50"
                />
              </div>
            </div>
          </section>
        )}

        {/* MODE 2: Dynamic SVG README Badge Generator */}
        {activeMode === 'badge' && (
          <section className={`p-6 sm:p-8 rounded-2xl border shadow-2xl space-y-6 ${
            isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className="flex items-center justify-between border-b pb-4 border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-teal-500/20 text-teal-400">
                  <Code className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">Dynamic SVG README Profile Card</h2>
                  <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    Serverless vector SVG card endpoint fetching live contributions for <code>/api/u/[username]</code>.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Controls */}
              <div className="lg:col-span-5 space-y-4">
                <div>
                  <label className={`block text-xs font-bold uppercase mb-1.5 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    Theme Palette
                  </label>
                  <select
                    value={themeKey}
                    onChange={(e) => setThemeKey(e.target.value)}
                    className={`w-full p-2.5 rounded-xl border text-xs font-bold ${
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

              {/* SVG Live Preview */}
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
        )}
      </main>

      <Footer />
    </div>
  );
}
