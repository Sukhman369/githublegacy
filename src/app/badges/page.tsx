'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { useTheme } from '../../context/ThemeContext';
import { Shield, Sparkles, Copy, Check, Code, ExternalLink, Image as ImageIcon, Search } from 'lucide-react';

interface TechBadge {
  name: string;
  logo: string;
  color: string;
  labelColor?: string;
  category: 'frontend' | 'backend' | 'languages' | 'databases' | 'devops';
}

const TECH_BADGES: TechBadge[] = [
  // Frontend & UI
  { name: 'Next.js', logo: 'nextdotjs', color: '000000', category: 'frontend' },
  { name: 'React', logo: 'react', color: '61DAFB', category: 'frontend' },
  { name: 'Vue.js', logo: 'vuedotjs', color: '4FC08D', category: 'frontend' },
  { name: 'Angular', logo: 'angular', color: 'DD0031', category: 'frontend' },
  { name: 'Svelte', logo: 'svelte', color: 'FF3E00', category: 'frontend' },
  { name: 'TailwindCSS', logo: 'tailwindcss', color: '06B6D4', category: 'frontend' },
  { name: 'Redux', logo: 'redux', color: '764ABC', category: 'frontend' },
  { name: 'Sass', logo: 'sass', color: 'CC6699', category: 'frontend' },
  { name: 'Vite', logo: 'vite', color: '646CFF', category: 'frontend' },
  { name: 'HTML5', logo: 'html5', color: 'E34F26', category: 'frontend' },
  { name: 'CSS3', logo: 'css3', color: '1572B6', category: 'frontend' },

  // Languages
  { name: 'TypeScript', logo: 'typescript', color: '3178C6', category: 'languages' },
  { name: 'JavaScript', logo: 'javascript', color: 'F7DF1E', category: 'languages' },
  { name: 'Python', logo: 'python', color: '3776AB', category: 'languages' },
  { name: 'Java', logo: 'openjdk', color: 'ED8B00', category: 'languages' },
  { name: 'C++', logo: 'cplusplus', color: '00599C', category: 'languages' },
  { name: 'C#', logo: 'csharp', color: '239120', category: 'languages' },
  { name: 'Go', logo: 'go', color: '00ADD8', category: 'languages' },
  { name: 'Rust', logo: 'rust', color: '000000', category: 'languages' },
  { name: 'PHP', logo: 'php', color: '777BB4', category: 'languages' },
  { name: 'Ruby', logo: 'ruby', color: 'CC342D', category: 'languages' },
  { name: 'Swift', logo: 'swift', color: 'F05138', category: 'languages' },
  { name: 'Kotlin', logo: 'kotlin', color: '7F52FF', category: 'languages' },

  // Backend
  { name: 'Node.js', logo: 'nodedotjs', color: '5FA04E', category: 'backend' },
  { name: 'Express.js', logo: 'express', color: '000000', category: 'backend' },
  { name: 'Django', logo: 'django', color: '092E20', category: 'backend' },
  { name: 'FastAPI', logo: 'fastapi', color: '009688', category: 'backend' },
  { name: 'Spring Boot', logo: 'springboot', color: '6DB33F', category: 'backend' },
  { name: 'Laravel', logo: 'laravel', color: 'FF2D20', category: 'backend' },
  { name: '.NET', logo: 'dotnet', color: '512BD4', category: 'backend' },
  { name: 'GraphQL', logo: 'graphql', color: 'E10098', category: 'backend' },

  // Databases & Storage
  { name: 'PostgreSQL', logo: 'postgresql', color: '4169E1', category: 'databases' },
  { name: 'MongoDB', logo: 'mongodb', color: '47A248', category: 'databases' },
  { name: 'MySQL', logo: 'mysql', color: '4479A1', category: 'databases' },
  { name: 'Redis', logo: 'redis', color: 'DC382D', category: 'databases' },
  { name: 'SQLite', logo: 'sqlite', color: '003B57', category: 'databases' },
  { name: 'Supabase', logo: 'supabase', color: '3FCF8E', category: 'databases' },
  { name: 'Firebase', logo: 'firebase', color: 'FFCA28', category: 'databases' },
  { name: 'Prisma', logo: 'prisma', color: '2D3748', category: 'databases' },

  // DevOps & Cloud
  { name: 'Docker', logo: 'docker', color: '2496ED', category: 'devops' },
  { name: 'Kubernetes', logo: 'kubernetes', color: '326CE5', category: 'devops' },
  { name: 'AWS', logo: 'amazonwebservices', color: '232F3E', category: 'devops' },
  { name: 'Google Cloud', logo: 'googlecloud', color: '4285F4', category: 'devops' },
  { name: 'Vercel', logo: 'vercel', color: '000000', category: 'devops' },
  { name: 'Linux', logo: 'linux', color: 'FCC624', category: 'devops' },
  { name: 'Git', logo: 'git', color: 'F05032', category: 'devops' },
  { name: 'GitHub Actions', logo: 'githubactions', color: '2088FF', category: 'devops' },
];

export default function BadgesStudioPage() {
  const { isDarkMode } = useTheme();
  
  // Custom Canvas Badge State
  const [badgeText, setBadgeText] = useState('LORD');
  const [badgeYear, setBadgeYear] = useState(`${new Date().getFullYear()}`);
  const [badgeStyle, setBadgeStyle] = useState<'card' | 'compact'>('card');
  const [badgeTheme, setBadgeTheme] = useState('github-dark');

  // Username Badge State
  const [username, setUsername] = useState('Sukhman369');
  const [userBadgeTheme, setUserBadgeTheme] = useState('github-dark');
  const [userBadgeYear, setUserBadgeYear] = useState('last');

  // Search, Category & Style State for Tech Shields
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTechCategory, setSelectedTechCategory] = useState<string>('all');
  const [techBadgeStyle, setTechBadgeStyle] = useState<'for-the-badge' | 'flat' | 'flat-square' | 'plastic' | 'social'>('for-the-badge');

  // Shields State
  const [shieldLabel, setShieldLabel] = useState('GitLegacy');
  const [shieldMessage, setShieldMessage] = useState('Canvas Art');
  const [shieldColor, setShieldColor] = useState('10b981');
  const [shieldStyle, setShieldStyle] = useState('for-the-badge');

  // Copy state
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://gitlegacy.dev';
  
  const canvasBadgeUrl = `${baseUrl}/api/badge?text=${encodeURIComponent(badgeText)}&year=${badgeYear}&theme=${badgeTheme}&style=${badgeStyle}`;
  const canvasBadgeMarkdown = `![GitLegacy Canvas](${canvasBadgeUrl})`;
  const canvasBadgeHtml = `<a href="${baseUrl}"><img src="${canvasBadgeUrl}" alt="GitLegacy Contribution Canvas" /></a>`;

  const usernameBadgeUrl = `${baseUrl}/api/u/${encodeURIComponent(username || 'developer')}.svg?year=${userBadgeYear}&theme=${userBadgeTheme}`;
  const usernameBadgeMarkdown = `![${username || 'GitHub'} Real Contributions](${usernameBadgeUrl})`;
  const usernameBadgeHtml = `<a href="https://github.com/${encodeURIComponent(username || 'developer')}"><img src="${usernameBadgeUrl}" alt="${username}'s Real GitHub Contributions" /></a>`;

  const customShieldUrl = `https://img.shields.io/badge/${encodeURIComponent(shieldLabel)}-${encodeURIComponent(shieldMessage)}-${shieldColor}?style=${shieldStyle}`;
  const customShieldMarkdown = `![${shieldLabel}](${customShieldUrl})`;

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedType(id);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const filteredTechBadges = React.useMemo(() => {
    return TECH_BADGES.filter((b) => {
      const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) || b.logo.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedTechCategory === 'all' || b.category === selectedTechCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedTechCategory]);

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
      isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      <Header />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 space-y-10">
        {/* Page Hero Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-400 border border-emerald-500/30">
            <Shield className="w-3.5 h-3.5" />
            <span>Developer Profile Badge Studio</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">GitHub README</span>
          </h1>
          <p className={`max-w-2xl mx-auto text-sm sm:text-base ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Generate dynamic live SVG artwork badges, tech stack shields, and contribution widgets ready to copy & paste into your profile.
          </p>
        </div>

        {/* Studio Section 1: Live GitLegacy Artwork Canvas Badge */}
        <section className={`p-6 sm:p-8 rounded-2xl border shadow-2xl space-y-6 ${
          isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between border-b pb-4 border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold">1. Live Contribution Canvas SVG Badge</h2>
                <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Dynamic serverless SVG badge showing your custom contribution graph artwork.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Controls */}
            <div className="lg:col-span-5 space-y-4">
              <div>
                <label className={`block text-xs font-bold uppercase mb-1.5 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  Text Pattern
                </label>
                <input
                  type="text"
                  value={badgeText}
                  onChange={(e) => setBadgeText(e.target.value.toUpperCase())}
                  className={`w-full p-2.5 rounded-xl border text-sm font-mono uppercase ${
                    isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'
                  }`}
                  maxLength={16}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`block text-xs font-bold uppercase mb-1.5 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    Target Year
                  </label>
                  <input
                    type="number"
                    value={badgeYear}
                    onChange={(e) => setBadgeYear(e.target.value)}
                    className={`w-full p-2.5 rounded-xl border text-sm font-mono ${
                      isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-bold uppercase mb-1.5 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    Badge Layout
                  </label>
                  <select
                    value={badgeStyle}
                    onChange={(e) => setBadgeStyle(e.target.value as 'card' | 'compact')}
                    className={`w-full p-2.5 rounded-xl border text-sm font-semibold ${
                      isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'
                    }`}
                  >
                    <option value="card">Full Card</option>
                    <option value="compact">Compact Header</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Live SVG Badge Preview */}
            <div className="lg:col-span-7 space-y-3">
              <label className={`block text-xs font-bold uppercase ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Live Preview
              </label>
              <div className={`p-4 rounded-xl border flex items-center justify-center overflow-x-auto ${
                isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-300'
              }`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={canvasBadgeUrl}
                  alt="GitLegacy Canvas Badge Preview"
                  className="max-w-full h-auto rounded-lg shadow-lg"
                />
              </div>

              {/* Code Snippets */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleCopy(canvasBadgeMarkdown, 'canvas-md')}
                  className="flex-1 py-2 px-3 rounded-lg text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center gap-1.5 shadow-md transition-all"
                >
                  {copiedType === 'canvas-md' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedType === 'canvas-md' ? 'Copied Markdown!' : 'Copy Markdown Code'}</span>
                </button>

                <button
                  onClick={() => handleCopy(canvasBadgeHtml, 'canvas-html')}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold border flex items-center gap-1.5 transition-all ${
                    isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-200' : 'bg-slate-200 border-slate-300 hover:bg-slate-300 text-slate-800'
                  }`}
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>Copy HTML</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Studio Section 2: Real GitHub User Contribution Visualizer Callout */}
        <section className={`p-6 rounded-2xl border shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 ${
          isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-teal-500/20 text-teal-400">
              <Code className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold">Real GitHub History Visualizer Tool</h2>
              <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Looking to generate dynamic 365-day live contribution graph badges for `@username`? Check out the dedicated tool page.
              </p>
            </div>
          </div>
          <Link
            href="/history-visualizer"
            className="w-full sm:w-auto py-2.5 px-5 rounded-xl text-xs font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 flex items-center justify-center gap-2 shadow-md transition-all whitespace-nowrap"
          >
            <span>Open History Visualizer</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </section>

        {/* Studio Section 3: Curated Tech Stack Shields */}
        <section className={`p-6 sm:p-8 rounded-2xl border shadow-2xl space-y-6 ${
          isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold">3. Curated Tech Stack Shields</h2>
                <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Explore {TECH_BADGES.length}+ tech stack badges. Choose badge style and click any shield to copy Markdown snippet.
                </p>
              </div>
            </div>

            {/* Controls: Badge Style Selector & Search Input */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
              <select
                value={techBadgeStyle}
                onChange={(e) => setTechBadgeStyle(e.target.value as any)}
                className={`w-full sm:w-auto px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                  isDarkMode
                    ? 'bg-slate-950 border-slate-800 text-white'
                    : 'bg-slate-100 border-slate-300 text-slate-900'
                }`}
                title="Select Badge Style"
              >
                <option value="for-the-badge">Style: For The Badge</option>
                <option value="flat">Style: Flat</option>
                <option value="flat-square">Style: Flat Square</option>
                <option value="plastic">Style: Plastic</option>
                <option value="social">Style: Social</option>
              </select>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search technology..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    isDarkMode
                      ? 'bg-slate-950 border-slate-800 text-white placeholder:text-slate-500 focus:border-cyan-500'
                      : 'bg-slate-100 border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-cyan-500'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Stack' },
              { id: 'languages', label: 'Languages' },
              { id: 'frontend', label: 'Frontend & UI' },
              { id: 'backend', label: 'Backend' },
              { id: 'databases', label: 'Databases' },
              { id: 'devops', label: 'DevOps & Cloud' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTechCategory(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedTechCategory === tab.id
                    ? 'bg-cyan-500 text-slate-950 shadow-md'
                    : isDarkMode
                    ? 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tech Badges Grid */}
          {filteredTechBadges.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {filteredTechBadges.map((badge) => {
                const url = `https://img.shields.io/badge/${encodeURIComponent(badge.name)}-${badge.color}?style=${techBadgeStyle}&logo=${badge.logo}&logoColor=white`;
                const md = `![${badge.name}](${url})`;
                const isCopied = copiedType === badge.name;

                return (
                  <button
                    key={badge.name}
                    onClick={() => handleCopy(md, badge.name)}
                    className={`p-3.5 rounded-xl border flex flex-col items-center gap-2 transition-all hover:scale-105 ${
                      isDarkMode
                        ? 'bg-slate-950/80 border-slate-800 hover:border-emerald-500/50'
                        : 'bg-slate-50 border-slate-200 hover:border-emerald-500/50'
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt={badge.name} className="h-7 object-contain max-w-full" />
                    <span className="text-[11px] font-mono font-semibold flex items-center gap-1 text-slate-400">
                      {isCopied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      {isCopied ? 'Copied!' : 'Copy Code'}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-10 space-y-2">
              <p className="text-sm font-semibold text-slate-400">No technology badges found for &quot;{searchQuery}&quot;</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTechCategory('all');
                }}
                className="text-xs font-bold text-cyan-400 hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>

        {/* Studio Section 3: Custom Shield Builder */}
        <section className={`p-6 sm:p-8 rounded-2xl border shadow-2xl space-y-6 ${
          isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between border-b pb-4 border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold">3. Custom Status Shield Generator</h2>
                <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Customize labels, messages, and colors for bespoke GitHub badges.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className={`block text-xs font-bold uppercase mb-1.5 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                Label
              </label>
              <input
                type="text"
                value={shieldLabel}
                onChange={(e) => setShieldLabel(e.target.value)}
                className={`w-full p-2.5 rounded-xl border text-sm font-semibold ${
                  isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-bold uppercase mb-1.5 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                Message
              </label>
              <input
                type="text"
                value={shieldMessage}
                onChange={(e) => setShieldMessage(e.target.value)}
                className={`w-full p-2.5 rounded-xl border text-sm font-semibold ${
                  isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-bold uppercase mb-1.5 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                Style
              </label>
              <select
                value={shieldStyle}
                onChange={(e) => setShieldStyle(e.target.value)}
                className={`w-full p-2.5 rounded-xl border text-sm font-semibold ${
                  isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'
                }`}
              >
                <option value="for-the-badge">For The Badge</option>
                <option value="flat">Flat</option>
                <option value="flat-square">Flat Square</option>
                <option value="plastic">Plastic</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl border border-slate-800 bg-slate-950">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={customShieldUrl} alt="Custom Shield Preview" className="h-8 object-contain" />

            <button
              onClick={() => handleCopy(customShieldMarkdown, 'custom-shield')}
              className="w-full sm:w-auto py-2.5 px-5 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              {copiedType === 'custom-shield' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedType === 'custom-shield' ? 'Copied Markdown!' : 'Copy Shield Markdown'}</span>
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
