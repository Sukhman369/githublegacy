'use client';

import React from 'react';
import Link from 'next/link';
import { useTheme } from '../context/ThemeContext';
import {
  Palette,
  BarChart3,
  ShieldCheck,
  Share2,
  LayoutTemplate,
  Terminal,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface ToolItem {
  id: string;
  title: string;
  badge: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgGradient: string;
  borderColor: string;
  href: string;
  ctaText: string;
  isExternal?: boolean;
}

const TOOLS: ToolItem[] = [
  {
    id: 'planner',
    title: 'Contribution Art Planner',
    badge: 'Core Studio',
    description: 'Design custom pixel text and 8-bit matrix artwork across your 53-week contribution graph with precision controls.',
    icon: Palette,
    color: 'text-emerald-400',
    bgGradient: 'from-emerald-500/10 via-teal-500/5 to-transparent',
    borderColor: 'border-emerald-500/30 hover:border-emerald-400',
    href: '#planner-studio',
    ctaText: 'Launch Art Studio',
  },
  {
    id: 'history-visualizer',
    title: 'Real GitHub History Visualizer',
    badge: 'Real Data',
    description: 'Fetch real 365-day contribution data for any handle (@username) and generate dynamic live SVG profile README badges.',
    icon: BarChart3,
    color: 'text-teal-400',
    bgGradient: 'from-teal-500/10 via-cyan-500/5 to-transparent',
    borderColor: 'border-teal-500/30 hover:border-teal-400',
    href: '/badges#real-history',
    ctaText: 'View GitHub History',
  },
  {
    id: 'badge-studio',
    title: 'Developer Badge & Shield Studio',
    badge: '40+ Shields',
    description: 'Custom status shield generator and curated tech stack badges (React, Next.js, Docker, Python) for your profile.',
    icon: ShieldCheck,
    color: 'text-cyan-400',
    bgGradient: 'from-cyan-500/10 via-blue-500/5 to-transparent',
    borderColor: 'border-cyan-500/30 hover:border-cyan-400',
    href: '/badges',
    ctaText: 'Open Badge Studio',
  },
  {
    id: 'social-exporter',
    title: 'Social Banner & Brag Exporter',
    badge: 'Retina 4K',
    description: 'Export high-res 2x Retina DPI headers for Twitter/X ($1500 \\times 500$), LinkedIn covers ($1584 \\times 396$), & IG cards.',
    icon: Share2,
    color: 'text-purple-400',
    bgGradient: 'from-purple-500/10 via-indigo-500/5 to-transparent',
    borderColor: 'border-purple-500/30 hover:border-purple-400',
    href: '#export-studio',
    ctaText: 'Export Banners',
  },
  {
    id: 'presets-gallery',
    title: 'Preset Pattern Gallery',
    badge: 'Templates',
    description: 'Browse categorized pre-made 5x7 templates including Arcade classics, HIRE ME career banners, and tech logos.',
    icon: LayoutTemplate,
    color: 'text-amber-400',
    bgGradient: 'from-amber-500/10 via-orange-500/5 to-transparent',
    borderColor: 'border-amber-500/30 hover:border-amber-400',
    href: '/presets',
    ctaText: 'Browse Gallery',
  },
  {
    id: 'script-generator',
    title: 'Automation Script Exporter',
    badge: 'Zero-Dep',
    description: 'Export zero-dependency PowerShell (.ps1), Bash (.sh), or Python commit scripts to automatically populate your matrix.',
    icon: Terminal,
    color: 'text-rose-400',
    bgGradient: 'from-rose-500/10 via-pink-500/5 to-transparent',
    borderColor: 'border-rose-500/30 hover:border-rose-400',
    href: '#script-studio',
    ctaText: 'Generate Scripts',
  },
];

export function ToolsHubGrid() {
  const { isDarkMode } = useTheme();

  return (
    <section className="w-full space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Complete Developer Suite</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
          Explore The <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">GitLegacy Platform</span>
        </h2>
        <p className={`max-w-xl mx-auto text-xs sm:text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          Everything you need to craft stunning contribution artwork, showcase real activity, and elevate your GitHub profile presence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {TOOLS.map((tool) => {
          const Icon = tool.icon;
          return (
            <div
              key={tool.id}
              className={`group relative p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-2xl bg-gradient-to-br ${tool.bgGradient} ${
                isDarkMode
                  ? 'bg-slate-900/80 border-slate-800'
                  : 'bg-white border-slate-200 shadow-sm'
              } ${tool.borderColor}`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl bg-slate-950/60 border border-slate-800 ${tool.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                    isDarkMode ? 'bg-slate-950 text-slate-300 border-slate-800' : 'bg-slate-100 text-slate-700 border-slate-300'
                  }`}>
                    {tool.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold group-hover:text-emerald-400 transition-colors">
                    {tool.title}
                  </h3>
                  <p className={`text-xs mt-1.5 leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {tool.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-800/50">
                <Link
                  href={tool.href}
                  className={`inline-flex items-center gap-2 text-xs font-bold transition-all ${tool.color} group-hover:translate-x-1`}
                >
                  <span>{tool.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
