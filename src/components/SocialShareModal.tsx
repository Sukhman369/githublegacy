'use client';

import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import {
  Share2,
  Copy,
  Check,
  X,
  Code2,
  Sparkles,
  ExternalLink,
  Download,
} from 'lucide-react';
import { CalendarGrid } from '../types/calendar';
import { getThemeById } from '../lib/theme-config';
import { exportTwitterBanner, exportLinkedInBanner, exportInstagramPost } from '../lib/export-engine';

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
  const [copiedHtml, setCopiedHtml] = useState(false);

  if (!isOpen || typeof window === 'undefined') return null;

  const currentTheme = getThemeById(themeId);
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://gitlegacy.co';
  const shareText = `Just designed custom contribution graph artwork for my GitHub profile using @GitLegacy! 🚀\n\nPattern: "${textPattern}" (${year})\nCheck it out or plan your own:`;
  const shareUrl = `${siteUrl}/tools/art-studio?text=${encodeURIComponent(textPattern)}&year=${year}&theme=${themeId}`;

  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;

  const markdownSnippet = `[![My Git Canvas](${siteUrl}/api/badge?text=${encodeURIComponent(textPattern)}&year=${year}&theme=${themeId})](${shareUrl})`;
  const htmlSnippet = `<a href="${shareUrl}"><img src="${siteUrl}/api/badge?text=${encodeURIComponent(textPattern)}&year=${year}&theme=${themeId}" alt="GitLegacy Contribution Artwork" /></a>`;

  const handleCopy = (text: string, type: 'text' | 'markdown' | 'html') => {
    navigator.clipboard.writeText(text);
    if (type === 'text') {
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000);
    } else if (type === 'markdown') {
      setCopiedMarkdown(true);
      setTimeout(() => setCopiedMarkdown(false), 2000);
    } else if (type === 'html') {
      setCopiedHtml(true);
      setTimeout(() => setCopiedHtml(false), 2000);
    }
  };

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div
        className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border shadow-2xl transition-all p-6 ${
          isDarkMode
            ? 'bg-slate-900 border-slate-800 text-white'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
            isDarkMode
              ? 'hover:bg-slate-800 text-slate-400 hover:text-white'
              : 'hover:bg-slate-100 text-slate-500 hover:text-slate-900'
          }`}
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-slate-950 shadow-md">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold tracking-tight">Export & Brag</h2>
            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Share your contribution artwork on social media or embed it in your GitHub README.
            </p>
          </div>
        </div>

        {/* Social Share Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <a
            href={twitterShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl font-bold text-sm bg-sky-500 hover:bg-sky-400 text-white shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span>Share on X / Twitter</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>

          <a
            href={linkedinShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-500 text-white shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.72a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8z" />
            </svg>
            <span>Share on LinkedIn</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        </div>

        {/* High-Res Banner Quick Exports */}
        <div className="mb-6 space-y-2">
          <label className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            High-Res Social Banners
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              onClick={() => exportTwitterBanner(grid, currentTheme, textPattern)}
              className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                isDarkMode
                  ? 'bg-slate-800/80 border-slate-700 hover:bg-slate-700 text-slate-200'
                  : 'bg-slate-100 border-slate-300 hover:bg-slate-200 text-slate-800'
              }`}
            >
              <Download className="w-3.5 h-3.5 text-emerald-500" />
              <span>Twitter Banner</span>
            </button>

            <button
              onClick={() => exportLinkedInBanner(grid, currentTheme, textPattern)}
              className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                isDarkMode
                  ? 'bg-slate-800/80 border-slate-700 hover:bg-slate-700 text-slate-200'
                  : 'bg-slate-100 border-slate-300 hover:bg-slate-200 text-slate-800'
              }`}
            >
              <Download className="w-3.5 h-3.5 text-emerald-500" />
              <span>LinkedIn Cover</span>
            </button>

            <button
              onClick={() => exportInstagramPost(grid, currentTheme, textPattern)}
              className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                isDarkMode
                  ? 'bg-slate-800/80 border-slate-700 hover:bg-slate-700 text-slate-200'
                  : 'bg-slate-100 border-slate-300 hover:bg-slate-200 text-slate-800'
              }`}
            >
              <Download className="w-3.5 h-3.5 text-emerald-500" />
              <span>Instagram Post</span>
            </button>
          </div>
        </div>

        {/* GitHub README Badge Embed Snippets */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                <Code2 className="w-3.5 h-3.5 text-emerald-500" />
                GitHub README Markdown Snippet
              </span>
              <button
                onClick={() => handleCopy(markdownSnippet, 'markdown')}
                className="text-xs font-semibold text-emerald-500 hover:underline flex items-center gap-1"
              >
                {copiedMarkdown ? (
                  <>
                    <Check className="w-3 h-3" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" /> Copy Snippet
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
                className="text-xs font-semibold text-emerald-500 hover:underline flex items-center gap-1"
              >
                {copiedText ? (
                  <>
                    <Check className="w-3 h-3" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" /> Copy Link
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
