'use client';

import React from 'react';
import { Calendar, Github, Sparkles, Code2, ShieldCheck } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-500 shadow-lg shadow-emerald-500/20">
            <Calendar className="h-5 w-5 text-slate-950 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xl font-extrabold tracking-tight text-white">
                Git<span className="text-emerald-400">Legacy</span>
              </span>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
                v1.0 MVP
              </span>
            </div>
            <p className="text-xs text-slate-400 font-sans hidden sm:block">
              Design your GitHub legacy before you write code
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 text-xs font-medium text-slate-400 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Zero Backend Required • Instant Generation</span>
          </div>

          <a
            href="https://github.com/Sukhman369/githublegacy.git"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-semibold text-slate-200 border border-slate-800 transition-all hover:bg-slate-800 hover:text-white hover:border-slate-700"
          >
            <Github className="h-4 w-4 text-slate-300" />
            <span className="hidden sm:inline">GitHub Repository</span>
          </a>
        </div>
      </div>
    </header>
  );
};
