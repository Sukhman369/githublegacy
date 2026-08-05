'use client';

import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import {
  Copy,
  Check,
  X,
  Code2,
  Sparkles,
  Download,
  Image as ImageIcon,
  Monitor,
  Maximize2,
  Square,
  Layers,
} from 'lucide-react';
import { CalendarGrid } from '../types/calendar';
import { getThemeById } from '../lib/theme-config';
import {
  exportTwitterBanner,
  exportLinkedInBanner,
  exportInstagramPost,
  exportFullHDBanner,
  exportUltraHDBanner,
} from '../lib/export-engine';

interface SocialShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  textPattern: string;
  year: number;
  grid: CalendarGrid;
  themeId: string;
  isDarkMode: boolean;
}

export const SocialShareModal: React.FC<SocialShareModalProps> = ({
  isOpen,
  onClose,
  textPattern,
  year,
  grid,
  themeId,
  isDarkMode,
}) => {
  const [copiedText, setCopiedText] = useState(false);
  const [copiedMarkdown, setCopiedMarkdown] = useState(false);
  const [downloadedFormat, setDownloadedFormat] = useState<string | null>(null);

  if (!isOpen || typeof window === 'undefined') return null;

  const currentTheme = getThemeById(themeId);
  const isPublicHost =
    typeof window !== 'undefined' &&
    !window.location.hostname.includes('localhost') &&
    !window.location.hostname.includes('127.0.0.1');
  const siteUrl = isPublicHost ? window.location.origin : 'https://gitlegacy.co';

  const shareUrl = `${siteUrl}/tools/art-studio?text=${encodeURIComponent(textPattern)}&year=${year}&theme=${themeId}`;
  const markdownSnippet = `[![My Git Canvas](${siteUrl}/api/badge?text=${encodeURIComponent(textPattern)}&year=${year}&theme=${themeId})](${shareUrl})`;

  const handleCopy = (text: string, type: 'text' | 'markdown') => {
    navigator.clipboard.writeText(text);
    if (type === 'text') {
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000);
    } else if (type === 'markdown') {
      setCopiedMarkdown(true);
      setTimeout(() => setCopiedMarkdown(false), 2000);
    }
  };

  const triggerExport = (formatId: string, exportFn: () => void) => {
    exportFn();
    setDownloadedFormat(formatId);
    setTimeout(() => setDownloadedFormat(null), 2500);
  };

  const bannerPresets = [
    {
      id: 'x-banner',
      title: 'X / Twitter Banner',
      resolution: '1500 × 500 px',
      ratio: '3:1 Aspect',
      badge: 'Profile Header',
      color: 'from-sky-500/20 to-blue-600/10 border-sky-500/30 text-sky-400',
      icon: ImageIcon,
      exportFn: () => exportTwitterBanner(grid, currentTheme, textPattern),
    },
    {
      id: 'linkedin-cover',
      title: 'LinkedIn Cover Banner',
      resolution: '1584 × 396 px',
      ratio: '4:1 Panoramic',
      badge: 'Career Header',
      color: 'from-blue-600/20 to-indigo-600/10 border-blue-500/30 text-blue-400',
      icon: Layers,
      exportFn: () => exportLinkedInBanner(grid, currentTheme, textPattern),
    },
    {
      id: 'instagram-post',
      title: 'Square Social Post',
      resolution: '1080 × 1080 px',
      ratio: '1:1 Square',
      badge: 'Instagram / Feed',
      color: 'from-fuchsia-500/20 to-rose-500/10 border-fuchsia-500/30 text-fuchsia-400',
      icon: Square,
      exportFn: () => exportInstagramPost(grid, currentTheme, textPattern),
    },
    {
      id: 'full-hd',
      title: 'Full HD Widescreen',
      resolution: '1920 × 1080 px',
      ratio: '16:9 1080p',
      badge: 'Wallpaper / Slide',
      color: 'from-emerald-500/20 to-teal-600/10 border-emerald-500/30 text-emerald-400',
      icon: Monitor,
      exportFn: () => exportFullHDBanner(grid, currentTheme, textPattern),
    },
    {
      id: '4k-ultra',
      title: '4K Ultra HD Showcase',
      resolution: '3840 × 2160 px',
      ratio: '4K Crisp',
      badge: 'Ultra HD Canvas',
      color: 'from-purple-500/20 to-amber-500/10 border-purple-500/30 text-purple-300',
      icon: Maximize2,
      exportFn: () => exportUltraHDBanner(grid, currentTheme, textPattern),
    },
  ];

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl transition-all p-6 sm:p-7 space-y-6 ${
          isDarkMode
            ? 'bg-slate-900 border-slate-800 text-white'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-5 right-5 p-2 rounded-full transition-colors ${
            isDarkMode
              ? 'hover:bg-slate-800 text-slate-400 hover:text-white'
              : 'hover:bg-slate-100 text-slate-500 hover:text-slate-900'
          }`}
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 border-b pb-5 border-slate-800/80">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 text-slate-950 shadow-lg shadow-emerald-500/20 shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2">
              <span>Export Artwork & Banners</span>
            </h2>
            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Download high-resolution graphics for your profile headers, slides, or README embeds.
            </p>
          </div>
        </div>

        {/* High-Res Social Banners Suite */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
              isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
            }`}>
              <ImageIcon className="w-3.5 h-3.5" />
              <span>High-Res Artwork Banners & Wallpapers</span>
            </label>
            <span className="text-[11px] font-mono text-slate-400">Retina 2x Crisp PNG</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {bannerPresets.map((preset) => {
              const IconComp = preset.icon;
              const isDownloaded = downloadedFormat === preset.id;

              return (
                <div
                  key={preset.id}
                  className={`p-4 rounded-2xl border bg-gradient-to-br transition-all hover:scale-[1.02] flex flex-col justify-between space-y-3 ${preset.color} ${
                    isDarkMode ? 'bg-slate-950/80' : 'bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-slate-900/60 border border-white/10 shrink-0">
                        <IconComp className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black tracking-tight text-white">
                          {preset.title}
                        </h4>
                        <p className="text-[11px] font-mono text-slate-300">
                          {preset.resolution}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-white/10 text-white border border-white/20">
                      {preset.ratio}
                    </span>
                  </div>

                  <button
                    onClick={() => triggerExport(preset.id, preset.exportFn)}
                    className="w-full py-2 px-3 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
                  >
                    {isDownloaded ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Downloaded!</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Download Banner</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* GitHub README Badge Embed Snippets */}
        <div className="space-y-4 pt-2 border-t border-slate-800/80">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                <Code2 className="w-3.5 h-3.5 text-emerald-500" />
                GitHub README Markdown Snippet
              </span>
              <button
                onClick={() => handleCopy(markdownSnippet, 'markdown')}
                className="text-xs font-semibold text-emerald-400 hover:underline flex items-center gap-1"
              >
                {copiedMarkdown ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Copy Snippet
                  </>
                )}
              </button>
            </div>
            <div
              className={`p-3 rounded-xl border font-mono text-xs overflow-x-auto ${
                isDarkMode ? 'bg-slate-950 border-slate-800 text-emerald-400' : 'bg-slate-100 border-slate-300 text-slate-800'
              }`}
            >
              {markdownSnippet}
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Shareable Web Link
              </span>
              <button
                onClick={() => handleCopy(shareUrl, 'text')}
                className="text-xs font-semibold text-emerald-400 hover:underline flex items-center gap-1"
              >
                {copiedText ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Copy Link
                  </>
                )}
              </button>
            </div>
            <input
              type="text"
              readOnly
              value={shareUrl}
              className={`w-full p-2.5 rounded-xl border font-mono text-xs ${
                isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-300 text-slate-800'
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
