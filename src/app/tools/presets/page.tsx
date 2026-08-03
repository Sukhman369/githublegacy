'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { PresetMiniGrid } from '../../../components/PresetMiniGrid';
import { PRESET_PATTERNS } from '../../../lib/font-matrix';
import { useTheme } from '../../../context/ThemeContext';
import { Sparkles, Play, Search, Star, RotateCcw } from 'lucide-react';

const FAVORITES_STORAGE_KEY = 'gitlegacy_preset_favorites';

export default function PresetsPage() {
  const { isDarkMode } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // Load favorites from localStorage on mount
  useEffect(() => {
    setIsMounted(true);
    try {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load favorites from localStorage', e);
    }
  }, []);

  // Toggle favorite status
  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        console.error('Failed to save favorites to localStorage', e);
      }
      return next;
    });
  };

  // Filtered preset patterns calculation
  const filteredPresets = useMemo(() => {
    return PRESET_PATTERNS.filter((preset) => {
      // Category filter
      if (selectedCategory === 'favorites') {
        if (!favorites.includes(preset.id)) return false;
      } else if (selectedCategory !== 'all' && preset.category !== selectedCategory) {
        return false;
      }

      // Search query filter
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        preset.name.toLowerCase().includes(q) ||
        preset.text.toLowerCase().includes(q) ||
        preset.description.toLowerCase().includes(q) ||
        (preset.category && preset.category.toLowerCase().includes(q))
      );
    });
  }, [selectedCategory, searchQuery, favorites]);

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
        isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-10 w-full space-y-8">
        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider ${
              isDarkMode
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                : 'bg-emerald-50 border-emerald-200 text-emerald-700'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Contribution Art Gallery</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Pre-made <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">Template Gallery</span>
          </h1>

          <p className={`text-base sm:text-lg ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Explore popular preset patterns for gaming, career branding, tech stack logos, and signature artwork with live 53-week matrix previews.
          </p>

          {/* Search Input Bar */}
          <div className="max-w-md mx-auto relative pt-2">
            <Search className="w-4 h-4 absolute left-3.5 top-[calc(50%+4px)] -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search templates (e.g. INVADERS, HIRE)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                isDarkMode
                  ? 'bg-slate-900 border-slate-800 text-white placeholder:text-slate-500 focus:border-emerald-500'
                  : 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 shadow-sm'
              }`}
            />
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {[
            { id: 'all', label: 'All Templates' },
            { id: 'signature', label: 'Signature' },
            { id: 'gaming', label: '🕹️ Gaming' },
            { id: 'career', label: '💼 Career' },
            { id: 'tech', label: '💻 Tech Stack' },
            { id: 'favorites', label: `⭐ Favorites (${isMounted ? favorites.length : 0})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedCategory === tab.id
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : isDarkMode
                  ? 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Preset Cards Grid */}
        {filteredPresets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPresets.map((preset) => {
              const isFav = favorites.includes(preset.id);
              const artStudioUrl = `/tools/art-studio?text=${encodeURIComponent(preset.text)}`;

              return (
                <div
                  key={preset.id}
                  className={`rounded-2xl border p-5 flex flex-col justify-between space-y-4 transition-all hover:scale-[1.01] ${
                    isDarkMode
                      ? 'bg-slate-900/90 border-slate-800 text-slate-100 shadow-xl'
                      : 'bg-white border-slate-200 text-slate-900 shadow-sm'
                  }`}
                >
                  {/* Card Header & Category Badge */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                      {preset.category ? preset.category.toUpperCase() : 'PRESET'}
                    </span>

                    <button
                      onClick={() => toggleFavorite(preset.id)}
                      title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                      className="p-1.5 rounded-lg hover:bg-slate-800/50 transition-colors"
                    >
                      <Star
                        className={`w-5 h-5 transition-all ${
                          isFav
                            ? 'fill-amber-400 text-amber-400 scale-110'
                            : 'text-slate-500 hover:text-amber-400'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1">
                    <h3 className={`text-xl font-black font-mono tracking-wider ${
                      isDarkMode ? 'text-white' : 'text-slate-900'
                    }`}>
                      &quot;{preset.text}&quot;
                    </h3>
                    <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      {preset.description}
                    </p>
                  </div>

                  {/* Visual 53-Week Mini Grid Preview (Zero scrollbar SVG) */}
                  <PresetMiniGrid
                    text={preset.text}
                    isDarkMode={isDarkMode}
                  />

                  {/* Card Action Footer */}
                  <div className={`pt-3 border-t flex items-center justify-between ${
                    isDarkMode ? 'border-slate-800/80' : 'border-slate-100'
                  }`}>
                    <span className="text-[11px] text-slate-400 font-mono">
                      1-Click Load
                    </span>

                    <Link
                      href={artStudioUrl}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs hover:scale-105 transition-all shadow-md"
                    >
                      <Play className="h-3.5 w-3.5 fill-slate-950" />
                      <span>Open in Studio</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 space-y-3">
            <p className="text-base font-semibold text-slate-400">
              No template presets match your current filter selection.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 text-xs font-bold text-emerald-400 hover:bg-slate-700 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
