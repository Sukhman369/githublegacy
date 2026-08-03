'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { useTheme } from '../../../context/ThemeContext';
import {
  Copy,
  Check,
  Download,
  Share2,
  Sparkles,
  Star,
  Search,
  Code,
  ExternalLink,
} from 'lucide-react';
import {
  THEMES,
  MultiYearData,
  generateMultiYearSampleData,
  formatRawContributionsToMultiYear,
  drawMultiYearPoster,
} from '../../../lib/contributions-canvas';

export default function HistoryVisualizerPage() {
  const { isDarkMode } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Form State
  const [usernameInput, setUsernameInput] = useState('sukhman369');
  const [activeUsername, setActiveUsername] = useState('sukhman369');
  const [selectedTheme, setSelectedTheme] = useState('githubClassic');
  const [copiedType, setCopiedType] = useState<string | null>(null);

  // Real Data Fetching State
  const [realMultiYearData, setRealMultiYearData] = useState<MultiYearData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function fetchUserHistory() {
      if (!activeUsername.trim()) return;
      setIsLoading(true);
      try {
        const res = await fetch(`/api/user-contributions?username=${encodeURIComponent(activeUsername)}`);
        if (res.ok) {
          const json = await res.json();
          if (isMounted) {
            const formatted = formatRawContributionsToMultiYear(activeUsername, json);
            setRealMultiYearData(formatted);
          }
        } else {
          if (isMounted) {
            setRealMultiYearData(generateMultiYearSampleData(activeUsername));
          }
        }
      } catch (err) {
        if (isMounted) {
          setRealMultiYearData(generateMultiYearSampleData(activeUsername));
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchUserHistory();
    return () => {
      isMounted = false;
    };
  }, [activeUsername]);

  const activeDataset = realMultiYearData || generateMultiYearSampleData(activeUsername);

  // Draw canvas whenever theme or dataset changes
  useEffect(() => {
    if (canvasRef.current) {
      drawMultiYearPoster(canvasRef.current, activeDataset, selectedTheme);
    }
  }, [activeDataset, selectedTheme]);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameInput.trim()) {
      setActiveUsername(usernameInput.trim());
    }
  };

  const handleDownloadPNG = () => {
    if (!canvasRef.current) return;
    const url = canvasRef.current.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `gitlegacy-${activeUsername}-github-contributions.png`;
    link.href = url;
    link.click();
  };

  const handleCopyImage = async () => {
    if (!canvasRef.current) return;
    try {
      canvasRef.current.toBlob(async (blob) => {
        if (blob && navigator.clipboard) {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob }),
          ]);
          setCopiedType('copy-image');
          setTimeout(() => setCopiedType(null), 2000);
        }
      });
    } catch (err) {
      console.error('Failed to copy canvas image:', err);
    }
  };

  const handleShareMarkdown = () => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://gitlegacy.co';
    const md = `![${activeUsername}'s GitHub Contributions](${baseUrl}/api/u/${encodeURIComponent(activeUsername)}.svg?theme=${selectedTheme})`;
    navigator.clipboard.writeText(md);
    setCopiedType('share-md');
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className={`min-h-screen flex flex-col font-mono transition-colors duration-300 ${
      isDarkMode ? 'bg-[#0d1117] text-slate-100' : 'bg-slate-900 text-slate-100'
    }`}>
      <Header />

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT SIDEBAR: Controls & 14 Theme Swatches (Reduced Width) */}
          <aside className="lg:col-span-3 bg-[#161b22] border border-slate-800 rounded-2xl p-5 space-y-5 shadow-2xl">
            <div className="space-y-1">
              <p className="text-xs text-slate-400 font-semibold tracking-wide">
                All your contributions in one image!
              </p>
            </div>

            {/* Username Input & Generate Form */}
            <form onSubmit={handleGenerate} className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  placeholder="sukhman369"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[#0d1117] border border-slate-700 text-sm font-bold text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none transition-all"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-500 hover:to-indigo-400 text-white flex items-center gap-1.5 shadow-lg transition-all disabled:opacity-50"
                >
                  <Sparkles className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                  <span>{isLoading ? 'Fetching...' : 'Generate!'}</span>
                </button>
              </div>
            </form>

            {/* Theme Selector Section */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <label className="text-xs font-bold tracking-wider text-slate-400 uppercase block">
                SELECT A THEME:
              </label>

              <div className="space-y-1.5 max-h-[480px] overflow-y-auto pr-1 custom-scrollbar">
                {Object.values(THEMES).map((themeItem) => {
                  const isSelected = selectedTheme === themeItem.id;
                  return (
                    <button
                      key={themeItem.id}
                      onClick={() => setSelectedTheme(themeItem.id)}
                      className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-left transition-all ${
                        isSelected
                          ? 'bg-slate-800/90 border-purple-500 text-white ring-1 ring-purple-500/50'
                          : 'bg-[#0d1117]/60 border-slate-800/80 text-slate-300 hover:bg-slate-800/40 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-purple-400 bg-purple-500' : 'border-slate-600'
                        }`}>
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>

                        {/* Swatch Preview Bar */}
                        <div className="flex items-center gap-0.5 p-0.5 rounded bg-slate-900 border border-slate-800">
                          {themeItem.levels.map((lvl, idx) => (
                            <div
                              key={idx}
                              className="w-2.5 h-2.5 rounded-sm"
                              style={{ backgroundColor: lvl }}
                            />
                          ))}
                        </div>

                        <span className="text-xs font-bold tracking-tight">{themeItem.name}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* GitHub Repo Star Link */}
            <div className="pt-2 border-t border-slate-800">
              <a
                href="https://github.com/Sukhman369/githublegacy"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-300 transition-all"
              >
                <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                <span>Star GitLegacy</span>
              </a>
            </div>
          </aside>

          {/* RIGHT MAIN POSTER DISPLAY AREA */}
          <section className="lg:col-span-9 space-y-6">
            
            {/* Header & Actions Bar */}
            <div className="bg-[#161b22] border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
              <h2 className="text-base font-bold text-slate-200">
                Your chart is ready!
              </h2>

              <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
                <button
                  onClick={handleCopyImage}
                  className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  {copiedType === 'copy-image' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedType === 'copy-image' ? 'Copied Image!' : 'Copy'}</span>
                </button>

                <button
                  onClick={handleDownloadPNG}
                  className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>

                <button
                  onClick={handleShareMarkdown}
                  className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  {copiedType === 'share-md' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copiedType === 'share-md' ? 'Copied Markdown!' : 'Share'}</span>
                </button>
              </div>
            </div>

            {/* Poster Canvas Display Box */}
            <div className="p-6 rounded-2xl bg-[#0d1117] border border-slate-800 shadow-2xl flex justify-center items-center overflow-x-auto min-h-[500px]">
              <canvas
                ref={canvasRef}
                className="max-w-full h-auto rounded-xl shadow-2xl transition-all"
              />
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
