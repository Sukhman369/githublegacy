'use client';

import React from 'react';
import { PlannerSettings, AlignmentMode, IntensityLevel } from '../types/calendar';
import { THEMES } from '../lib/theme-config';
import { Type, Calendar as CalendarIcon, Flame, AlignLeft, AlignCenter, AlignRight, Palette, Edit3, MousePointer, Eraser, RotateCcw } from 'lucide-react';

interface PlannerControlsProps {
  settings: PlannerSettings;
  onChangeSettings: (updated: Partial<PlannerSettings>) => void;
  onResetGrid: () => void;
}

export const PlannerControls: React.FC<PlannerControlsProps> = ({
  settings,
  onChangeSettings,
  onResetGrid,
}) => {
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 11 }, (_, i) => currentYear - 2 + i);

  return (
    <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Type className="h-5 w-5 text-emerald-400" />
          <span>Planner & Strategy Configuration</span>
        </h2>
        
        <div className="flex items-center gap-2">
          <button
            onClick={onResetGrid}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700 transition-colors"
            title="Reset pattern & overrides"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Grid</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Text Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>Text Pattern</span>
            <span className="text-[10px] text-slate-400 font-mono">
              {settings.text.length} chars
            </span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={settings.text}
              onChange={(e) => onChangeSettings({ text: e.target.value })}
              placeholder="e.g. LORD SUKHMAN"
              maxLength={20}
              className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2 text-sm font-mono font-semibold text-emerald-400 placeholder-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 uppercase"
            />
          </div>
        </div>

        {/* Year Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <CalendarIcon className="h-3.5 w-3.5 text-emerald-400" />
            <span>Target Year</span>
          </label>
          <select
            value={settings.year}
            onChange={(e) => onChangeSettings({ year: parseInt(e.target.value, 10) })}
            className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2 text-sm font-semibold text-slate-200 focus:border-emerald-500 focus:outline-none"
          >
            {yearOptions.map((y) => (
              <option key={y} value={y}>
                Year {y}
              </option>
            ))}
          </select>
        </div>

        {/* Commit Intensity */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Flame className="h-3.5 w-3.5 text-amber-400" />
            <span>Max Commits/Day</span>
          </label>
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            {[1, 2, 5, 10].map((intVal) => (
              <button
                key={intVal}
                onClick={() => onChangeSettings({ intensityMaxCommits: intVal })}
                className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  settings.intensityMaxCommits === intVal
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {intVal}x
              </button>
            ))}
          </div>
        </div>

        {/* Alignment */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Grid Alignment
          </label>
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            {[
              { id: 'left', icon: AlignLeft, label: 'Left' },
              { id: 'center', icon: AlignCenter, label: 'Center' },
              { id: 'right', icon: AlignRight, label: 'Right' },
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => onChangeSettings({ alignment: id as AlignmentMode })}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
                  settings.alignment === id
                    ? 'bg-emerald-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Secondary Controls Row */}
      <div className="pt-2 border-t border-slate-800/60 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Theme Picker */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Palette className="h-3.5 w-3.5 text-purple-400" />
            <span>Theme Palette</span>
          </label>
          <select
            value={settings.themeId}
            onChange={(e) => onChangeSettings({ themeId: e.target.value })}
            className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2 text-sm font-semibold text-slate-200 focus:border-emerald-500 focus:outline-none"
          >
            {THEMES.map((theme) => (
              <option key={theme.id} value={theme.id}>
                {theme.name}
              </option>
            ))}
          </select>
        </div>

        {/* Freehand Pixel Studio Mode */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Edit3 className="h-3.5 w-3.5 text-cyan-400" />
            <span>Grid Interaction Mode</span>
          </label>
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => onChangeSettings({ drawingMode: 'select' })}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                settings.drawingMode === 'select'
                  ? 'bg-slate-800 text-white font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <MousePointer className="h-3.5 w-3.5" />
              <span>Inspect</span>
            </button>
            <button
              onClick={() => onChangeSettings({ drawingMode: 'draw' })}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                settings.drawingMode === 'draw'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Edit3 className="h-3.5 w-3.5" />
              <span>Draw</span>
            </button>
            <button
              onClick={() => onChangeSettings({ drawingMode: 'erase' })}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                settings.drawingMode === 'erase'
                  ? 'bg-rose-500 text-white font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eraser className="h-3.5 w-3.5" />
              <span>Erase</span>
            </button>
          </div>
        </div>

        {/* Letter Spacing */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Letter Spacing
          </label>
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            {[1, 2, 3].map((spacing) => (
              <button
                key={spacing}
                onClick={() => onChangeSettings({ letterSpacing: spacing })}
                className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  settings.letterSpacing === spacing
                    ? 'bg-emerald-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {spacing} col{spacing > 1 ? 's' : ''}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
