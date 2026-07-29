'use client';

import React, { useState, useRef } from 'react';
import { CalendarGrid, ContributionCell, PlannerSettings, IntensityLevel } from '../types/calendar';
import { getThemeById } from '../lib/theme-config';
import { CellTooltip } from './CellTooltip';
import { Sparkles, Info } from 'lucide-react';

interface ContributionGraphProps {
  grid: CalendarGrid;
  settings: PlannerSettings;
  onCellClick: (cell: ContributionCell) => void;
}

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

export const ContributionGraph: React.FC<ContributionGraphProps> = ({
  grid,
  settings,
  onCellClick,
}) => {
  const theme = getThemeById(settings.themeId);
  const [hoveredCell, setHoveredCell] = useState<ContributionCell | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [isMouseDown, setIsMouseDown] = useState(false);
  const graphRef = useRef<HTMLDivElement>(null);

  // Compute month label column indices
  const monthLabels: { name: string; col: number }[] = [];
  let lastMonth = -1;

  grid.weeks.forEach((week, weekIdx) => {
    // Check first day of week or middle day
    const firstDayInYear = week.days.find((d) => d.year === grid.year);
    if (firstDayInYear && firstDayInYear.month !== lastMonth) {
      monthLabels.push({
        name: MONTH_NAMES[firstDayInYear.month],
        col: weekIdx,
      });
      lastMonth = firstDayInYear.month;
    }
  });

  const handleCellMouseEnter = (cell: ContributionCell, e: React.MouseEvent<HTMLDivElement>) => {
    if (graphRef.current) {
      const rect = graphRef.current.getBoundingClientRect();
      const targetRect = e.currentTarget.getBoundingClientRect();
      setTooltipPos({
        x: targetRect.left - rect.left + targetRect.width / 2,
        y: targetRect.top - rect.top,
      });
    }
    setHoveredCell(cell);

    // If mouse dragging in draw/erase mode
    if (isMouseDown && settings.drawingMode !== 'select') {
      onCellClick(cell);
    }
  };

  const handleCellMouseDown = (cell: ContributionCell) => {
    setIsMouseDown(true);
    onCellClick(cell);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  return (
    <div
      ref={graphRef}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => {
        setIsMouseDown(false);
        setHoveredCell(null);
      }}
      className={`relative w-full overflow-hidden rounded-2xl p-5 border shadow-2xl transition-all ${theme.bgCard}`}
    >
      <CellTooltip cell={hoveredCell} x={tooltipPos.x} y={tooltipPos.y} />

      {/* Header Info Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4 mb-4">
        <div>
          <h3 className={`text-base font-extrabold ${theme.textColor} flex items-center gap-2`}>
            <span>{grid.year} Contribution Art Calendar</span>
            <span className="text-xs font-mono font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              53 Weeks • {grid.totalDays} Days
            </span>
          </h3>
          <p className={`text-xs ${theme.subtextColor}`}>
            Interactive GitHub contribution layout preview for '{settings.text || 'Pattern'}'
          </p>
        </div>

        {/* Drawing hint */}
        {settings.drawingMode !== 'select' && (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/20">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Click or drag cells to {settings.drawingMode} custom pixels!</span>
          </div>
        )}
      </div>

      {/* Graph Scroll Container */}
      <div className="w-full overflow-x-auto pb-2 select-none scrollbar-thin scrollbar-thumb-slate-700">
        <div className="min-w-[800px] space-y-2">
          {/* Month Header Row */}
          <div className="flex items-center text-[11px] font-mono text-slate-400 pl-8">
            {grid.weeks.map((week, idx) => {
              const label = monthLabels.find((m) => m.col === idx);
              return (
                <div key={idx} className="w-[15px] flex-shrink-0 text-left">
                  {label ? label.name : ''}
                </div>
              );
            })}
          </div>

          {/* Grid Rows (0=Sun, 1=Mon, ..., 6=Sat) */}
          <div className="flex">
            {/* Day Labels Column */}
            <div className="flex flex-col justify-between pr-2 text-[10px] font-mono text-slate-400 py-[2px] w-8 flex-shrink-0">
              {DAY_LABELS.map((dayLabel, i) => (
                <div key={i} className="h-[13px] flex items-center">
                  {dayLabel}
                </div>
              ))}
            </div>

            {/* Weeks Matrix */}
            <div className="flex gap-[3px]">
              {grid.weeks.map((week) => (
                <div key={week.weekIndex} className="flex flex-col gap-[3px]">
                  {week.days.map((cell) => {
                    const isYearCell = cell.year === grid.year;
                    const colorHex = theme.levels[cell.level];

                    return (
                      <div
                        key={cell.date}
                        onMouseEnter={(e) => handleCellMouseEnter(cell, e)}
                        onMouseDown={() => handleCellMouseDown(cell)}
                        style={{
                          backgroundColor: isYearCell ? colorHex : 'transparent',
                          opacity: isYearCell ? 1 : 0.2,
                        }}
                        className={`h-[13px] w-[13px] rounded-[2.5px] cursor-pointer transition-transform hover:scale-125 hover:z-10 ${
                          cell.commitCount > 0 ? 'ring-1 ring-white/10' : ''
                        } ${cell.isCustomDrawn ? 'ring-2 ring-cyan-400' : ''}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Graph Footer & Intensity Legend */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/80 pt-4 mt-2 text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <Info className="h-3.5 w-3.5 text-slate-500" />
          <span>Click any cell to inspect date & commit count</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-medium">Less</span>
          <div className="flex gap-1.5">
            {theme.levels.map((lvlColor, lvlIdx) => (
              <div
                key={lvlIdx}
                style={{ backgroundColor: lvlColor }}
                className="h-3 w-3 rounded-[2px] border border-white/10"
                title={`Level ${lvlIdx}`}
              />
            ))}
          </div>
          <span className="text-slate-400 font-medium">More</span>
        </div>
      </div>
    </div>
  );
};
