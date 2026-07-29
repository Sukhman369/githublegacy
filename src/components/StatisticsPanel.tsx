'use client';

import React from 'react';
import { StrategyStats } from '../types/calendar';
import { Flame, CalendarCheck, BarChart3, Zap, Percent, Trophy, TrendingUp } from 'lucide-react';

interface StatisticsPanelProps {
  stats: StrategyStats;
}

export const StatisticsPanel: React.FC<StatisticsPanelProps> = ({ stats }) => {
  const maxMonthlyCommits = Math.max(...stats.monthlyDistribution.map((m) => m.commits), 1);

  return (
    <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-emerald-400" />
          <span>Commit Strategy Analytics</span>
        </h3>
        <span className="text-xs font-mono font-semibold text-slate-400 bg-slate-800 px-2.5 py-1 rounded-lg">
          {stats.totalCommits.toLocaleString()} Total Commits
        </span>
      </div>

      {/* Primary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Total Commits */}
        <div className="rounded-xl bg-slate-950/80 p-3.5 border border-slate-800 space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold">
            <Flame className="h-3.5 w-3.5" />
            <span>Total Commits</span>
          </div>
          <p className="text-xl font-mono font-extrabold text-white">
            {stats.totalCommits.toLocaleString()}
          </p>
        </div>

        {/* Active Days */}
        <div className="rounded-xl bg-slate-950/80 p-3.5 border border-slate-800 space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
            <CalendarCheck className="h-3.5 w-3.5" />
            <span>Active Days</span>
          </div>
          <p className="text-xl font-mono font-extrabold text-white">
            {stats.activeDays} <span className="text-xs text-slate-400 font-normal">/ {stats.totalYearDays}</span>
          </p>
        </div>

        {/* Avg Commits / Day */}
        <div className="rounded-xl bg-slate-950/80 p-3.5 border border-slate-800 space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-semibold">
            <BarChart3 className="h-3.5 w-3.5" />
            <span>Avg / Active Day</span>
          </div>
          <p className="text-xl font-mono font-extrabold text-white">
            {stats.avgCommitsPerActiveDay}
          </p>
        </div>

        {/* Peak Commits */}
        <div className="rounded-xl bg-slate-950/80 p-3.5 border border-slate-800 space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-rose-400 font-semibold">
            <Zap className="h-3.5 w-3.5" />
            <span>Peak Day</span>
          </div>
          <p className="text-xl font-mono font-extrabold text-white">
            {stats.peakCommits} <span className="text-xs text-slate-400 font-normal">commits</span>
          </p>
        </div>

        {/* Completion Rate */}
        <div className="rounded-xl bg-slate-950/80 p-3.5 border border-slate-800 space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-purple-400 font-semibold">
            <Percent className="h-3.5 w-3.5" />
            <span>Year Coverage</span>
          </div>
          <p className="text-xl font-mono font-extrabold text-white">
            {stats.completionRate}%
          </p>
        </div>

        {/* Longest Streak */}
        <div className="rounded-xl bg-slate-950/80 p-3.5 border border-slate-800 space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold">
            <Trophy className="h-3.5 w-3.5" />
            <span>Longest Streak</span>
          </div>
          <p className="text-xl font-mono font-extrabold text-white">
            {stats.longestStreak} <span className="text-xs text-slate-400 font-normal">days</span>
          </p>
        </div>
      </div>

      {/* Monthly Breakdown Chart */}
      <div className="space-y-3 pt-2">
        <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Monthly Commit Distribution
        </h4>
        <div className="grid grid-cols-12 gap-1.5 items-end h-24 bg-slate-950 p-3 rounded-xl border border-slate-800/80">
          {stats.monthlyDistribution.map((m) => {
            const heightPct = Math.round((m.commits / maxMonthlyCommits) * 100);
            return (
              <div key={m.monthName} className="flex flex-col items-center gap-1.5 h-full justify-end group">
                <div
                  style={{ height: `${Math.max(heightPct, 4)}%` }}
                  className={`w-full rounded-t-sm transition-all group-hover:brightness-125 ${
                    m.commits > 0 ? 'bg-gradient-to-t from-emerald-600 to-teal-400' : 'bg-slate-800/50'
                  }`}
                  title={`${m.monthName}: ${m.commits} commits`}
                />
                <span className="text-[10px] font-mono text-slate-400 font-medium">
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
