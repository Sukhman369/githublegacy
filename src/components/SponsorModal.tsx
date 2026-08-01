'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Heart, ExternalLink, Coffee, Globe, ShieldCheck } from 'lucide-react';

interface SponsorModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode?: boolean;
}

export const SponsorModal: React.FC<SponsorModalProps> = ({
  isOpen,
  onClose,
  isDarkMode = true,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fadeIn">
      <div
        className={`relative w-full max-w-lg rounded-2xl border p-6 sm:p-8 shadow-2xl transition-all ${
          isDarkMode
            ? 'bg-slate-900 border-slate-800 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-xl transition-colors ${
            isDarkMode
              ? 'text-slate-400 hover:bg-slate-800 hover:text-white'
              : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
          }`}
          title="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-500 border border-rose-500/20">
            <Heart className="h-6 w-6 fill-rose-500 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              Support <span className="text-rose-500">GitLegacy</span>
            </h2>
            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              100% Free & Open-Source. Support future features & hosting.
            </p>
          </div>
        </div>

        {/* Description */}
        <p className={`text-xs sm:text-sm mb-6 leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
          Whether you&apos;re in India or supporting globally, pick your preferred platform to help keep GitLegacy growing:
        </p>

        {/* Options Stack */}
        <div className="space-y-4">
          {/* 🇮🇳 Domestic India Section */}
          <div
            className={`p-4 rounded-xl border transition-all ${
              isDarkMode
                ? 'bg-slate-950/60 border-amber-500/30 hover:border-amber-500/60'
                : 'bg-amber-50/50 border-amber-200 hover:border-amber-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-base">🇮🇳</span>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
                  Domestic Support (India)
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                UPI • Paytm • NetBanking
              </span>
            </div>

            <a
              href="https://www.buymeachai.in/sukhman"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full mt-2 inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-md hover:scale-[1.02] transition-all"
            >
              <div className="flex items-center gap-2">
                <Coffee className="h-4 w-4 fill-slate-950" />
                <span>Buy Me a Chai (BuyMeAChai)</span>
              </div>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* 🌍 International Section */}
          <div
            className={`p-4 rounded-xl border transition-all ${
              isDarkMode
                ? 'bg-slate-950/60 border-emerald-500/30 hover:border-emerald-500/60'
                : 'bg-emerald-50/50 border-emerald-200 hover:border-emerald-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  International Support (Global)
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Cards • PayPal • Apple Pay
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              <a
                href="https://ko-fi.com/sukhman"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-between px-3.5 py-2.5 rounded-xl border font-bold text-xs hover:scale-[1.02] transition-all ${
                  isDarkMode
                    ? 'bg-slate-900 border-slate-800 text-emerald-400 hover:bg-slate-800'
                    : 'bg-white border-emerald-200 text-emerald-700 hover:bg-emerald-50'
                }`}
              >
                <span>Support on Ko-fi</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>

              <a
                href="https://github.com/sponsors/Sukhman369"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-between px-3.5 py-2.5 rounded-xl border font-bold text-xs hover:scale-[1.02] transition-all ${
                  isDarkMode
                    ? 'bg-slate-900 border-slate-800 text-rose-400 hover:bg-slate-800'
                    : 'bg-white border-rose-200 text-rose-700 hover:bg-rose-50'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-rose-400" />
                  <span>GitHub Sponsors</span>
                </div>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Modal Footer Note */}
        <div className="mt-6 pt-4 border-t border-slate-800/60 text-center">
          <p className={`text-[11px] ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
            Thank you for supporting open-source software development! ❤️
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
};
