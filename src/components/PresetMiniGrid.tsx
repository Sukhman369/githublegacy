'use client';

import React, { useMemo } from 'react';
import {
  createYearlyCalendarGrid,
  applyPatternToCalendar,
} from '../lib/calendar-engine';
import { PlannerSettings } from '../types/calendar';

interface PresetMiniGridProps {
  text: string;
  intensityMaxCommits?: number;
  isDarkMode?: boolean;
  year?: number;
  letterSpacing?: number;
  wordSpacing?: number;
}

const GREEN_LEVEL_COLORS_DARK: Record<number, string> = {
  0: 'rgba(255, 255, 255, 0.05)',
  1: '#0e4429',
  2: '#006d32',
  3: '#26a641',
  4: '#39d353',
};

const GREEN_LEVEL_COLORS_LIGHT: Record<number, string> = {
  0: 'rgba(0, 0, 0, 0.06)',
  1: '#9be9a8',
  2: '#40c463',
  3: '#30a14e',
  4: '#216e39',
};

export const PresetMiniGrid: React.FC<PresetMiniGridProps> = ({
  text,
  intensityMaxCommits = 5,
  isDarkMode = true,
  year = new Date().getFullYear(),
  letterSpacing = 1,
  wordSpacing = 4,
}) => {
  const grid = useMemo(() => {
    const settings: PlannerSettings = {
      text,
      year,
      intensityMaxCommits,
      letterSpacing,
      wordSpacing,
      alignment: 'center',
      columnOffset: 0,
      themeId: 'github-dark',
      drawingMode: 'select',
      drawIntensityLevel: 4,
    };

    const rawGrid = createYearlyCalendarGrid(year);
    return applyPatternToCalendar(rawGrid, settings);
  }, [text, year, intensityMaxCommits, letterSpacing, wordSpacing]);

  const levelColors = isDarkMode ? GREEN_LEVEL_COLORS_DARK : GREEN_LEVEL_COLORS_LIGHT;

  return (
    <div
      className={`p-3 rounded-xl border transition-colors ${
        isDarkMode ? 'bg-slate-950/80 border-slate-800/80' : 'bg-slate-100 border-slate-200'
      }`}
    >
      <div className="w-full flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1.5 px-0.5">
        <span>53 WEEKS CANVAS</span>
        <span className="text-emerald-400 font-bold">{text.toUpperCase()}</span>
      </div>

      <div className="w-full overflow-x-auto select-none no-scrollbar">
        <div className="grid grid-flow-col grid-rows-7 gap-[2px] min-w-[280px]">
          {grid.weeks.map((week) =>
            week.days.map((day) => {
              const cellColor = levelColors[day.level] || levelColors[0];
              return (
                <div
                  key={day.date}
                  style={{ backgroundColor: cellColor }}
                  className={`w-full aspect-square rounded-[1.5px] transition-all duration-150 ${
                    day.level > 0 ? 'shadow-[0_0_4px_rgba(57,211,83,0.3)]' : ''
                  }`}
                  title={`${day.date}: ${day.commitCount} commits`}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
