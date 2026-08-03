'use client';

import React, { useMemo } from 'react';
import {
  createYearlyCalendarGrid,
  applyPatternToCalendar,
} from '../lib/calendar-engine';
import { PlannerSettings } from '../types/calendar';

interface PresetMiniGridProps {
  text: string;
  isDarkMode?: boolean;
  year?: number;
  letterSpacing?: number;
  wordSpacing?: number;
}

const GREEN_LEVEL_COLORS_DARK: Record<number, string> = {
  0: 'rgba(255, 255, 255, 0.06)',
  1: '#0e4429',
  2: '#006d32',
  3: '#26a641',
  4: '#39d353',
};

const GREEN_LEVEL_COLORS_LIGHT: Record<number, string> = {
  0: 'rgba(0, 0, 0, 0.07)',
  1: '#9be9a8',
  2: '#40c463',
  3: '#30a14e',
  4: '#216e39',
};

export const PresetMiniGrid: React.FC<PresetMiniGridProps> = ({
  text,
  isDarkMode = true,
  year = new Date().getFullYear(),
  letterSpacing = 1,
  wordSpacing = 4,
}) => {
  const grid = useMemo(() => {
    const settings: PlannerSettings = {
      text,
      year,
      intensityMaxCommits: 5,
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
  }, [text, year, letterSpacing, wordSpacing]);

  const levelColors = isDarkMode ? GREEN_LEVEL_COLORS_DARK : GREEN_LEVEL_COLORS_LIGHT;

  return (
    <div
      className={`p-3 rounded-xl border transition-colors ${
        isDarkMode ? 'bg-slate-950/80 border-slate-800/80' : 'bg-slate-100 border-slate-200'
      }`}
    >
      <div className="w-full flex items-center justify-between text-[10px] font-mono text-slate-400 mb-2 px-0.5">
        <span>53 WEEKS CANVAS</span>
        <span className="text-emerald-400 font-bold">{text.toUpperCase()}</span>
      </div>

      <div className="w-full select-none overflow-hidden">
        <svg
          viewBox="0 0 530 70"
          className="w-full h-auto block"
          style={{ shapeRendering: 'geometricPrecision' }}
        >
          {grid.weeks.map((week) =>
            week.days.map((day) => {
              const cellColor = levelColors[day.level] || levelColors[0];
              const x = week.weekIndex * 10;
              const y = day.dayOfWeek * 10;

              return (
                <rect
                  key={day.date}
                  x={x}
                  y={y}
                  width={8}
                  height={8}
                  rx={1.5}
                  fill={cellColor}
                  className="transition-colors duration-200"
                />
              );
            })
          )}
        </svg>
      </div>
    </div>
  );
};
