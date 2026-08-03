'use client';

import React from 'react';
import { StrategyStats } from '../types/calendar';
import { Flame, CalendarCheck, BarChart3, Zap, Percent, Trophy, TrendingUp } from 'lucide-react';

interface StatisticsPanelProps {
  stats: StrategyStats;
  isDarkMode?: boolean;
}

export const StatisticsPanel: React.FC<StatisticsPanelProps> = ({ stats, isDarkMode = true }) => {
  const maxMonthlyCommits = Math.max(...stats.monthlyDistribution.map((m) => m.commits), 1);

  return (
    <div
      className={`rounded-2xl border p-5 shadow-xl transition-colors space-y-6 ${
        isDarkMode
          ? 'bg-slate-900/90 border-slate-800 text-slate-100'
          : 'bg-white border-slate-200 text-slate-900 shadow-sm'
      }`}
    >
      <div className={`flex items-center justify-between border-b pb-4 ${
        isDarkMode ? 'border-slate-800' : 'border-slate-200'
      }`}>
        <h3 className="text-lg font-bold flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-emerald-500" />
          <span>Commit Strategy Analytics</span>
        </h3>
        <span className={`text-xs font-mono font-semibold px-2.5 py-1 rounded-lg ${
          isDarkMode ? 'text-slate-400 bg-slate-800' : 'text-slate-600 bg-slate-100'
        }`}>
          {stats.totalCommits.toLocaleString()} Total Commits
        </span>
      </div>

      {/* Primary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Total Commits */}
        <div className={`rounded-xl p-3.5 border space-y-1 ${
          isDarkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center gap-1.5 text-xs text-amber-500 font-semibold">
            <Flame className="h-3.5 w-3.5" />
            <span>Total Commits</span>
          </div>
          <p className={`text-xl font-mono font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {stats.totalCommits.toLocaleString()}
          </p>
        </div>

        {/* Active Days */}
        <div className={`rounded-xl p-3.5 border space-y-1 ${
          isDarkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center gap-1.5 text-xs text-emerald-500 font-semibold">
            <CalendarCheck className="h-3.5 w-3.5" />
            <span>Active Days</span>
          </div>
          <p className={`text-xl font-mono font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {stats.activeDays} <span className="text-xs text-slate-400 font-normal">/ {stats.totalYearDays}</span>
          </p>
        </div>

        {/* Avg Commits / Day */}
        <div className={`rounded-xl p-3.5 border space-y-1 ${
          isDarkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center gap-1.5 text-xs text-cyan-500 font-semibold">
            <BarChart3 className="h-3.5 w-3.5" />
            <span>Avg / Active Day</span>
          </div>
          <p className={`text-xl font-mono font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {stats.avgCommitsPerActiveDay}
          </p>
        </div>

        {/* Peak Commits */}
        <div className={`rounded-xl p-3.5 border space-y-1 ${
          isDarkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center gap-1.5 text-xs text-rose-500 font-semibold">
            <Zap className="h-3.5 w-3.5" />
            <span>Peak Day</span>
          </div>
          <p className={`text-xl font-mono font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {stats.peakCommits} <span className="text-xs text-slate-400 font-normal">commits</span>
          </p>
        </div>

        {/* Completion Rate */}
        <div className={`rounded-xl p-3.5 border space-y-1 ${
          isDarkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center gap-1.5 text-xs text-purple-500 font-semibold">
            <Percent className="h-3.5 w-3.5" />
            <span>Year Coverage</span>
          </div>
          <p className={`text-xl font-mono font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {stats.completionRate}%
          </p>
        </div>

        {/* Longest Streak */}
        <div className={`rounded-xl p-3.5 border space-y-1 ${
          isDarkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center gap-1.5 text-xs text-amber-500 font-semibold">
            <Trophy className="h-3.5 w-3.5" />
            <span>Longest Streak</span>
          </div>
          <p className={`text-xl font-mono font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {stats.longestStreak} <span className="text-xs text-slate-400 font-normal">days</span>
          </p>
        </div>
      </div>

      {/* Monthly Breakdown Chart */}
      <div className="space-y-3 pt-2">
        <h4 className={`text-xs font-semibold uppercase tracking-wider ${
          isDarkMode ? 'text-slate-300' : 'text-slate-600'
        }`}>
          Monthly Commit Distribution
        </h4>
        <div className={`grid grid-cols-12 gap-1.5 items-end h-28 p-3 rounded-xl border ${
          isDarkMode ? 'bg-slate-950 border-slate-800/80' : 'bg-slate-50 border-slate-200'
        }`}>
          {stats.monthlyDistribution.map((m) => {
            const heightPct = Math.round((m.commits / maxMonthlyCommits) * 100);
            return (
              <div key={m.monthName} className="flex flex-col items-center gap-1 h-full justify-end group">
                <span className={`text-[10px] font-mono font-bold transition-colors ${
                  m.commits > 0
                    ? isDarkMode
                      ? 'text-emerald-400 font-extrabold'
                      : 'text-emerald-600 font-extrabold'
                    : isDarkMode
                    ? 'text-slate-600'
                    : 'text-slate-400'
                }`}>
                  {m.commits}
                </span>

                <div
                  style={{ height: `${Math.max(heightPct, 6)}%` }}
                  className={`w-full rounded-t-md transition-all group-hover:brightness-125 ${
                    m.commits > 0
                      ? 'bg-gradient-to-t from-emerald-600 to-teal-400 shadow-sm shadow-emerald-500/20'
                      : isDarkMode
                      ? 'bg-slate-800/50'
                      : 'bg-slate-200'
                  }`}
                  title={`${m.monthName}: ${m.commits} commits`}
                />

                <span className={`text-[10px] font-mono font-medium ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  {m.monthName}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
