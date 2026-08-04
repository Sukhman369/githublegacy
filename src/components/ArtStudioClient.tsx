'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { PlannerControls } from './PlannerControls';
import { ContributionGraph } from './ContributionGraph';
import { StatisticsPanel } from './StatisticsPanel';
import { ExportPanel } from './ExportPanel';
import { useTheme } from '../context/ThemeContext';
import { Palette } from 'lucide-react';
import {
  PlannerSettings,
  ContributionCell,
  IntensityLevel,
} from '../types/calendar';
import {
  createYearlyCalendarGrid,
  applyPatternToCalendar,
} from '../lib/calendar-engine';
import { calculateStrategyStats } from '../lib/commit-planner';

interface ArtStudioClientProps {
  initialSettings: PlannerSettings;
}

export default function ArtStudioClient({ initialSettings }: ArtStudioClientProps) {
  const { isDarkMode, setDarkMode } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  const [settings, setSettings] = useState<PlannerSettings>({
    ...initialSettings,
    themeId: initialSettings.themeId || (isDarkMode ? 'github-dark' : 'github-light'),
  });

  const [customOverrides, setCustomOverrides] = useState<
    Record<string, { commitCount: number; level: IntensityLevel }>
  >({});

  // Parse URL search params on mount
  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const textParam = params.get('text');
      const yearParam = params.get('year');
      const intensityParam = params.get('intensity');
      const themeParam = params.get('theme');
      const alignParam = params.get('align');
      const offsetParam = params.get('offset');
      const wordGapParam = params.get('wordgap');
      const modeParam = params.get('mode');

      if (modeParam === 'light') {
        setDarkMode(false);
      } else if (modeParam === 'dark') {
        setDarkMode(true);
      }

      if (textParam || yearParam || intensityParam || themeParam || alignParam || offsetParam || wordGapParam) {
        setSettings((prev) => ({
          ...prev,
          text: textParam || prev.text,
          year: yearParam ? parseInt(yearParam, 10) : prev.year,
          intensityMaxCommits: intensityParam ? parseInt(intensityParam, 10) : prev.intensityMaxCommits,
          themeId: themeParam || prev.themeId,
          alignment: (alignParam as any) || prev.alignment,
          columnOffset: offsetParam ? parseInt(offsetParam, 10) : prev.columnOffset,
          wordSpacing: wordGapParam ? parseInt(wordGapParam, 10) : prev.wordSpacing,
        }));
      }
    }
  }, [setDarkMode]);

  // Update settings handler
  const handleUpdateSettings = (updated: Partial<PlannerSettings>) => {
    setSettings((prev) => ({ ...prev, ...updated }));
  };

  // Reset custom drawing grid
  const handleResetGrid = () => {
    setCustomOverrides({});
    setSettings((prev) => ({
      ...prev,
      text: 'LEGACY',
      drawingMode: 'select',
      columnOffset: 0,
      wordSpacing: 4,
      themeId: isDarkMode ? 'github-dark' : 'github-light',
    }));
  };

  // Clean grid to blank canvas
  const handleCleanGrid = () => {
    setCustomOverrides({});
    setSettings((prev) => ({
      ...prev,
      text: '',
      columnOffset: 0,
    }));
  };

  // Cell click handler for drawing / erasing studio
  const handleCellClick = (cell: ContributionCell) => {
    if (settings.drawingMode === 'select') return;

    const relKey = `${cell.weekIndex - settings.columnOffset},${cell.dayOfWeek}`;

    setCustomOverrides((prev) => {
      const next = { ...prev };
      if (settings.drawingMode === 'draw') {
        next[relKey] = {
          commitCount: settings.intensityMaxCommits,
          level: 4,
        };
      } else if (settings.drawingMode === 'erase') {
        next[relKey] = {
          commitCount: 0,
          level: 0,
        };
      }
      return next;
    });
  };

  // Compute 53-week calendar grid
  const calendarGrid = useMemo(() => {
    const rawGrid = createYearlyCalendarGrid(settings.year);
    return applyPatternToCalendar(rawGrid, settings, customOverrides);
  }, [settings, customOverrides]);

  // Compute commit strategy statistics
  const strategyStats = useMemo(() => {
    return calculateStrategyStats(calendarGrid);
  }, [calendarGrid]);

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-10 space-y-8">
      {/* Page Hero Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <Palette className="w-4 h-4" />
          <span>GitLegacy Sub-Tool</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
          Contribution Art <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">Studio & Planner</span>
        </h1>
        <p className={`max-w-2xl mx-auto text-sm sm:text-base ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          Design custom pixel text, adjust letter spacing, nudge columns, or draw custom 8-bit artwork across your 53-week matrix.
        </p>
      </div>

      {/* Planner Controls Form */}
      <PlannerControls
        settings={settings}
        onChangeSettings={handleUpdateSettings}
        onResetGrid={handleResetGrid}
        onCleanGrid={handleCleanGrid}
        isDarkMode={isDarkMode}
      />

      {/* Interactive GitHub Graph Preview */}
      <ContributionGraph
        grid={calendarGrid}
        settings={settings}
        onCellClick={handleCellClick}
        onCleanGrid={handleCleanGrid}
      />

      {/* Commit Analytics Panel */}
      <StatisticsPanel stats={strategyStats} isDarkMode={isDarkMode} />

      {/* Export Panel */}
      <div id="export-studio">
        <ExportPanel grid={calendarGrid} settings={settings} isDarkMode={isDarkMode} />
      </div>
    </main>
  );
}
