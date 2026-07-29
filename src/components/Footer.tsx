'use client';

import React from 'react';
import { Calendar, Heart, Github, Code2, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-slate-800 bg-slate-950 py-10 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Calendar className="h-4 w-4" />
          </div>
          <div>
            <div className="font-mono text-base font-extrabold text-white">
              Git<span className="text-emerald-400">Legacy</span>
            </div>
            <p className="text-xs text-slate-400">
              Interactive GitHub Contribution Graph Art & Strategy Planner
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            Crafted with <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" /> for Developers
          </span>
          <span>•</span>
          <a
            href="https://github.com/Sukhman369/githublegacy.git"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-emerald-400 transition-colors"
          >
            <Github className="h-3.5 w-3.5" />
            <span>GitHub Repository</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
