'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { PlannerControls } from '../components/PlannerControls';
import { ContributionGraph } from '../components/ContributionGraph';
import { StatisticsPanel } from '../components/StatisticsPanel';
import { ExportPanel } from '../components/ExportPanel';
import { Footer } from '../components/Footer';
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

function AppContent() {
  const currentYear = new Date().getFullYear();

  const [settings, setSettings] = useState<PlannerSettings>({
    text: 'LORD SUKHMAN',
    year: currentYear,
    intensityMaxCommits: 5,
    letterSpacing: 1,
    alignment: 'center',
    themeId: 'github-dark',
    drawingMode: 'select',
    drawIntensityLevel: 4,
  });

  const [customOverrides, setCustomOverrides] = useState<
    Record<string, { commitCount: number; level: IntensityLevel }>
  >({});

  // Parse URL search params on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const textParam = params.get('text');
      const yearParam = params.get('year');
      const intensityParam = params.get('intensity');
      const themeParam = params.get('theme');
      const alignParam = params.get('align');

      if (textParam || yearParam || intensityParam || themeParam || alignParam) {
        setSettings((prev) => ({
          ...prev,
          text: textParam || prev.text,
          year: yearParam ? parseInt(yearParam, 10) : prev.year,
          intensityMaxCommits: intensityParam ? parseInt(intensityParam, 10) : prev.intensityMaxCommits,
          themeId: themeParam || prev.themeId,
          alignment: (alignParam as any) || prev.alignment,
        }));
      }
    }
  }, []);

  // Update settings handler
  const handleUpdateSettings = (updated: Partial<PlannerSettings>) => {
    setSettings((prev) => ({ ...prev, ...updated }));
  };

  // Reset custom drawing grid
  const handleResetGrid = () => {
    setCustomOverrides({});
    setSettings((prev) => ({ ...prev, text: 'LORD SUKHMAN', drawingMode: 'select' }));
  };

  // Cell click handler for drawing / erasing studio
  const handleCellClick = (cell: ContributionCell) => {
    if (settings.drawingMode === 'select') return;

    setCustomOverrides((prev) => {
      const next = { ...prev };
      if (settings.drawingMode === 'draw') {
        next[cell.date] = {
          commitCount: settings.intensityMaxCommits,
          level: 4,
        };
      } else if (settings.drawingMode === 'erase') {
        next[cell.date] = {
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
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950 flex flex-col">
      <Header />

      <main className="flex-1">
        <HeroSection
          activeText={settings.text}
          onSelectPreset={(text) => handleUpdateSettings({ text })}
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 space-y-8 pb-12">
          {/* Planner Controls Form */}
          <PlannerControls
            settings={settings}
            onChangeSettings={handleUpdateSettings}
            onResetGrid={handleResetGrid}
          />

          {/* Interactive GitHub Graph Preview */}
          <ContributionGraph
            grid={calendarGrid}
            settings={settings}
            onCellClick={handleCellClick}
          />

          {/* Commit Analytics Panel */}
          <StatisticsPanel stats={strategyStats} />

          {/* Export Panel */}
          <ExportPanel grid={calendarGrid} settings={settings} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">Loading GitLegacy...</div>}>
      <AppContent />
    </Suspense>
  );
}
