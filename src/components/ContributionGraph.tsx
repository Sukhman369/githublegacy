'use client';

import React, { useState, useRef } from 'react';
import { CalendarGrid, ContributionCell, PlannerSettings } from '../types/calendar';
import { getThemeById } from '../lib/theme-config';
import { downloadGraphAsPNG } from '../lib/graph-image-export';
import { CellTooltip } from './CellTooltip';
import { Sparkles, Info, MoveHorizontal, Trash2, RotateCcw, Image } from 'lucide-react';

interface ContributionGraphProps {
  grid: CalendarGrid;
  settings: PlannerSettings;
  onCellClick: (cell: ContributionCell) => void;
  onCleanGrid?: () => void;
  onResetGrid?: () => void;
}

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

export const ContributionGraph: React.FC<ContributionGraphProps> = ({
  grid,
  settings,
  onCellClick,
  onCleanGrid,
  onResetGrid,
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

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    if (touch) {
      const target = document.elementFromPoint(touch.clientX, touch.clientY) as HTMLElement;
      if (target && target.dataset && target.dataset.cellDate) {
        const dateStr = target.dataset.cellDate;
        const cell = grid.weeks.flatMap((w) => w.days).find((d) => d.date === dateStr);
        if (cell && settings.drawingMode !== 'select') {
          onCellClick(cell);
        }
      }
    }
  };

  return (
    <div
      ref={graphRef}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => {
        setIsMouseDown(false);
        setHoveredCell(null);
      }}
      className={`relative w-full rounded-2xl p-4 sm:p-6 border shadow-2xl transition-all ${theme.bgCard}`}
    >
      <CellTooltip cell={hoveredCell} x={tooltipPos.x} y={tooltipPos.y} />

      {/* Header Info Bar matching PNG export styling */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4 mb-4">
        <div className="space-y-1">
          <h3 className={`text-xl sm:text-2xl font-black tracking-tight ${theme.textColor}`}>
            GitLegacy • &quot;{(settings.text || 'LEGACY').toUpperCase()}&quot;
          </h3>
          <p className="text-xs sm:text-sm font-mono font-bold text-emerald-400 flex flex-wrap items-center gap-2">
            <span>{grid.year} Calendar Canvas</span>
            <span>•</span>
            <span>{grid.totalDays} Days</span>
            {settings.username && (
              <>
                <span>•</span>
                <span className="text-emerald-400">@{settings.username}</span>
              </>
            )}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* 1-Click Download Image */}
          <button
            onClick={() => downloadGraphAsPNG(grid, settings)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-md hover:scale-105"
            title="Download PNG image of contribution graph"
          >
            <Image className="h-3.5 w-3.5" />
            <span>Download PNG</span>
          </button>

          {/* Drawing hint */}
          {settings.drawingMode !== 'select' && (
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/20">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Click or drag cells to {settings.drawingMode} custom pixels!</span>
            </div>
          )}

          {onCleanGrid && (
            <button
              onClick={onCleanGrid}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border-rose-500/30 shadow-sm hover:scale-105"
              title="Clear text & drawing overrides for a blank canvas"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Clean Grid</span>
            </button>
          )}

        </div>
      </div>

      {/* Mobile Swipe Hint */}
      <div className="flex sm:hidden items-center justify-center gap-1.5 py-1.5 mb-2 rounded-lg bg-slate-800/60 text-slate-400 text-[11px] font-medium border border-slate-700/50">
        <MoveHorizontal className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
        <span>Swipe horizontally to view full 53-week graph</span>
      </div>

      {/* Graph Scroll Container */}
      <div className="w-full overflow-x-auto pb-3 select-none scrollbar-thin scrollbar-thumb-slate-700 touch-pan-x">
        <div className="min-w-[780px] space-y-2">
          {/* Month Header Row */}
          <div className="flex items-center text-[11px] font-mono text-slate-400 pl-8">
            {grid.weeks.map((week, idx) => {
              const label = monthLabels.find((m) => m.col === idx);
              return (
                <div key={idx} className="w-[14.5px] flex-shrink-0 text-left">
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
                <div key={i} className="h-[12px] flex items-center">
                  {dayLabel}
                </div>
              ))}
            </div>

            {/* Weeks Matrix */}
            <div
              className="flex gap-[2.5px]"
              onMouseLeave={() => setHoveredCell(null)}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleMouseUp}
            >
              {grid.weeks.map((week) => (
                <div key={week.weekIndex} className="flex flex-col gap-[2.5px]">
                  {week.days.map((cell) => {
                    const isYearCell = cell.year === grid.year;
                    const colorHex = theme.levels[cell.level];

                    return (
                      <div
                        key={cell.date}
                        data-cell-date={cell.date}
                        suppressHydrationWarning
                        onMouseEnter={(e) => handleCellMouseEnter(cell, e)}
                        onMouseLeave={() => setHoveredCell(null)}
                        onMouseDown={() => handleCellMouseDown(cell)}
                        onTouchStart={() => handleCellMouseDown(cell)}
                        style={{
                          backgroundColor: isYearCell ? colorHex : 'transparent',
                          opacity: isYearCell ? 1 : 0.2,
                        }}
                        className={`h-[12px] w-[12px] rounded-[2px] cursor-pointer transition-transform hover:scale-125 hover:z-10 ${
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
          <span>Click/tap any cell to inspect date & commit count</span>
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
