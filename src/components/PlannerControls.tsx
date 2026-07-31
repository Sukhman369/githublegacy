'use client';

import React from 'react';
import { PlannerSettings, AlignmentMode } from '../types/calendar';
import { THEMES } from '../lib/theme-config';
import {
  Type,
  Calendar as CalendarIcon,
  Flame,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Palette,
  Edit3,
  MousePointer,
  Eraser,
  RotateCcw,
  MoveLeft,
  MoveRight,
  Sliders,
  Space,
  Trash2,
} from 'lucide-react';

interface PlannerControlsProps {
  settings: PlannerSettings;
  onChangeSettings: (updated: Partial<PlannerSettings>) => void;
  onResetGrid: () => void;
  onCleanGrid?: () => void;
  isDarkMode?: boolean;
}

export const PlannerControls: React.FC<PlannerControlsProps> = ({
  settings,
  onChangeSettings,
  onResetGrid,
  onCleanGrid,
  isDarkMode = true,
}) => {
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 11 }, (_, i) => currentYear - 2 + i);

  const columnOffset = settings.columnOffset || 0;
  const wordSpacing = settings.wordSpacing || 4;

  return (
    <div
      className={`rounded-2xl border p-5 shadow-xl transition-colors space-y-6 ${
        isDarkMode
          ? 'bg-slate-900/90 border-slate-800 text-slate-100'
          : 'bg-white border-slate-200 text-slate-900 shadow-sm'
      }`}
    >
      <div
        className={`flex flex-wrap items-center justify-between gap-3 border-b pb-4 ${
          isDarkMode ? 'border-slate-800' : 'border-slate-200'
        }`}
      >
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Type className="h-5 w-5 text-emerald-500" />
          <span>Planner & Strategy Configuration</span>
        </h2>

        <div className="flex items-center gap-2">
          {onCleanGrid && (
            <button
              onClick={onCleanGrid}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                isDarkMode
                  ? 'bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border-rose-500/30'
                  : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border-rose-200'
              }`}
              title="Clear text & drawing overrides for a blank canvas"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Clean Grid</span>
            </button>
          )}

          <button
            onClick={onResetGrid}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
              isDarkMode
                ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border-slate-700'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 border-slate-300'
            }`}
            title="Reset pattern & overrides to default"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Grid</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Text Input */}
        <div className="space-y-1.5">
          <label
            className={`text-xs font-semibold uppercase tracking-wider flex items-center justify-between ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            <span>Text Pattern</span>
            <span className="text-[10px] font-mono opacity-80">
              {settings.text.length} chars
            </span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={settings.text}
              onChange={(e) => onChangeSettings({ text: e.target.value })}
              placeholder="e.g. LORD"
              maxLength={20}
              className={`w-full rounded-xl border px-3.5 py-2 text-sm font-mono font-semibold uppercase focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 ${
                isDarkMode
                  ? 'bg-slate-950 border-slate-800 text-emerald-400 placeholder-slate-600'
                  : 'bg-slate-50 border-slate-300 text-emerald-600 placeholder-slate-400'
              }`}
            />
          </div>
        </div>

        {/* Year Selector */}
        <div className="space-y-1.5">
          <label
            className={`text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            <CalendarIcon className="h-3.5 w-3.5 text-emerald-500" />
            <span>Target Year</span>
          </label>
          <select
            value={settings.year}
            onChange={(e) => onChangeSettings({ year: parseInt(e.target.value, 10) })}
            className={`w-full rounded-xl border px-3.5 py-2 text-sm font-semibold focus:border-emerald-500 focus:outline-none ${
              isDarkMode
                ? 'bg-slate-950 border-slate-800 text-slate-200'
                : 'bg-slate-50 border-slate-300 text-slate-800'
            }`}
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
          <label
            className={`text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            <Flame className="h-3.5 w-3.5 text-amber-500" />
            <span>Max Commits/Day</span>
          </label>
          <div
            className={`flex items-center gap-1 p-1 rounded-xl border ${
              isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-300'
            }`}
          >
            {[1, 2, 5, 10].map((intVal) => (
              <button
                key={intVal}
                onClick={() => onChangeSettings({ intensityMaxCommits: intVal })}
                className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  settings.intensityMaxCommits === intVal
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : isDarkMode
                    ? 'text-slate-400 hover:text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {intVal}x
              </button>
            ))}
          </div>
        </div>

        {/* Alignment */}
        <div className="space-y-1.5">
          <label
            className={`text-xs font-semibold uppercase tracking-wider ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Grid Alignment
          </label>
          <div
            className={`flex items-center gap-1 p-1 rounded-xl border ${
              isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-300'
            }`}
          >
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
                    : isDarkMode
                    ? 'text-slate-400 hover:text-white'
                    : 'text-slate-600 hover:text-slate-900'
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
      <div
        className={`pt-2 border-t grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 ${
          isDarkMode ? 'border-slate-800/60' : 'border-slate-200'
        }`}
      >
        {/* Column Nudge / Shift Feature */}
        <div className="space-y-1.5">
          <label
            className={`text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            <Sliders className="h-3.5 w-3.5 text-emerald-500" />
            <span>Nudge Column</span>
          </label>
          <div
            className={`flex items-center gap-1 p-1 rounded-xl border ${
              isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-300'
            }`}
          >
            <button
              onClick={() => onChangeSettings({ columnOffset: Math.max(-10, columnOffset - 1) })}
              className={`px-2 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center transition-all ${
                isDarkMode
                  ? 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800'
                  : 'bg-white text-slate-700 hover:text-slate-900 shadow-sm'
              }`}
              title="Shift left 1 column"
            >
              <MoveLeft className="h-3.5 w-3.5" />
            </button>

            <div className="flex-1 text-center font-mono text-xs font-bold text-emerald-500">
              {columnOffset === 0 ? '0' : columnOffset > 0 ? `+${columnOffset}` : `${columnOffset}`}
            </div>

            <button
              onClick={() => onChangeSettings({ columnOffset: Math.min(10, columnOffset + 1) })}
              className={`px-2 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center transition-all ${
                isDarkMode
                  ? 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800'
                  : 'bg-white text-slate-700 hover:text-slate-900 shadow-sm'
              }`}
              title="Shift right 1 column"
            >
              <MoveRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Word Gap Spacing */}
        <div className="space-y-1.5">
          <label
            className={`text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            <Space className="h-3.5 w-3.5 text-cyan-400" />
            <span>Word Gap</span>
          </label>
          <div
            className={`flex items-center gap-1 p-1 rounded-xl border ${
              isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-300'
            }`}
          >
            {[2, 3, 4, 5].map((wGap) => (
              <button
                key={wGap}
                onClick={() => onChangeSettings({ wordSpacing: wGap })}
                className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  wordSpacing === wGap
                    ? 'bg-cyan-500 text-slate-950 shadow-sm'
                    : isDarkMode
                    ? 'text-slate-400 hover:text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {wGap}c
              </button>
            ))}
          </div>
        </div>

        {/* Letter Spacing */}
        <div className="space-y-1.5">
          <label
            className={`text-xs font-semibold uppercase tracking-wider ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Letter Gap
          </label>
          <div
            className={`flex items-center gap-1 p-1 rounded-xl border ${
              isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-300'
            }`}
          >
            {[1, 2, 3].map((spacing) => (
              <button
                key={spacing}
                onClick={() => onChangeSettings({ letterSpacing: spacing })}
                className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  settings.letterSpacing === spacing
                    ? 'bg-emerald-500 text-slate-950 shadow-sm'
                    : isDarkMode
                    ? 'text-slate-400 hover:text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {spacing}c
              </button>
            ))}
          </div>
        </div>

        {/* Theme Picker */}
        <div className="space-y-1.5">
          <label
            className={`text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            <Palette className="h-3.5 w-3.5 text-purple-500" />
            <span>Theme Palette</span>
          </label>
          <select
            value={settings.themeId}
            onChange={(e) => onChangeSettings({ themeId: e.target.value })}
            className={`w-full rounded-xl border px-3.5 py-2 text-sm font-semibold focus:border-emerald-500 focus:outline-none ${
              isDarkMode
                ? 'bg-slate-950 border-slate-800 text-slate-200'
                : 'bg-slate-50 border-slate-300 text-slate-800'
            }`}
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
          <label
            className={`text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            <Edit3 className="h-3.5 w-3.5 text-cyan-500" />
            <span>Studio Mode</span>
          </label>
          <div
            className={`flex items-center gap-1 p-1 rounded-xl border ${
              isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-300'
            }`}
          >
            <button
              onClick={() => onChangeSettings({ drawingMode: 'select' })}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
                settings.drawingMode === 'select'
                  ? isDarkMode
                    ? 'bg-slate-800 text-white font-bold'
                    : 'bg-white text-slate-900 font-bold shadow-sm'
                  : isDarkMode
                  ? 'text-slate-400 hover:text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MousePointer className="h-3.5 w-3.5" />
              <span>Inspect</span>
            </button>
            <button
              onClick={() => onChangeSettings({ drawingMode: 'draw' })}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
                settings.drawingMode === 'draw'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : isDarkMode
                  ? 'text-slate-400 hover:text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Edit3 className="h-3.5 w-3.5" />
              <span>Draw</span>
            </button>
            <button
              onClick={() => onChangeSettings({ drawingMode: 'erase' })}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
                settings.drawingMode === 'erase'
                  ? 'bg-rose-500 text-white font-bold'
                  : isDarkMode
                  ? 'text-slate-400 hover:text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Eraser className="h-3.5 w-3.5" />
              <span>Erase</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
