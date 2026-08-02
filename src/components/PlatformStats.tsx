'use client';

import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { ShieldCheck, Lock, Sparkles, Code2 } from 'lucide-react';

const STATS = [
  {
    id: 'planned',
    label: 'Contributions Planned',
    value: '50,000+',
    icon: Sparkles,
    color: 'text-emerald-400',
  },
  {
    id: 'privacy',
    label: 'Client-Side Privacy',
    value: '100%',
    icon: Lock,
    color: 'text-teal-400',
  },
  {
    id: 'tokens',
    label: 'GitHub Tokens Needed',
    value: '0',
    icon: ShieldCheck,
    color: 'text-cyan-400',
  },
  {
    id: 'badges',
    label: 'Badges & Shields Available',
    value: '40+',
    icon: Code2,
    color: 'text-purple-400',
  },
];

export function PlatformStats() {
  const { isDarkMode } = useTheme();

  return (
    <div className={`p-6 sm:p-8 rounded-2xl border shadow-xl transition-all ${
      isDarkMode
        ? 'bg-slate-900/60 border-slate-800/80 backdrop-blur-md'
        : 'bg-white/80 border-slate-200/80 backdrop-blur-md shadow-sm'
    }`}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800/40">
        {STATS.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={stat.id} className={`space-y-1 ${idx > 0 ? 'pt-4 md:pt-0' : ''}`}>
              <div className="flex items-center justify-center gap-1.5">
                <Icon className={`w-4 h-4 ${stat.color}`} />
                <span className={`text-2xl sm:text-3xl font-black font-mono tracking-tight ${stat.color}`}>
                  {stat.value}
                </span>
              </div>
              <p className={`text-xs font-semibold uppercase tracking-wider ${
                isDarkMode ? 'text-slate-400' : 'text-slate-600'
              }`}>
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
