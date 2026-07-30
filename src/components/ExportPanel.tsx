'use client';

import React, { useState, useMemo } from 'react';
import { CalendarGrid, PlannerSettings } from '../types/calendar';
import { generateCSV, generateJSON, generateBashScript, generatePythonScript } from '../lib/export-engine';
import { ScriptModal } from './ScriptModal';
import { Download, FileSpreadsheet, FileCode, Terminal, Share2, Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ExportPanelProps {
  grid: CalendarGrid;
  settings: PlannerSettings;
  isDarkMode?: boolean;
}

export const ExportPanel: React.FC<ExportPanelProps> = ({ grid, settings, isDarkMode = true }) => {
  const [isScriptModalOpen, setIsScriptModalOpen] = useState(false);
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  const handleExportCSV = () => {
    const csvContent = generateCSV(grid);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `git_legacy_${settings.text.toLowerCase().replace(/\s+/g, '_')}_${grid.year}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    triggerConfetti();
  };

  const handleExportJSON = () => {
    const jsonContent = generateJSON(grid, settings);
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `git_legacy_${settings.text.toLowerCase().replace(/\s+/g, '_')}_${grid.year}.json`;
    link.click();
    URL.revokeObjectURL(url);
    triggerConfetti();
  };

  const handleShareLink = () => {
    const params = new URLSearchParams({
      text: settings.text,
      year: settings.year.toString(),
      intensity: settings.intensityMaxCommits.toString(),
      theme: settings.themeId,
      align: settings.alignment,
    });
    const shareableUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    navigator.clipboard.writeText(shareableUrl);
    setCopiedFormat('share');
    triggerConfetti();
    setTimeout(() => setCopiedFormat(null), 2500);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
    });
  };

  const bashScript = useMemo(() => generateBashScript(grid, 'githublegacy'), [grid]);
  const pythonScript = useMemo(() => generatePythonScript(grid), [grid]);

  return (
    <>
      <div
        className={`rounded-2xl border p-5 shadow-xl transition-colors space-y-4 ${
          isDarkMode
            ? 'bg-slate-900/90 border-slate-800 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900 shadow-sm'
        }`}
      >
        <div className={`flex items-center justify-between border-b pb-3 ${
          isDarkMode ? 'border-slate-800' : 'border-slate-200'
        }`}>
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Download className="h-5 w-5 text-emerald-500" />
            <span>Export & Commit Automation</span>
          </h3>
          <span className={`text-xs font-sans ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Ready to apply to your repository
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Script Generator Button */}
          <button
            onClick={() => setIsScriptModalOpen(true)}
            className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 hover:border-emerald-500/60 text-emerald-600 dark:text-emerald-300 font-semibold text-xs transition-all hover:scale-[1.02] shadow-lg shadow-emerald-500/10 group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500 text-slate-950 font-bold group-hover:scale-110 transition-transform">
                <Terminal className="h-4 w-4" />
              </div>
              <div className="text-left">
                <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Git Commit Script</p>
                <p className="text-[11px] text-emerald-500 dark:text-emerald-400 font-normal">Bash / Python script</p>
              </div>
            </div>
            <Sparkles className="h-4 w-4 text-emerald-500" />
          </button>

          {/* CSV Export */}
          <button
            onClick={handleExportCSV}
            className={`flex items-center justify-between p-4 rounded-xl border font-semibold text-xs transition-all hover:scale-[1.02] group ${
              isDarkMode
                ? 'bg-slate-950/80 border-slate-800 hover:border-slate-700 text-slate-200'
                : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg border ${
                isDarkMode ? 'bg-slate-900 text-emerald-400 border-slate-800' : 'bg-white text-emerald-600 border-slate-200'
              }`}>
                <FileSpreadsheet className="h-4 w-4" />
              </div>
              <div className="text-left">
                <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Export CSV</p>
                <p className={`text-[11px] font-normal ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Spreadsheet schedule</p>
              </div>
            </div>
            <Download className="h-4 w-4 opacity-70" />
          </button>

          {/* JSON Export */}
          <button
            onClick={handleExportJSON}
            className={`flex items-center justify-between p-4 rounded-xl border font-semibold text-xs transition-all hover:scale-[1.02] group ${
              isDarkMode
                ? 'bg-slate-950/80 border-slate-800 hover:border-slate-700 text-slate-200'
                : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg border ${
                isDarkMode ? 'bg-slate-900 text-cyan-400 border-slate-800' : 'bg-white text-cyan-600 border-slate-200'
              }`}>
                <FileCode className="h-4 w-4" />
              </div>
              <div className="text-left">
                <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Export JSON</p>
                <p className={`text-[11px] font-normal ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Structured payload</p>
              </div>
            </div>
            <Download className="h-4 w-4 opacity-70" />
          </button>

          {/* Share Link */}
          <button
            onClick={handleShareLink}
            className={`flex items-center justify-between p-4 rounded-xl border font-semibold text-xs transition-all hover:scale-[1.02] group ${
              isDarkMode
                ? 'bg-slate-950/80 border-slate-800 hover:border-slate-700 text-slate-200'
                : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg border ${
                isDarkMode ? 'bg-slate-900 text-purple-400 border-slate-800' : 'bg-white text-purple-600 border-slate-200'
              }`}>
                {copiedFormat === 'share' ? <Check className="h-4 w-4 text-emerald-500" /> : <Share2 className="h-4 w-4" />}
              </div>
              <div className="text-left">
                <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {copiedFormat === 'share' ? 'Link Copied!' : 'Share Design'}
                </p>
                <p className={`text-[11px] font-normal ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Copy shareable URL</p>
              </div>
            </div>
            <Share2 className="h-4 w-4 opacity-70" />
          </button>
        </div>
      </div>

      <ScriptModal
        isOpen={isScriptModalOpen}
        onClose={() => setIsScriptModalOpen(false)}
        bashScript={bashScript}
        pythonScript={pythonScript}
        projectName={settings.text}
      />
    </>
  );
};
