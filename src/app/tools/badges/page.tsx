'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { useTheme } from '../../../context/ThemeContext';
import { Shield, Sparkles, Copy, Check, Code, ExternalLink, Image as ImageIcon, Search, ShoppingBag, Plus, Trash2, CheckCircle2, Moon, Sun } from 'lucide-react';

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

  // Backend & Frameworks
  { name: 'Node.js', logo: 'nodedotjs', color: '5FA04E', category: 'backend' },
  { name: 'Express.js', logo: 'express', color: '000000', category: 'backend' },
  { name: 'Laravel', logo: 'laravel', color: 'FF2D20', category: 'backend' },
  { name: 'CodeIgniter 4', logo: 'codeigniter', color: 'EF4223', category: 'backend' },
  { name: 'CodeIgniter 3', logo: 'codeigniter', color: 'DD4814', category: 'backend' },
  { name: 'Symfony', logo: 'symfony', color: '000000', category: 'backend' },
  { name: 'NestJS', logo: 'nestjs', color: 'E0234E', category: 'backend' },
  { name: 'Django', logo: 'django', color: '092E20', category: 'backend' },
  { name: 'FastAPI', logo: 'fastapi', color: '009688', category: 'backend' },
  { name: 'Flask', logo: 'flask', color: '000000', category: 'backend' },
  { name: 'Spring Boot', logo: 'springboot', color: '6DB33F', category: 'backend' },
  { name: 'Ruby on Rails', logo: 'rubyonrails', color: 'D30001', category: 'backend' },
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
  const customShieldRef = React.useRef<HTMLDivElement>(null);

  // Search, Category & Style State for Tech Shields
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTechCategory, setSelectedTechCategory] = useState<string>('all');
  const [techBadgeStyle, setTechBadgeStyle] = useState<'for-the-badge' | 'flat' | 'flat-square' | 'plastic' | 'social'>('for-the-badge');
  const [presetBadgeStyle, setPresetBadgeStyle] = useState<'for-the-badge' | 'flat' | 'flat-square' | 'plastic' | 'social'>('for-the-badge');
  const [visibleCount, setVisibleCount] = useState<number>(16);

  // README Background Preview Toggle
  const [previewBgMode, setPreviewBgMode] = useState<'dark' | 'light'>('dark');

  // Tech Stack Basket State
  const [selectedBadges, setSelectedBadges] = useState<string[]>([]);
  const [basketFormat, setBasketFormat] = useState<'centered-html' | 'multiline-md' | 'inline-md'>('centered-html');

  React.useEffect(() => {
    setVisibleCount(16);
  }, [searchQuery, selectedTechCategory]);

  // Shields State
  const [shieldLabel, setShieldLabel] = useState('GitLegacy');
  const [shieldMessage, setShieldMessage] = useState('Developer');
  const [shieldColor, setShieldColor] = useState('10b981');
  const [shieldStyle, setShieldStyle] = useState('for-the-badge');
  const [shieldLogo, setShieldLogo] = useState('github');
  const [shieldLogoColor, setShieldLogoColor] = useState('white');

  // Copy state
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const logoQuery = shieldLogo && shieldLogo !== 'none' ? `&logo=${shieldLogo}&logoColor=${encodeURIComponent(shieldLogoColor)}` : '';
  const customShieldUrl = `https://img.shields.io/badge/${encodeURIComponent(shieldLabel)}-${encodeURIComponent(shieldMessage)}-${shieldColor}?style=${shieldStyle}${logoQuery}`;
  const customShieldMarkdown = `![${shieldLabel}](${customShieldUrl})`;

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedType(id);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleToggleBadgeSelection = (badgeName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedBadges((prev) =>
      prev.includes(badgeName) ? prev.filter((b) => b !== badgeName) : [...prev, badgeName]
    );
  };

  const handleCopyAllBasketMarkdown = () => {
    const selectedObjects = TECH_BADGES.filter((b) => selectedBadges.includes(b.name));
    let outputText = '';

    if (basketFormat === 'centered-html') {
      const imgTags = selectedObjects
        .map((b) => `  <img src="https://img.shields.io/badge/${encodeURIComponent(b.name)}-${b.color}?style=${techBadgeStyle}&logo=${b.logo}&logoColor=white" alt="${b.name}" />`)
        .join('\n');
      outputText = `<p align="center">\n${imgTags}\n</p>`;
    } else if (basketFormat === 'multiline-md') {
      outputText = selectedObjects
        .map((b) => `![${b.name}](https://img.shields.io/badge/${encodeURIComponent(b.name)}-${b.color}?style=${techBadgeStyle}&logo=${b.logo}&logoColor=white)`)
        .join('\n');
    } else {
      outputText = selectedObjects
        .map((b) => `![${b.name}](https://img.shields.io/badge/${encodeURIComponent(b.name)}-${b.color}?style=${techBadgeStyle}&logo=${b.logo}&logoColor=white)`)
        .join(' ');
    }

    handleCopy(outputText, 'basket-all');
  };

  const handleScrollToCustomShield = () => {
    customShieldRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredTechBadges = React.useMemo(() => {
    return TECH_BADGES.filter((b) => {
      const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) || b.logo.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedTechCategory === 'all' || b.category === selectedTechCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedTechCategory]);

  const displayedTechBadges = React.useMemo(() => {
    return filteredTechBadges.slice(0, visibleCount);
  }, [filteredTechBadges, visibleCount]);

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
            <span>Developer Badges & Shields Studio</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Curated Developer <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">Badges & Shields</span>
          </h1>
          <p className={`max-w-2xl mx-auto text-sm sm:text-base ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Explore 50+ tech stack badges and build custom status shields ready to copy & paste into your GitHub profile.
          </p>
          <div className="pt-1 flex items-center justify-center">
            <button
              onClick={handleScrollToCustomShield}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 transition-all shadow-md hover:scale-105 group"
            >
              <Shield className="w-3.5 h-3.5 text-purple-400 group-hover:rotate-12 transition-transform" />
              <span>Custom Shield Generator ⚡</span>
            </button>
          </div>
        </div>

        {/* Studio Section 1: Curated Tech Stack Shields */}
        <section className={`p-6 sm:p-8 rounded-2xl border shadow-2xl space-y-6 ${
          isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold">1. Curated Tech Stack Badges</h2>
                <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Explore {TECH_BADGES.length}+ tech stack badges. Choose badge style and click any shield to copy Markdown snippet.
                </p>
              </div>
            </div>

            {/* Controls: Preview Mode, Badge Style Selector & Search Input */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
              {/* README Background Preview Toggle */}
              <div className="flex items-center p-1 rounded-xl bg-slate-950 border border-slate-800">
                <button
                  onClick={() => setPreviewBgMode('dark')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                    previewBgMode === 'dark'
                      ? 'bg-slate-800 text-cyan-400 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Preview on GitHub Dark theme"
                >
                  <Moon className="w-3 h-3" />
                  <span>Dark</span>
                </button>

                <button
                  onClick={() => setPreviewBgMode('light')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                    previewBgMode === 'light'
                      ? 'bg-slate-200 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Preview on GitHub Light theme"
                >
                  <Sun className="w-3 h-3" />
                  <span>Light</span>
                </button>
              </div>

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

          {/* 1-Click Tech Stack Basket Bar */}
          {selectedBadges.length > 0 && (
            <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/40 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 animate-in fade-in duration-200">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-emerald-300 flex items-center gap-2">
                    <span>Stack Basket ({selectedBadges.length} selected)</span>
                  </h4>
                  <p className="text-[11px] text-slate-400 font-mono">
                    {selectedBadges.slice(0, 5).join(', ')}{selectedBadges.length > 5 ? ` +${selectedBadges.length - 5} more` : ''}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={basketFormat}
                  onChange={(e) => setBasketFormat(e.target.value as any)}
                  className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all ${
                    isDarkMode ? 'bg-slate-900 border-slate-700 text-emerald-300' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                  title="Output Format for GitHub README"
                >
                  <option value="centered-html">Format: &lt;p align="center"&gt; (Clean Profile Grid)</option>
                  <option value="multiline-md">Format: Multiline Markdown (\n)</option>
                  <option value="inline-md">Format: Single-Line Inline</option>
                </select>

                <button
                  onClick={handleCopyAllBasketMarkdown}
                  className="px-4 py-2 rounded-lg text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center gap-1.5 shadow-md transition-all"
                >
                  {copiedType === 'basket-all' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedType === 'basket-all' ? 'Copied Stack Code!' : 'Copy Selected Stack'}</span>
                </button>

                <button
                  onClick={() => setSelectedBadges([])}
                  className="p-2 rounded-lg text-xs font-bold text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
                  title="Clear basket selection"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

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
            <div className="space-y-6">
              <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 p-3.5 rounded-2xl border transition-colors duration-200 ${
                previewBgMode === 'light' ? 'bg-slate-100/90 border-slate-300' : 'bg-slate-950/50 border-slate-800/80'
              }`}>
                {displayedTechBadges.map((badge) => {
                  const url = `https://img.shields.io/badge/${encodeURIComponent(badge.name)}-${badge.color}?style=${techBadgeStyle}&logo=${badge.logo}&logoColor=white`;
                  const md = `![${badge.name}](${url})`;
                  const isCopied = copiedType === badge.name;
                  const isSelected = selectedBadges.includes(badge.name);

                  return (
                    <div
                      key={badge.name}
                      onClick={() => handleCopy(md, badge.name)}
                      className={`relative p-3.5 rounded-xl border flex flex-col items-center gap-2 transition-all cursor-pointer group ${
                        isSelected
                          ? 'bg-emerald-500/20 border-emerald-500 shadow-lg ring-1 ring-emerald-500'
                          : previewBgMode === 'light'
                          ? 'bg-white border-slate-200 hover:border-emerald-500/50 hover:scale-[1.02] shadow-sm'
                          : 'bg-slate-950/80 border-slate-800 hover:border-emerald-500/50 hover:scale-[1.02]'
                      }`}
                    >
                      {/* Select Checkbox Button */}
                      <button
                        onClick={(e) => handleToggleBadgeSelection(badge.name, e)}
                        className={`absolute top-2 right-2 p-1 rounded-md transition-all ${
                          isSelected
                            ? 'bg-emerald-500 text-slate-950'
                            : 'text-slate-500 hover:text-emerald-400 hover:bg-emerald-500/10'
                        }`}
                        title={isSelected ? 'Remove from basket' : 'Add to basket'}
                      >
                        {isSelected ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      </button>

                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={url} alt={badge.name} className="h-7 object-contain max-w-full" />
                      <span className="text-[11px] font-mono font-semibold flex items-center gap-1 text-slate-400">
                        {isCopied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                        {isCopied ? 'Copied!' : 'Copy Code'}
                      </span>
                    </div>
                  );
                })}
              </div>

              {filteredTechBadges.length > visibleCount && (
                <div className="text-center pt-2">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 16)}
                    className="px-6 py-2.5 rounded-xl text-xs font-bold bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 transition-all shadow-lg hover:scale-105 inline-flex items-center gap-2"
                  >
                    <span>Load More Badges (+{filteredTechBadges.length - visibleCount} more)</span>
                  </button>
                </div>
              )}
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

        {/* Studio Section 2: Essential Profile Status Presets */}
        <section className={`p-6 sm:p-8 rounded-2xl border shadow-2xl space-y-6 ${
          isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold">2. Essential README Status Presets</h2>
                <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Quick 1-click status badges commonly used in top open-source repository READMEs.
                </p>
              </div>
            </div>

            <select
              value={presetBadgeStyle}
              onChange={(e) => setPresetBadgeStyle(e.target.value as any)}
              className={`w-full sm:w-auto px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                isDarkMode
                  ? 'bg-slate-950 border-slate-800 text-white'
                  : 'bg-slate-100 border-slate-300 text-slate-900'
              }`}
              title="Select Preset Badge Style"
            >
              <option value="for-the-badge">Style: For The Badge</option>
              <option value="flat">Style: Flat</option>
              <option value="flat-square">Style: Flat Square</option>
              <option value="plastic">Style: Plastic</option>
              <option value="social">Style: Social</option>
            </select>
          </div>

          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-3.5 rounded-2xl border transition-colors duration-200 ${
            previewBgMode === 'light' ? 'bg-slate-100/90 border-slate-300' : 'bg-slate-950/50 border-slate-800/80'
          }`}>
            {[
              { title: 'MIT License', label: 'License', msg: 'MIT', color: 'blue', logo: 'github' },
              { title: 'PRs Welcome', label: 'PRs', msg: 'Welcome', color: 'brightgreen', logo: 'git' },
              { title: 'Build Passing', label: 'Build', msg: 'Passing', color: '4c1', logo: 'githubactions' },
              { title: 'Prettier Style', label: 'Code Style', msg: 'Prettier', color: 'ff69b4', logo: 'vuedotjs' },
              { title: 'Active Maintenance', label: 'Maintained', msg: 'Yes', color: '10b981', logo: 'github' },
              { title: 'Contributions', label: 'Contributions', msg: 'Welcome', color: '06b6d4', logo: 'git' },
              { title: 'Vercel Deployment', label: 'Deployment', msg: 'Vercel', color: '000000', logo: 'vercel' },
              { title: 'Docker Ready', label: 'Container', msg: 'Docker', color: '2496ed', logo: 'docker' },
            ].map((preset) => {
              const url = `https://img.shields.io/badge/${encodeURIComponent(preset.label)}-${encodeURIComponent(preset.msg)}-${preset.color}?style=${presetBadgeStyle}&logo=${preset.logo}&logoColor=white`;
              const md = `![${preset.title}](${url})`;
              const isCopied = copiedType === preset.title;

              return (
                <div
                  key={preset.title}
                  onClick={() => handleCopy(md, preset.title)}
                  className={`p-3.5 rounded-xl border flex flex-col items-center justify-between gap-3 transition-all cursor-pointer group ${
                    previewBgMode === 'light'
                      ? 'bg-white border-slate-200 hover:border-emerald-500/50 hover:scale-[1.02] shadow-sm'
                      : 'bg-slate-950/80 border-slate-800 hover:border-emerald-500/50 hover:scale-[1.02]'
                  }`}
                >
                  <div className="text-center">
                    <span className="text-[11px] font-bold text-slate-400 block mb-1">{preset.title}</span>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt={preset.title} className="h-6 object-contain max-w-full mx-auto" />
                  </div>

                  <span className="text-[10px] font-mono font-semibold flex items-center gap-1 text-slate-400 group-hover:text-emerald-400 transition-colors">
                    {isCopied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    {isCopied ? 'Copied!' : 'Copy Code'}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Studio Section 3: Custom Shield Builder */}
        <section ref={customShieldRef} className={`p-6 sm:p-8 rounded-2xl border shadow-2xl space-y-6 scroll-mt-6 ${
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className={`block text-xs font-bold uppercase mb-1.5 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                Label Text
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
                Message Text
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
                Badge Style
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

            <div>
              <label className={`block text-xs font-bold uppercase mb-1.5 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                Brand Logo Icon
              </label>
              <select
                value={shieldLogo}
                onChange={(e) => setShieldLogo(e.target.value)}
                className={`w-full p-2.5 rounded-xl border text-sm font-semibold ${
                  isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'
                }`}
              >
                <option value="github">GitHub</option>
                <option value="react">React</option>
                <option value="typescript">TypeScript</option>
                <option value="python">Python</option>
                <option value="nodedotjs">Node.js</option>
                <option value="docker">Docker</option>
                <option value="amazonwebservices">AWS</option>
                <option value="nextdotjs">Next.js</option>
                <option value="git">Git</option>
                <option value="none">No Logo</option>
              </select>
            </div>
          </div>

          {/* Color Selector & Presets */}
          <div className="space-y-2">
            <label className={`block text-xs font-bold uppercase ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              Badge Color Palette
            </label>
            <div className="flex flex-wrap items-center gap-2">
              {[
                { name: 'Emerald', hex: '10b981' },
                { name: 'Cyber Cyan', hex: '06b6d4' },
                { name: 'Neon Purple', hex: '8b5cf6' },
                { name: 'Amber', hex: 'f59e0b' },
                { name: 'Rose', hex: 'f43f5e' },
                { name: 'Electric Blue', hex: '2563eb' },
                { name: 'Midnight', hex: '1e293b' },
                { name: 'Dark Red', hex: 'dc2626' },
              ].map((c) => (
                <button
                  key={c.hex}
                  onClick={() => setShieldColor(c.hex)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                    shieldColor === c.hex
                      ? 'ring-2 ring-purple-500 scale-105 shadow-md'
                      : 'opacity-80 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: `#${c.hex}`, color: '#ffffff' }}
                >
                  <span>{c.name}</span>
                </button>
              ))}

              <div className="flex items-center gap-1.5 ml-auto">
                <span className="text-xs text-slate-400 font-mono">Hex:</span>
                <input
                  type="text"
                  value={shieldColor}
                  onChange={(e) => setShieldColor(e.target.value.replace('#', ''))}
                  className={`w-24 p-1.5 rounded-lg border text-xs font-mono font-semibold uppercase ${
                    isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'
                  }`}
                  maxLength={6}
                />
              </div>
            </div>
          </div>

          <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl border transition-colors duration-200 ${
            previewBgMode === 'light' ? 'bg-slate-100 border-slate-300' : 'bg-slate-950 border-slate-800'
          }`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={customShieldUrl} alt="Custom Shield Preview" className="h-8 object-contain max-w-full" />

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
