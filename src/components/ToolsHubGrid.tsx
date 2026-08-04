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
  HeartHandshake,
} from 'lucide-react';

interface ToolItem {
  id: string;
  title: string;
  badge: string;
  description: string;
  icon: React.ElementType;
  darkColor: string;
  lightColor: string;
  darkBgGradient: string;
  lightBgGradient: string;
  darkBorder: string;
  lightBorder: string;
  href: string;
  ctaText: string;
  isExternal?: boolean;
}

const BASE_TOOLS: ToolItem[] = [
  {
    id: 'planner',
    title: 'Contribution Art Planner',
    badge: 'Core Studio',
    description: 'Design custom pixel text and 8-bit matrix artwork across your 53-week contribution graph with precision controls.',
    icon: Palette,
    darkColor: 'text-emerald-400',
    lightColor: 'text-emerald-600',
    darkBgGradient: 'from-emerald-500/10 via-teal-500/5 to-transparent',
    lightBgGradient: 'from-emerald-50/60 via-teal-50/20 to-transparent',
    darkBorder: 'border-emerald-500/30 hover:border-emerald-400',
    lightBorder: 'border-emerald-200 hover:border-emerald-400',
    href: '/tools/art-studio',
    ctaText: 'Launch Art Studio',
  },
  {
    id: 'history-visualizer',
    title: 'Real GitHub History Visualizer',
    badge: 'Real Data',
    description: 'Fetch real 365-day contribution data for any handle (@username) and generate dynamic live SVG profile README badges.',
    icon: BarChart3,
    darkColor: 'text-teal-400',
    lightColor: 'text-teal-600',
    darkBgGradient: 'from-teal-500/10 via-cyan-500/5 to-transparent',
    lightBgGradient: 'from-teal-50/60 via-cyan-50/20 to-transparent',
    darkBorder: 'border-teal-500/30 hover:border-teal-400',
    lightBorder: 'border-teal-200 hover:border-teal-400',
    href: '/tools/history-visualizer',
    ctaText: 'View GitHub History',
  },
  {
    id: 'badge-studio',
    title: 'Developer Badge & Shield Studio',
    badge: '40+ Shields',
    description: 'Custom status shield generator and curated tech stack badges (React, Next.js, Docker, Python) for your profile.',
    icon: ShieldCheck,
    darkColor: 'text-cyan-400',
    lightColor: 'text-cyan-600',
    darkBgGradient: 'from-cyan-500/10 via-blue-500/5 to-transparent',
    lightBgGradient: 'from-cyan-50/60 via-blue-50/20 to-transparent',
    darkBorder: 'border-cyan-500/30 hover:border-cyan-400',
    lightBorder: 'border-cyan-200 hover:border-cyan-400',
    href: '/tools/badges',
    ctaText: 'Open Badge Studio',
  },
  {
    id: 'social-exporter',
    title: 'Social Banner & Brag Exporter',
    badge: 'Retina 4K',
    description: 'Export high-res 2x Retina DPI headers for Twitter/X (1500 x 500), LinkedIn covers (1584 x 396), & IG cards.',
    icon: Share2,
    darkColor: 'text-purple-400',
    lightColor: 'text-purple-600',
    darkBgGradient: 'from-purple-500/10 via-indigo-500/5 to-transparent',
    lightBgGradient: 'from-purple-50/60 via-indigo-50/20 to-transparent',
    darkBorder: 'border-purple-500/30 hover:border-purple-400',
    lightBorder: 'border-purple-200 hover:border-purple-400',
    href: '/tools/art-studio#export-studio',
    ctaText: 'Export Banners',
  },
  {
    id: 'presets-gallery',
    title: 'Preset Pattern Gallery',
    badge: 'Templates',
    description: 'Browse categorized pre-made 5x7 templates including Arcade classics, HIRE ME career banners, and tech logos.',
    icon: LayoutTemplate,
    darkColor: 'text-amber-400',
    lightColor: 'text-amber-600',
    darkBgGradient: 'from-amber-500/10 via-orange-500/5 to-transparent',
    lightBgGradient: 'from-amber-50/60 via-orange-50/20 to-transparent',
    darkBorder: 'border-amber-500/30 hover:border-amber-400',
    lightBorder: 'border-amber-200 hover:border-amber-400',
    href: '/tools/presets',
    ctaText: 'Browse Gallery',
  },
];

const SCRIPT_GENERATOR_TOOL: ToolItem = {
  id: 'script-generator',
  title: 'Automation Script Exporter',
  badge: 'Zero-Dep',
  description: 'Export zero-dependency PowerShell (.ps1), Bash (.sh), or Python commit scripts to automatically populate your matrix.',
  icon: Terminal,
  darkColor: 'text-rose-400',
  lightColor: 'text-rose-600',
  darkBgGradient: 'from-rose-500/10 via-pink-500/5 to-transparent',
  lightBgGradient: 'from-rose-50/60 via-pink-50/20 to-transparent',
  darkBorder: 'border-rose-500/30 hover:border-rose-400',
  lightBorder: 'border-rose-200 hover:border-rose-400',
  href: '/tools/script-generator',
  ctaText: 'Generate Scripts',
};

const EXPLORE_ALL_CARD: ToolItem = {
  id: 'all-tools',
  title: 'Explore All Tools & Features',
  badge: 'Full Suite',
  description: 'Discover our complete expanding catalog of contribution planners, badge generators, theme engines, and developer tools.',
  icon: Sparkles,
  darkColor: 'text-rose-400',
  lightColor: 'text-rose-600',
  darkBgGradient: 'from-rose-500/10 via-pink-500/5 to-transparent',
  lightBgGradient: 'from-rose-50/60 via-pink-50/20 to-transparent',
  darkBorder: 'border-rose-500/30 hover:border-rose-400',
  lightBorder: 'border-rose-200 hover:border-rose-400',
  href: '/tools',
  ctaText: 'Explore Tools Library',
};

export function ToolsHubGrid({ showTitle = true }: { showTitle?: boolean }) {
  const { isDarkMode } = useTheme();

  // On Homepage (showTitle = true): show EXPLORE_ALL_CARD as 6th card
  // On /tools page (showTitle = false): show SCRIPT_GENERATOR_TOOL as 6th tool
  const displayTools = showTitle
    ? [...BASE_TOOLS, EXPLORE_ALL_CARD]
    : [...BASE_TOOLS, SCRIPT_GENERATOR_TOOL];

  return (
    <section className="w-full space-y-6">
      {showTitle && (
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
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {displayTools.map((tool) => {
          const Icon = tool.icon;
          const iconColor = isDarkMode ? tool.darkColor : tool.lightColor;
          const bgGradient = isDarkMode ? tool.darkBgGradient : tool.lightBgGradient;
          const borderStyle = isDarkMode ? tool.darkBorder : tool.lightBorder;

          return (
            <Link
              key={tool.id}
              href={tool.href}
              className={`group relative p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 bg-gradient-to-br ${bgGradient} ${
                isDarkMode
                  ? 'bg-slate-900/80 border-slate-800/90 hover:shadow-2xl hover:shadow-emerald-500/5'
                  : 'bg-white border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300'
              } ${borderStyle}`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl border transition-colors ${
                    isDarkMode
                      ? `bg-slate-950/80 border-slate-800 ${iconColor}`
                      : `bg-slate-100/90 border-slate-200/80 ${iconColor}`
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border transition-colors ${
                    isDarkMode
                      ? 'bg-slate-950 text-slate-300 border-slate-800'
                      : 'bg-slate-100/80 text-slate-700 border-slate-200'
                  }`}>
                    {tool.badge}
                  </span>
                </div>

                <div>
                  <h3 className={`text-lg font-bold transition-colors ${
                    isDarkMode
                      ? 'text-white group-hover:text-emerald-400'
                      : 'text-slate-900 group-hover:text-emerald-600'
                  }`}>
                    {tool.title}
                  </h3>
                  <p className={`text-xs mt-1.5 leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {tool.description}
                  </p>
                </div>
              </div>

              <div className={`pt-6 mt-4 border-t ${
                isDarkMode ? 'border-slate-800/60' : 'border-slate-100'
              }`}>
                <span
                  className={`inline-flex items-center gap-2 text-xs font-bold transition-all ${iconColor} group-hover:translate-x-1`}
                >
                  <span>{tool.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
