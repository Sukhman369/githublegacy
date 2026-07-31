'use client';

import React from 'react';
import { ContributionCell } from '../types/calendar';
import { Calendar, Hash, Tag, Grid } from 'lucide-react';

interface CellTooltipProps {
  cell: ContributionCell | null;
  x: number;
  y: number;
}

export const CellTooltip: React.FC<CellTooltipProps> = ({ cell, x, y }) => {
  if (!cell) return null;

  // Format date readable (e.g. "Wed, Oct 14, 2026")
  const dateObj = new Date(cell.date + 'T00:00:00Z');
  const dateFormatted = dateObj.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });

  return (
    <div
      style={{
        left: `${x}px`,
        top: `${y - 12}px`,
        transform: 'translate(-50%, -100%)',
      }}
      className="pointer-events-none absolute z-50 rounded-xl bg-slate-950/95 border border-slate-700/80 p-3 shadow-2xl backdrop-blur-md min-w-[200px] space-y-2 text-xs"
    >
      <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 font-semibold text-slate-200">
        <span className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5 text-emerald-400" />
          {dateFormatted}
        </span>
      </div>

      <div className="space-y-1 font-mono text-slate-300">
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Commits:</span>
          <span
            className={`font-bold ${
              cell.commitCount > 0 ? 'text-emerald-400' : 'text-slate-400'
            }`}
          >
            {cell.commitCount} {cell.commitCount === 1 ? 'commit' : 'commits'}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-400">Week # / Day:</span>
          <span className="text-slate-200">
            W{cell.weekIndex + 1} • Day {cell.dayOfWeek + 1}
          </span>
        </div>

        {cell.char && (
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Character:</span>
            <span className="font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
              '{cell.char}'
            </span>
          </div>
        )}

        {cell.pixelCoord && (
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>Pixel (col, row):</span>
            <span className="text-slate-300">
              [{cell.pixelCoord.col}, {cell.pixelCoord.row}]
            </span>
          </div>
        )}

        {cell.isCustomDrawn && cell.commitCount > 0 && (
          <div className="pt-1 text-[10px] text-cyan-400 font-sans italic">
            ✏️ Custom drawn cell
          </div>
        )}
      </div>
    </div>
  );
};
